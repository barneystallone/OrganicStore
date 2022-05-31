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

import ued.OrganicWeb.model.UserModel;
import ued.OrganicWeb.service.IUserService;

@WebServlet(urlPatterns = {"/api-user-admin"})
public class UserAPI extends HttpServlet {
	/**
	 * 
	 */
	private static final long serialVersionUID = -3912384302556202491L;
	
	@Inject 
	IUserService userService;
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		resp.setContentType("application/json");
		List<UserModel> list =  userService.list();
		
		ObjectMapper mapper = new ObjectMapper();
		mapper.writeValue(resp.getOutputStream(), list);
	}
}
