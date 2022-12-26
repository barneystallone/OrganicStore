package ued.OrganicWeb.controller.admin.api;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import ued.OrganicWeb.model.GRNInfoModel;
import ued.OrganicWeb.model.GRNModel;
import ued.OrganicWeb.model.UserModel;
import ued.OrganicWeb.service.IGRNInfoService;
import ued.OrganicWeb.service.IGRNService;
import ued.OrganicWeb.utils.RestUtil;
import ued.OrganicWeb.utils.SessionUtil;

@WebServlet(urlPatterns = {"/api-grn","/api-grn-complete"})
public class GrnAPI extends HttpServlet{

	@Inject
	IGRNService grnService;
	@Inject
	IGRNInfoService grnInfoService;
	
	private static final long serialVersionUID = -8812433553878706084L;
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("application/json");
		
		ObjectMapper mapper = new ObjectMapper();
		
		String offset= (req.getParameter("offset")==null) ? null : req.getParameter("offset");
		String limit= (req.getParameter("limit")==null) ? null : req.getParameter("limit");
		String count =  (req.getParameter("count")==null) ? null : req.getParameter("count");
		if(
			(offset!=null)&&(limit!=null)
			&&(offset.matches("^\\d+$"))
			&&(limit.matches("^\\d+$"))
		) {
			
			List<GRNModel> listItems = grnService.listActiveGRN(
						Integer.parseInt(offset),Integer.parseInt(limit)
					);

			if(count!=null) {
				int totalItem = grnService.getTotalItems();
				ObjectNode node = mapper.createObjectNode().put("totalItem", totalItem);
				ArrayNode arrayNode  = mapper.valueToTree(listItems);
				node.putArray("listGRN").addAll(arrayNode);
			mapper.writeValue(resp.getOutputStream(), node);
			}
			else {
				mapper.writeValue(resp.getOutputStream(), listItems);
				
			}
			
		} else {
			List<GRNModel> listItems = grnService.listActiveGRN();
			mapper.writeValue(resp.getOutputStream(), listItems);
		}
	}
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		req.setCharacterEncoding("UTF-8");
		resp.setContentType("application/json");
		ObjectMapper mapper = new ObjectMapper();
		ObjectNode resData = mapper.createObjectNode();
		
		GRNModel model = mapper.readValue(req.getInputStream(),GRNModel.class);
		model.setCustomerId(((UserModel)SessionUtil.getInstance().getValue(req, "user")).getCustomer_id());
		int idGRN = grnService.save(model);
		model.setId(idGRN);
		List<GRNInfoModel> listItem = model.getListInfoGRN().parallelStream().map( e ->{
				e.setIdGRN(idGRN);
				return e;
			}).collect(Collectors.toList());
		
		
		if(listItem.size()>0) {
			grnInfoService.saveMulti(listItem);			
			
		} else {
			RestUtil.message.delete(0, RestUtil.message.length());
			RestUtil.message.append("Error: Phiếu nhập trống");
		}
		
//		Lỗi insert -> xóa luôn GRN vừa tạo
		if(RestUtil.message.toString().startsWith("45000")||listItem.size()==0) {
			grnService.delete(model);
			resData.put("status", 400);
			resp.setStatus(400,RestUtil.message.toString());
			resData.put("message", RestUtil.message.toString());
			mapper.writeValue(resp.getOutputStream(), resData);	
			RestUtil.message.delete(0, RestUtil.message.length());
		} else {
			resData.put("status", 200);
			mapper.writeValue(resp.getOutputStream(), resData);	
		}	
	}
	
	@Override
	protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		req.setCharacterEncoding("UTF-8");
		resp.setContentType("application/json");
		ObjectMapper mapper = new ObjectMapper();
		ObjectNode resData = mapper.createObjectNode();
		
		GRNModel model = mapper.readValue(req.getInputStream(), GRNModel.class);
		grnService.delete(model);
		if(RestUtil.message.toString().startsWith("1644")) {
			resData.put("status", 400);
			resData.put("message", RestUtil.message.toString());
			mapper.writeValue(resp.getOutputStream(), resData);
			RestUtil.message.delete(0, RestUtil.message.length());
		} else {
			mapper.writeValue(resp.getOutputStream(), resData.put("status", 200));
		}
	}
	
	@Override
	protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		req.setCharacterEncoding("UTF-8");
		resp.setContentType("application/json");
		ObjectMapper mapper = new ObjectMapper();
		String path = req.getServletPath();
		GRNModel model = mapper.readValue(req.getInputStream(), GRNModel.class);
		if(path.equals("/api-grn-complete")) {
			grnService.saveComplete(model);
		}
		mapper.writeValue(resp.getOutputStream(), "Thành công");
	}
}

