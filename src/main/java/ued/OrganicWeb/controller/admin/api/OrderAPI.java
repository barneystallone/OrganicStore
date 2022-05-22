package ued.OrganicWeb.controller.admin.api;

import java.io.IOException;

import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import ued.OrganicWeb.model.OrderModel;
import ued.OrganicWeb.service.IOrderService;
import ued.OrganicWeb.utils.RestUtil;

@WebServlet(urlPatterns = {"/api-order"})
public class OrderAPI extends HttpServlet {

	@Inject
	private IOrderService orderService;
	/**
	 * 
	 */
	private static final long serialVersionUID = 4850204324764405487L;
 
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("application/json");
		ObjectMapper mapper = new ObjectMapper();
		String id= (req.getParameter("id")==null) ? "" : req.getParameter("id");
		if(id.matches("^\\d+$")) {
			OrderModel result = orderService.get(Integer.parseInt(id));
			mapper.writeValue(resp.getOutputStream(), result);
		}
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		req.setCharacterEncoding("UTF-8");
		resp.setContentType("application/json");
		ObjectMapper mapper = new ObjectMapper();
		ObjectNode resData = mapper.createObjectNode();
		
		OrderModel model = RestUtil.of(req.getReader()).toModel(OrderModel.class);
		
		int id = orderService.save(model);
		resData.put("id", id);
		mapper.writeValue(resp.getOutputStream(), resData);
	}
}
