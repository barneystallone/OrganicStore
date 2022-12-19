package ued.OrganicWeb.controller.web.api;

import java.io.IOException;

import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import ued.OrganicWeb.service.IShippingService;
import ued.OrganicWeb.service.impl.ShippingService;

@WebServlet(urlPatterns = {"/api-shipping"})
public class ShippingAPI extends HttpServlet {
	
	@Inject
	IShippingService  shippingService ;
	
	private static final long serialVersionUID = -2280244828821190808L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		req.setCharacterEncoding("UTF-8");
		resp.setContentType("application/json");
		
		ObjectMapper mapper = new ObjectMapper();
		String distance = (req.getParameter("distance")==null)? null :req.getParameter("distance");
		distance = distance.replaceAll("[\\sA-Za-z]+", "");
		
		if(distance !=null && distance.matches("^\\d+(\\.\\d+){0,1}")) {
			int shippingFee = shippingService.calcShippingFee(Float.parseFloat(distance));
			mapper.writeValue(resp.getOutputStream(),shippingFee);
		}
	}
}
