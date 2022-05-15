package ued.OrganicWeb.controller.admin.api;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ued.OrganicWeb.service.IGenericService;

public class AbstractServlet<T> extends HttpServlet{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1820244775708865835L;

	List<T> getList(IGenericService<T> service,HttpServletRequest req, HttpServletResponse resp){
		String sLimit  = (req.getParameter("limit")==null) ? "" : req.getParameter("limit");
		String sOffset  = (req.getParameter("offset")==null) ? "" : req.getParameter("offset");

		boolean [] a = {sLimit.matches("^\\d+$"),sOffset.matches("^\\d+$")};
		List<T> results = new ArrayList<>();
		switch (Arrays.toString(a)){
			case "[true, true]":
				results = service.list(Integer.parseInt(sOffset),Integer.parseInt(sLimit));
				break;
			case "[true, false]":
				results = service.list(Integer.parseInt(sLimit));
				break;
			default:
				results = service.list();
				break;
		}
		return results;
		
	}
}
