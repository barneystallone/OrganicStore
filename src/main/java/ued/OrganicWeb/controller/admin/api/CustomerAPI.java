package ued.OrganicWeb.controller.admin.api;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import ued.OrganicWeb.model.CustomerModel;
import ued.OrganicWeb.service.ICustomerService;
import ued.OrganicWeb.utils.HttpUtil;

/**
 * HP
 */
@WebServlet(urlPatterns = { "/api-customer-admin" })
public class CustomerAPI extends HttpServlet {
	@Inject
	private ICustomerService customerService;

	private static final long serialVersionUID = 4470621607563822872L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
	/**
	 *  Access origin control
	 *  
        List<String> incomingURLs = Arrays.asList(getServletContext().getInitParameter("urlCallAPI").trim().split(","));        
        String clientOrigin = req.getHeader("origin");
        int myIndex = incomingURLs.indexOf(clientOrigin);
        
        if(myIndex != -1){
        	resp.setHeader("Access-Control-Allow-Origin", clientOrigin);
        	resp.setHeader("Access-Control-Allow-Methods", "GET");
        	resp.setHeader("Access-Control-Allow-Headers", "Content-Type");
        	resp.setHeader("Access-Control-Max-Age", "86400");
        }
	 * 
	 */
		
		// full access 
		resp.setHeader("Access-Control-Allow-Origin","*");
		
		ObjectMapper mapper = new ObjectMapper();
		req.setCharacterEncoding("UTF-8");
		resp.setContentType("application/json");
		String sLimit  = (req.getParameter("limit")==null) ? "" : req.getParameter("limit");
		String sOffset  = (req.getParameter("offset")==null) ? "" : req.getParameter("offset");

		List<CustomerModel> results = new ArrayList<>();
		if (sLimit.matches("^\\d+$")){
			int limit = Integer.parseInt(sLimit);
			if(sOffset.matches("^\\d+$")) {
				int offset = Integer.parseInt(sOffset);
				results = customerService.listCustomers(offset , limit );							
			} else {
				results = customerService.listCustomers(limit);							
			}
		} else {
			results = customerService.listCustomers();	
		}

		mapper.writeValue(resp.getOutputStream(), results);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		ObjectMapper mapper = new ObjectMapper();
		req.setCharacterEncoding("UTF-8");
		resp.setContentType("application/json");
		CustomerModel customer = HttpUtil.of(req.getReader()).toModel(CustomerModel.class);
		int id = customerService.save(customer);

		 ObjectNode idObject = mapper.createObjectNode();
		 idObject.put("id", id);
		    mapper.writeValue(resp.getOutputStream(), idObject);
		    
	}
	@Override
	protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		req.setCharacterEncoding("UTF-8");
		CustomerModel customer = HttpUtil.of(req.getReader()).toModel(CustomerModel.class);
		customerService.update(customer);
	}
	@Override
	protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		req.setCharacterEncoding("UTF-8");
		CustomerModel customer = HttpUtil.of(req.getReader()).toModel(CustomerModel.class);
		customerService.delete(customer);
	}
}
