package ued.OrganicWeb.controller.admin.api;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

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
import ued.OrganicWeb.service.IGRNService;

@WebServlet(urlPatterns = {"/api-grn"})
public class GrnAPI extends HttpServlet{

	@Inject
	IGRNService GRNService;
	
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
			
			List<GRNModel> listItems = GRNService.listActiveGRN(
						Integer.parseInt(offset),Integer.parseInt(limit)
					);

			if(count!=null) {
				int totalItem = GRNService.getTotalItems();
				ObjectNode node = mapper.createObjectNode().put("totalItem", totalItem);
				ArrayNode arrayNode  = mapper.valueToTree(listItems);
				node.putArray("listGRN").addAll(arrayNode);
			mapper.writeValue(resp.getOutputStream(), node);
			}
			else {
				mapper.writeValue(resp.getOutputStream(), listItems);
				
			}
			
		} else {
			List<GRNModel> listItems = GRNService.listActiveGRN();
			mapper.writeValue(resp.getOutputStream(), listItems);
		}
	}
}
