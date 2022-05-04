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
		ObjectMapper mapper = new ObjectMapper();
		req.setCharacterEncoding("UTF-8");
		resp.setContentType("application/json");
		List<CustomerModel> results = customerService.listCustomers(2);

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
