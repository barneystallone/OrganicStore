package ued.OrganicWeb.controller.admin.api;

import java.io.IOException;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import ued.OrganicWeb.model.OrderDetailsModel;
import ued.OrganicWeb.model.OrderModel;
import ued.OrganicWeb.service.IOrderDetailsService;
import ued.OrganicWeb.service.IOrderService;
import ued.OrganicWeb.utils.RestUtil;

@WebServlet(urlPatterns = {"/api-orderDetails"})
public class OrderDetailsAPI extends HttpServlet {

	@Inject
	private IOrderDetailsService orderDetailsService;
	/**
	 * 
	 */
	private static final long serialVersionUID = 4850204324764405487L;
 
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("application/json");
		ObjectMapper mapper = new ObjectMapper();
		String id= (req.getParameter("order_id")==null) ? "" : req.getParameter("order_id");
		if(id.matches("^\\d+$")) {
			List<OrderDetailsModel> result = orderDetailsService.list(Integer.parseInt(id));
			mapper.writeValue(resp.getOutputStream(), result);
		}
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		req.setCharacterEncoding("UTF-8");
		resp.setContentType("application/json");
		ObjectMapper mapper = new ObjectMapper();
		ObjectNode resData = mapper.createObjectNode();
		
//		List<OrderDetailsModel> listModels = RestUtil.of(req.getReader()).toListModels(OrderDetailsModel[].class);
		List<OrderDetailsModel> listModels = RestUtil.of(req.getReader())
				.toListModels(new TypeReference<>(){});
		
		orderDetailsService.saveMulti(listModels);
		if(RestUtil.message.toString().startsWith("45000")) {
			resData.put("status", 0);
			resData.put("message", RestUtil.message.toString().substring(6)
					.replaceAll("[\n]", "").trim().replaceAll("\\s+", " "));
		} else {
			resData.put("status", 1);
		}
		mapper.writeValue(resp.getOutputStream(), resData);
	}
}
