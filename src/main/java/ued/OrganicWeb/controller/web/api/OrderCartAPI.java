package ued.OrganicWeb.controller.web.api;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import ued.OrganicWeb.model.CustomerModel;
import ued.OrganicWeb.model.OrderDetailsModel;
import ued.OrganicWeb.model.OrderModel;
import ued.OrganicWeb.model.ProductModel;
import ued.OrganicWeb.model.UserModel;
import ued.OrganicWeb.service.ICustomerService;
import ued.OrganicWeb.service.IOrderDetailsService;
import ued.OrganicWeb.service.IOrderService;
import ued.OrganicWeb.service.IProductService;
import ued.OrganicWeb.utils.RestUtil;
import ued.OrganicWeb.utils.SessionUtil;

@WebServlet(urlPatterns = {"/api-order-cart"})
public class OrderCartAPI extends HttpServlet{
	
	@Inject
	private ICustomerService customerService;
	@Inject
	private IProductService productService;
	@Inject
	private IOrderService orderService;
	@Inject
	private IOrderDetailsService orderDetailsService;
	/**
	 * 
	 */
	private static final long serialVersionUID = -5094257279835073480L;
	
	
	/**
	 * Tạo order với totalPrice ban đầu là phí Ship
	 * Với mỗi ordertails thêm vào => Tăng lên totalPrice
	 * Trong trường hợp không đủ hàng để bán => ko insert => Gửi message thông báo
	 */
	@SuppressWarnings("unchecked")
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		req.setCharacterEncoding("UTF-8");
		resp.setContentType("application/json");
		
		ObjectMapper mapper = new ObjectMapper();
		ObjectNode resData = mapper.createObjectNode();
		

		CustomerModel model = null;
		Map<Integer, Integer> listItems = (HashMap<Integer, Integer> )SessionUtil.getInstance().getValue(req, "listItems");
		boolean isLogin= (SessionUtil.getInstance().getValue(req, "user") == null) ? false : true;
		int customerID =0 ;
		int orderID =0 ;
		OrderModel orderModel = null;
		if(listItems==null||listItems.size()==0) {
			resData.put("status", 0);
			resData.put("message", "Lỗi. Giỏ hàng trống");
		} else  {
			JsonNode bodyParserNode = mapper.readTree(req.getInputStream());
			model = mapper.treeToValue(bodyParserNode.get("customer"), CustomerModel.class);
			int shippingFee = bodyParserNode.get("shippingFee").intValue();
			System.out.println("shippingFee: "+shippingFee);
			if(model.getAreaId()!=0&&model.getName().equals("")==false&&model.getEmail().equals("")==false
					&&model.getPhoneNumber().equals("")==false&&model.getHouseStreet().equals("")==false) {
				customerID = customerService.save(model);
				model.setId(customerID);
				int beginPriceTotal = shippingFee;
				orderModel = new OrderModel(new Date(),0,beginPriceTotal ,model.getHouseStreet(),model.getAreaId()
						,model.getName(),model.getPhoneNumber(),model.getId(),shippingFee);
				orderID = orderService.save(orderModel);
				orderModel.setId(orderID);				
			} else {
				model = null;
				resData.put("status", 0);
				resData.put("message", "Lỗi. Chưa nhập đầy đủ thông tin cá nhân người dùng");
			}
			
		} 
		
		if(model!=null) {
			
			final int orderIDFinal = orderID;
			List<OrderDetailsModel> list = listItems.entrySet().parallelStream().map(e->{
				OrderDetailsModel orderDetailModel = new OrderDetailsModel(e.getKey(), e.getValue(),orderIDFinal);
				ProductModel productModel = productService.get(orderDetailModel.getProduct_id());
				orderDetailModel.setSubTotalPrice(
						orderDetailModel.getQuantity() *productModel.getPrice()*(100- productModel.getSaleOff())/100
				);
				return  orderDetailModel;
			}).collect(Collectors.toList());
			orderDetailsService.saveMulti(list);
			if(RestUtil.message.toString().startsWith("45000")) {
				orderService.delete(orderModel);
				if(!isLogin) {
					customerService.delete(model);				
				}
				resData.put("status", 0);
				resData.put("message", RestUtil.message.toString().substring(6)
						.replaceAll("[\n]", "").trim().replaceAll("\\s+", " "));
				RestUtil.message.delete(0, RestUtil.message.length());
			} else {
				resData.put("status", 1);
			}		
		}
			
		 
		mapper.writeValue(resp.getOutputStream(), resData);	
		

	}	
}
