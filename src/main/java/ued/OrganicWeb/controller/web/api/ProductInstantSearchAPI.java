package ued.OrganicWeb.controller.web.api;

import java.io.IOException;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import ued.OrganicWeb.model.ProductModel;
import ued.OrganicWeb.service.IProductService;

@WebServlet(urlPatterns = {"/api-search-product"})
public class ProductInstantSearchAPI extends HttpServlet{
	
	@Inject
	IProductService productService;

	private static final long serialVersionUID = -6585633712960178751L;
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		req.setCharacterEncoding("UTF-8");
		resp.setHeader("Access-Control-Allow-Origin","*");
		resp.setContentType("application/json");
		
		ObjectMapper mapper = new ObjectMapper();
		String queryParams = (req.getParameter("q")==null) ? "" : req.getParameter("q");
		
		if(queryParams.equals("")||queryParams.length()<3) {
			resp.setStatus(400);
			ObjectNode message = mapper.createObjectNode();
			message.put("Message", "Co j do sai sai");
			mapper.writeValue(resp.getOutputStream(), message);
		} else {
			List<ProductModel> results = productService.searchProduct(queryParams);
			mapper.writeValue(resp.getOutputStream(), results);
		}
		
	}
}
