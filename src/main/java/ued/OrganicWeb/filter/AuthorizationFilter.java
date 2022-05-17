package ued.OrganicWeb.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ued.OrganicWeb.model.UserModel;
import ued.OrganicWeb.utils.SessionUtil;

public class AuthorizationFilter implements Filter{

	
	@Override
	public void doFilter(ServletRequest arg0, ServletResponse arg1, FilterChain arg2)
			throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) arg0;
		HttpServletResponse res = (HttpServletResponse) arg1;

		UserModel user = (UserModel) SessionUtil.getInstance().getValue(req, "user");
		if(user!= null && user.getRole_id()==1 ) {
				arg2.doFilter(arg0, arg1);
		} else {
			res.sendRedirect(req.getContextPath()+"/login");
		}
		
	}

}
