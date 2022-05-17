package ued.OrganicWeb.controller.admin.api;

import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import org.apache.commons.beanutils.BeanUtils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import ued.OrganicWeb.model.ProductModel;
import ued.OrganicWeb.service.IProductService;
import ued.OrganicWeb.utils.FormDataUtil;
import ued.OrganicWeb.utils.RestUtil;

@WebServlet(urlPatterns = {"/api-product"})
@MultipartConfig(maxFileSize = 16177215) 
public class ProductAPI extends HttpServlet {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 3310598741923686485L;
	
	@Inject
	IProductService productService;
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		req.setCharacterEncoding("UTF-8");
		resp.setHeader("Access-Control-Allow-Origin","*");
		resp.setContentType("application/json");
	
		ObjectMapper mapper = new ObjectMapper();
		String productId = (req.getParameter("id")==null) ? "" : req.getParameter("id");
		
		if (productId.matches("^\\d+$")) {
			ProductModel result = productService.get(Integer.parseInt(productId));
			mapper.writeValue(resp.getOutputStream(), result);
		} else if(productId.equals("")) {
			List<ProductModel> results = RestUtil.getList(productService, req, resp);
			mapper.writeValue(resp.getOutputStream(), results);
		} else {			
		
			ObjectNode message = mapper.createObjectNode();
			message.put("Message", "Invalid ID");
			mapper.writeValue(resp.getOutputStream(), message);
		}
		
	}
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		req.setCharacterEncoding("UTF-8");
		resp.setContentType("application/json");
		ObjectMapper mapper = new ObjectMapper();
		ObjectNode resData = mapper.createObjectNode();
		System.out.println(req.getContentType().split(";")[0]);
		if(req.getContentType().split(";")[0].equals("multipart/form-data")) {
			ProductModel productModel = FormDataUtil.toModel(ProductModel.class, req);
			byte[] imageBytes = FormDataUtil.getImageBytes(req.getPart("image"));
			if(imageBytes!=null) {
				productModel.setImage(imageBytes);
				int id = productService.save(productModel);

				resData.put("id", id);
				mapper.writeValue(resp.getOutputStream(), resData);
			} else {
				resData.put("message", "Image not found");
				mapper.writeValue(resp.getOutputStream(), resData);
			}

		} else {
			ProductModel productModel = RestUtil.of(req.getReader()).toModel(ProductModel.class);
			int id = productService.save(productModel);

			resData.put("id", id);
			mapper.writeValue(resp.getOutputStream(), resData);
			
		}
//		if(req.getContentType().split(";")[0].equals("multipart/form-data")) {
//			ProductModel productModel = new ProductModel();
//			try {
//				BeanUtils.populate(productModel, req.getParameterMap());
//				Part part = req.getPart("image");
//				if(part!=null && part.getSize()>0) {
//					long size = part.getSize();
//					byte[] imageBytes = new byte[(int)size];
//					InputStream inputStream = part.getInputStream();
//					inputStream.read(imageBytes);
//					inputStream.close();
//					productModel.setImage(imageBytes);
//					int id = productService.save(productModel);
//					
//					resData.put("id", id);
//					mapper.writeValue(resp.getOutputStream(), resData);
//				} else {
//					resData.put("message", "Error");
//					mapper.writeValue(resp.getOutputStream(), resData);
//				}
//			} catch (IllegalAccessException |InvocationTargetException e) {
//				e.printStackTrace();
//			} 
//		} else {
//			ProductModel productModel = RestUtil.of(req.getReader()).toModel(ProductModel.class);
//			int id = productService.save(productModel);
//			
//			resData.put("id", id);
//			mapper.writeValue(resp.getOutputStream(), resData);
//			
//		}
	}
	@Override
	protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		req.setCharacterEncoding("UTF-8");
		resp.setContentType("application/json");
		ProductModel productModel = RestUtil.of(req.getReader()).toModel(ProductModel.class);
		productService.update(productModel);
		productModel = productService.get(productModel.getId());
		
		ObjectMapper mapper = new ObjectMapper();
		mapper.writeValue(resp.getOutputStream(), productModel);
	}
	@Override
	protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		req.setCharacterEncoding("UTF-8");
		ProductModel productModel = RestUtil.of(req.getReader()).toModel(ProductModel.class);
		productService.delete(productModel);
	}
}
