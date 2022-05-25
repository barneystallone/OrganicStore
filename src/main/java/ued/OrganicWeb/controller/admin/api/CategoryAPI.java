package ued.OrganicWeb.controller.admin.api;

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

import ued.OrganicWeb.model.CategoryModel;
import ued.OrganicWeb.service.ICategoryService;
import ued.OrganicWeb.utils.RestUtil;

/**
 *	HP 
 */
@WebServlet(urlPatterns = {"/api-category"})
public class CategoryAPI extends HttpServlet {
	@Inject
	private ICategoryService categoryService;
	
	private static final long serialVersionUID = 8985893478679839791L;
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// full access 
		resp.setHeader("Access-Control-Allow-Origin","*");
		req.setCharacterEncoding("UTF-8");
		resp.setContentType("application/json");
		ObjectMapper mapper = new ObjectMapper();
		if( req.getParameter("type")!=null && req.getParameter("type").equals("parent")) {
			List<CategoryModel> results = categoryService.listParentCategory();
			mapper.writeValue(resp.getOutputStream(), results);
		} else {
			String categoryId = (req.getParameter("id")==null) ? "" : req.getParameter("id");
			if (req.getParameter("count")!=null) {
				int count = categoryService.getRowCount();
				ObjectNode data = mapper.createObjectNode();
				data.put("count", count);
				mapper.writeValue(resp.getOutputStream(), data);
			}else if (categoryId.matches("^\\d+$")) {
				CategoryModel result = categoryService.get(Integer.parseInt(categoryId));
				mapper.writeValue(resp.getOutputStream(), result);
				
			} else if(categoryId.equals("")) {
				List<CategoryModel> results = RestUtil.getList(categoryService, req, resp);
				mapper.writeValue(resp.getOutputStream(), results);
			} else {
				mapper.writeValue(resp.getOutputStream(), "Invalid category id");
			}
		}
		
	}
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		req.setCharacterEncoding("UTF-8");
		resp.setContentType("application/json");
		CategoryModel categoryModel = RestUtil.of(req.getReader()).toModel(CategoryModel.class);
		int id = categoryService.save(categoryModel);
		ObjectMapper mapper = new ObjectMapper();
		ObjectNode data = mapper.createObjectNode();
		data.put("id", id);
		mapper.writeValue(resp.getOutputStream(), data);
	}
	@Override
	protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		req.setCharacterEncoding("UTF-8");
		resp.setContentType("application/json");
		CategoryModel categoryModel = RestUtil.of(req.getReader()).toModel(CategoryModel.class);
		categoryService.update(categoryModel);
		categoryModel = categoryService.get(categoryModel.getId());
		ObjectMapper mapper = new ObjectMapper();
		mapper.writeValue(resp.getOutputStream(), categoryModel);
	}
	@Override
	protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		req.setCharacterEncoding("UTF-8");
		resp.setContentType("application/json");
		CategoryModel categoryModel = RestUtil.of(req.getReader()).toModel(CategoryModel.class);
		categoryService.delete(categoryModel);
//		ObjectMapper mapper = new ObjectMapper();
	}
}
