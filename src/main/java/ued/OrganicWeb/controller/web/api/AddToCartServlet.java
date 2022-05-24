package ued.OrganicWeb.controller.web.api;

import java.io.IOException;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import ued.OrganicWeb.utils.RestUtil;
import ued.OrganicWeb.utils.SessionUtil;

@WebServlet(urlPatterns = {"/api-shopping-cart"})
public class AddToCartServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3927186762461933263L;
	@SuppressWarnings("unchecked")
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("application/json");
		ObjectMapper mapper = new ObjectMapper();
		Map<Integer, Integer> items = (HashMap<Integer, Integer>)SessionUtil.getInstance().getValue(req, "listItems");
		if(items!=null) {
			mapper.writeValue(resp.getOutputStream(), items);
		} else {
			mapper.writeValue(resp.getOutputStream(), mapper.createObjectNode()
					.put("message", "Giỏ hàng trống"));
		}
	}
	@SuppressWarnings("unchecked")
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		req.setCharacterEncoding("UTF-8");
		resp.setContentType("application/json");
		
		Map<String, Integer> item = RestUtil.of(req.getReader()).toModel(LinkedHashMap.class);
		List<Integer> values = item.values().stream().collect(Collectors.toList());
		
		Map<Integer, Integer> listItems = null;
		if(SessionUtil.getInstance().getValue(req, "listItems")==null) {
			listItems = new HashMap<>();
			SessionUtil.getInstance().put(req,"listItems" , listItems);
 		}else {
 			listItems = (HashMap<Integer, Integer> )SessionUtil.getInstance().getValue(req, "listItems"); 			
 		}
		if(listItems.containsKey(values.get(0))){
			listItems.put(values.get(0),listItems.get(values.get(0))+values.get(1));
		}else {
			listItems.put(values.get(0),values.get(1));			
		}
//		List<OrderDetailsModel> list = listItems.entrySet().parallelStream().map(e->{
//			OrderDetailsModel model = new OrderDetailsModel(e.getKey(), e.getValue());
//			return  model;
//		}).collect(Collectors.toList());
		ObjectMapper mapper = new ObjectMapper();
		mapper.writeValue(resp.getOutputStream(), mapper.createObjectNode().put("message", "Thêm thành công"));
		
	}

	@SuppressWarnings("unchecked")
	@Override
	protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		req.setCharacterEncoding("UTF-8");
		resp.setContentType("application/json");
	 
		ObjectMapper mapper = new ObjectMapper();
		
		Map<Integer, Integer> listItems = (HashMap<Integer, Integer> )SessionUtil.getInstance().getValue(req, "listItems");
		
//		default LinkedHashMap 
		List<Map<String, Integer>> listItem = RestUtil.of(req.getReader())
				.toListModels(new TypeReference<>(){});

		List<List<Integer>> listValues = listItem.parallelStream()
				.map(e->e.values().stream().collect(Collectors.toList()))
				.collect(Collectors.toList());
		ObjectNode resMessage =mapper.createObjectNode();
		for(List<Integer> values : listValues) {
			if(listItems!=null&&listItems.containsKey(values.get(0))){
				listItems.put(values.get(0),values.get(1));
				resMessage.put(values.get(0).toString(), "Update số lượng = "+values.get(1));			
			} else {
				resMessage.put(values.get(0).toString(), "Thất bại. Không tìm thấy sản phẩm");
			}
		}
		mapper.writeValue(resp.getOutputStream(), resMessage);
	}
}
