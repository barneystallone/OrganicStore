package ued.OrganicWeb.controller.admin.api;

import java.io.IOException;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import ued.OrganicWeb.model.ProductModel;
import ued.OrganicWeb.service.IProductService;

@WebServlet(urlPatterns = {"/api-product"})
public class ProductAPI extends AbstractServlet<ProductModel> {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 3310598741923686485L;
	
	@Inject
	IProductService productService;
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		req.setCharacterEncoding("UTF-8");
		resp.setContentType("application/json");
	
		ObjectMapper mapper = new ObjectMapper();
		String productId = (req.getParameter("id")==null) ? "" : req.getParameter("id");
		
		if (productId.matches("^\\d+$")) {
			ProductModel result = productService.get(Integer.parseInt(productId));
			mapper.writeValue(resp.getOutputStream(), result);
		
		} else if(productId.equals("")) {
		
			List<ProductModel> results = getList(productService, req, resp);
			mapper.writeValue(resp.getOutputStream(), results);
		} else {			
		
			ObjectNode message = mapper.createObjectNode();
			message.put("Message", "Invalid ID");
			mapper.writeValue(resp.getOutputStream(), message);
			
		}
		
		productService.listProducts();
	}
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		super.doPost(req, resp);
	}
	@Override
	protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		super.doPut(req, resp);
	}
	@Override
	protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		super.doDelete(req, resp);
	}
}
