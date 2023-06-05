package ued.OrganicWeb.controller.admin;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ued.OrganicWeb.model.UserModel;
import ued.OrganicWeb.utils.SessionUtil;

/**
 * HP
 */
@WebServlet(urlPatterns = {"/admin/","/admin/*"})
public class AdminHomeServlet extends HttpServlet {
	/**
	 * 
	 */
	private static final long serialVersionUID = 6354799993042845015L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		RequestDispatcher rd = req.getRequestDispatcher("/decorators/admin.jsp");

		//		UserModel model = ((UserModel)SessionUtil.getInstance().getValue(req, "user"));
//		if(model!=null) {
//			Cookie cookie = new Cookie("fullName",((UserModel)SessionUtil.getInstance().getValue(req, "user")).getCustomer().getName());
//			cookie.setMaxAge(60 * 60 * 1); 			
//			resp.addCookie(cookie);
//		}
		rd.forward(req, resp);
	}	
}
