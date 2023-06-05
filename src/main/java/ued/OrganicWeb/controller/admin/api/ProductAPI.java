package ued.OrganicWeb.controller.admin.api;

import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

import ued.OrganicWeb.dao.impl.StockCardInfoDAO;
import ued.OrganicWeb.model.CustomerModel;
import ued.OrganicWeb.model.ProductModel;
import ued.OrganicWeb.model.StockCardInfoModel;
import ued.OrganicWeb.service.IProductService;
import ued.OrganicWeb.service.IStockCardInfoService;
import ued.OrganicWeb.utils.FormDataUtil;
import ued.OrganicWeb.utils.RestUtil;

@WebServlet(urlPatterns = {"/api-product","/api-product-discount","/api-khohang"})
@MultipartConfig(maxFileSize = 16177215) 
public class ProductAPI extends HttpServlet {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 3310598741923686485L;
	
	@Inject
	IProductService productService;
	@Inject
	IStockCardInfoService stockCardInfoService;
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		req.setCharacterEncoding("UTF-8");
		resp.setHeader("Access-Control-Allow-Origin","*");
		resp.setContentType("application/json");
	
		ObjectMapper mapper = new ObjectMapper();
		String productId = (req.getParameter("id")==null) ? "" : req.getParameter("id");
		
		if(req.getServletPath().startsWith("/api-khohang")) {
			if(productId!=null&&productId.matches("^\\d+$")) {
				String offset = (req.getParameter("offset")==null) ? "0" : req.getParameter("offset");
				String limit = (req.getParameter("limit")==null) ? "1000" : req.getParameter("limit");
				if(offset.matches("^\\d+$")&&limit.matches("^\\d+$")) {
					
					List<StockCardInfoModel> listItems = stockCardInfoService.listIOProduct(
							Integer.parseInt(productId), 
							Integer.parseInt(offset),
							Integer.parseInt(limit)
					);
					mapper.writeValue(resp.getOutputStream(), listItems);
					return;
				} else {
					mapper.writeValue(resp.getOutputStream(), null);
				}
			} else {
				List<ProductModel> results = productService.listTonKho();
				mapper.writeValue(resp.getOutputStream(), results);
				return;
			}
			return;
		}else if(req.getServletPath().startsWith("/api-product-discount")) {
			List<ProductModel> results = productService.listDiscountProduct();
			mapper.writeValue(resp.getOutputStream(), results);
			return;
		} 
		// api-product
		else if (productId.matches("^\\d+$")) {
			ProductModel result = productService.get(Integer.parseInt(productId));
			mapper.writeValue(resp.getOutputStream(), result);
		} else if(productId.equals("")) {
			List<ProductModel> results = RestUtil.getList(productService, req, resp);
//			Map<Boolean, List<ProductModel>> result =
//					results.stream().collect(Collectors.partitioningBy(e -> e.getSaleOff() > 0));
//			System.out.println(result);
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
				if(id>0) {
					mapper.writeValue(resp.getOutputStream(), productService.get(id));
				} else {
					resData.put("fail", "true");
//					resp.se
					mapper.writeValue(resp.getOutputStream(), resData);		
				}
			} else {
				resData.put("message", "Image not found");
				mapper.writeValue(resp.getOutputStream(), resData);
			}

		} else {
			ProductModel productModel = RestUtil.of(req.getReader()).toModel(ProductModel.class);
			int id = productService.save(productModel);
			if(id>0) {
				mapper.writeValue(resp.getOutputStream(), productService.get(id));
			} else {
				resData.put("fail", "true");
				mapper.writeValue(resp.getOutputStream(), resData);				
			}
			
		}
	}
	@Override
	protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		req.setCharacterEncoding("UTF-8");
		resp.setContentType("application/json");
		ObjectMapper mapper = new ObjectMapper();
		ObjectNode resData = mapper.createObjectNode();
		if(req.getContentType().split(";")[0].equals("multipart/form-data")) {
			ProductModel productModel = FormDataUtil.toModel(ProductModel.class, req);
			if(productModel.getId()>0) {
				byte[] imageBytes = FormDataUtil.getImageBytes(req.getPart("image"));
				if(imageBytes!=null) {
					productModel.setImage(imageBytes);
					productService.update(productModel);
					mapper.writeValue(resp.getOutputStream(), productService.get(productModel.getId()));
				
				} else {
					resData.put("message", "Image not found");
					resData.put("fail", "true");
					mapper.writeValue(resp.getOutputStream(), resData);
				}
				
			} else {
				resData.put("message", "Id sản phẩm không hợp lệ");
				resData.put("fail", "true");
				mapper.writeValue(resp.getOutputStream(), resData);
			}
		
		} else {
			ProductModel productModel = RestUtil.of(req.getReader()).toModel(ProductModel.class);
			if(productModel.getId()>0) {
				productService.update(productModel);
				productModel = productService.get(productModel.getId());		
				mapper.writeValue(resp.getOutputStream(), productService.get(productModel.getId()));
			}else {
				resData.put("message", "Id sản phẩm không hợp lệ");
				resData.put("fail", "true");
				mapper.writeValue(resp.getOutputStream(), resData);
			}
		}
		
	}
	@Override
	protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		req.setCharacterEncoding("UTF-8");
		resp.setContentType("Application/json");
		ProductModel productModel = RestUtil.of(req.getReader()).toModel(ProductModel.class);
		productService.delete(productModel);
		ObjectMapper mapper = new ObjectMapper();
		if(RestUtil.message.toString().startsWith("1451")) {
			mapper.writeValue(resp.getOutputStream(), mapper.createObjectNode().put("message", "Không thể xóa do ràng buộc dữ liệu"));
			RestUtil.message.delete(0, RestUtil.message.length());
		} else {
			mapper.writeValue(resp.getOutputStream(), mapper.createObjectNode().put("success", "Xóa sản phẩm thành công"));
		}
	}
}
