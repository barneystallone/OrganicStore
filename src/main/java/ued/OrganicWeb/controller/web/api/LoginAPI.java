package ued.OrganicWeb.controller.web.api;

import java.io.IOException;

import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

import ued.OrganicWeb.model.UserModel;
import ued.OrganicWeb.service.IUserService;
import ued.OrganicWeb.utils.FormDataUtil;
import ued.OrganicWeb.utils.RestUtil;
import ued.OrganicWeb.utils.SessionUtil;

@WebServlet(urlPatterns = {"/api-auth-login","/api-signup","/api-logout"})
public class LoginAPI extends HttpServlet {
	
	@Inject
	IUserService userService;
	/**
	 * 
	 */
	private static final long serialVersionUID = -9172823678396674476L;
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		req.setCharacterEncoding("UTF-8");
		resp.setContentType("application/json");
		String path = req.getServletPath();
		ObjectMapper mapper = new ObjectMapper();
		if(path.equals("/api-logout")) {
			SessionUtil.getInstance().remove(req, "user");
			mapper.writeValue(resp.getOutputStream(), mapper.createObjectNode().put("success", "LogOut thành công"));
		}
//		UserModel model = userService.get(1);
//		mapper.writeValue(resp.getOutputStream(), model);
	}
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		req.setCharacterEncoding("UTF-8");
		resp.setContentType("application/json");
		String path = req.getServletPath();
		ObjectMapper mapper = new ObjectMapper();
		if(path.equals("/api-auth-login")) {
			UserModel userModel = RestUtil.of(req.getReader()).toModel(UserModel.class);
			userModel = userService.getUserByLogin(userModel);
			if (userModel != null) {
				SessionUtil.getInstance().put(req,"user", userModel);
				mapper.writeValue(resp.getOutputStream(), mapper.createObjectNode().put("success", "Login success"));
			} else {
				mapper.writeValue(resp.getOutputStream(), mapper.createObjectNode().put("fail", "Sai tên đăng nhập hoặc mật khẩu"));
			}
		} else if (path.equals("/api-signup")) {
			UserModel userModel = RestUtil.of(req.getReader()).toModel(UserModel.class);
			userModel.setRole_id(2);
			userModel.setStatus(true);
			int id = userService.save(userModel);
			if(id>0) {
				SessionUtil.getInstance().put(req,"user", userService.get(id));
				mapper.writeValue(resp.getOutputStream(), mapper.createObjectNode().put("success", "đăng ký thành công tài khoản "+ userModel.getUsername()));
			} else {
				mapper.writeValue(resp.getOutputStream(), mapper.createObjectNode().put("fail", "Trùng tên đăng nhập "));
			}
		}
		
	}
	@Override
	protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		req.setCharacterEncoding("UTF-8");
		resp.setContentType("application/json");
		String path = req.getServletPath();
		ObjectMapper mapper = new ObjectMapper();
		
	}
}
