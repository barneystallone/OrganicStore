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

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import ued.OrganicWeb.model.CustomerModel;
import ued.OrganicWeb.model.OrderDetailsModel;
import ued.OrganicWeb.model.OrderModel;
import ued.OrganicWeb.service.ICustomerService;
import ued.OrganicWeb.service.IOrderDetailsService;
import ued.OrganicWeb.service.IOrderService;
import ued.OrganicWeb.utils.RestUtil;
import ued.OrganicWeb.utils.SessionUtil;

@WebServlet(urlPatterns = {"/api-order-cart"})
public class OrderCartAPI extends HttpServlet{
	
	@Inject
	private ICustomerService customerService;
	@Inject
	private IOrderService orderService;
	@Inject
	private IOrderDetailsService orderDetailsService;
	/**
	 * 
	 */
	private static final long serialVersionUID = -5094257279835073480L;
	
	@SuppressWarnings("unchecked")
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
//		super.doPost(req, resp);
		req.setCharacterEncoding("UTF-8");
		resp.setContentType("application/json");
		
		ObjectMapper mapper = new ObjectMapper();
		ObjectNode resData = mapper.createObjectNode();
		CustomerModel model = RestUtil.of(req.getReader()).toModel(CustomerModel.class);
		Map<Integer, Integer> listItems = (HashMap<Integer, Integer> )SessionUtil.getInstance().getValue(req, "listItems");
		
		int customerID =0 ;
		int orderID =0 ;
		OrderModel orderModel = null;
		if(SessionUtil.getInstance().getValue(req, "user")==null) {
			customerID = customerService.save(model);
			model.setId(customerID);
			orderModel = new OrderModel(new Date(),0,0,model.getHouseStreet(),model.getAreaId()
					,model.getName(),model.getPhoneNumber(),customerID);
			orderID = orderService.save(orderModel);
			orderModel.setId(orderID);
			
		} else {
			//		TH2: có người dùng : ->
			
		}
		final int orderIDFinal = orderID;
		List<OrderDetailsModel> list = listItems.entrySet().parallelStream().map(e->{
			OrderDetailsModel oderDetailModel = new OrderDetailsModel(e.getKey(), e.getValue(),orderIDFinal);
			return  oderDetailModel;
		}).collect(Collectors.toList());
		orderDetailsService.saveMulti(list);
		if(RestUtil.message.toString().startsWith("45000")) {
			orderService.delete(orderModel);
			customerService.delete(model);
			resData.put("status", 0);
			resData.put("message", RestUtil.message.toString().substring(6)
					.replaceAll("[\n]", "").trim().replaceAll("\\s+", " "));
			RestUtil.message.delete(0, RestUtil.message.length());
		} else {
			resData.put("status", 1);
		}
		mapper.writeValue(resp.getOutputStream(), resData);
	}	
}
