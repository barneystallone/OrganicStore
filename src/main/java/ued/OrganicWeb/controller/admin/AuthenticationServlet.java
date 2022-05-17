package ued.OrganicWeb.controller.admin;

import java.io.IOException;

import javax.inject.Inject;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ued.OrganicWeb.model.UserModel;
import ued.OrganicWeb.service.IUserService;
import ued.OrganicWeb.utils.FormDataUtil;
import ued.OrganicWeb.utils.SessionUtil;

@WebServlet(urlPatterns = {"/login","/logout"})
public class AuthenticationServlet extends HttpServlet{
	@Inject
	private IUserService userService;
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String path = req.getServletPath();
		if(path.equals("/login")) {
			String status = req.getParameter("status"); 
			
			UserModel user = (UserModel) SessionUtil.getInstance().getValue(req,"user");
			if(user!=null && user.getRole_id()==1) {
				resp.sendRedirect(req.getContextPath()+"/admin/");
			}
			else {
				RequestDispatcher rd = req.getRequestDispatcher("decorators/login.jsp");					
				rd.forward(req, resp);
			}
		} else if(path.equals("logout")) {
//			System.out.println(req.getContextPath());
			
		}
	}
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String path = req.getServletPath();
		if(path.equals("/login")) {
			UserModel userModel = FormDataUtil.toModel(UserModel.class, req);
			userModel = userService.getUserByLogin(userModel);
			if (userModel != null) {
				SessionUtil.getInstance().put(req,"user", userModel);
				resp.sendRedirect(req.getContextPath()+"/admin/");
			} else {
				resp.sendRedirect(req.getContextPath()+"/login");
			}
		}
	}
	
}
