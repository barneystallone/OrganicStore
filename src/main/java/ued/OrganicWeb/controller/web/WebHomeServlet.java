package ued.OrganicWeb.controller.web;

import java.io.IOException;
import java.nio.file.Path;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(urlPatterns = {"/","/shopping","/shopping/*","/details/*"})
public class WebHomeServlet extends HttpServlet {
	/**
	 * 
	 */
	private static final long serialVersionUID = 8505469267333734297L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		System.out.println(req.getServletContext().getContextPath());
		RequestDispatcher rd  =req.getRequestDispatcher("/decorators/web.jsp"); 
		rd.forward(req, resp);
		
//		resp.sendRedirect(req.getContextPath()+"/decorators/web.jsp"); 
	}
}
