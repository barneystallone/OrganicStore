package ued.OrganicWeb.utils;

import javax.servlet.http.HttpServletRequest;

public class SessionUtil {
	private static SessionUtil instance;
	
	private SessionUtil() {};
	public static SessionUtil getInstance() {
		if(instance==null) {
			instance = new SessionUtil();
		}
		return instance;
	}
	
	public Object getValue(HttpServletRequest req, String key ) {
		return req.getSession().getAttribute(key);
	}
	public void put(HttpServletRequest req, String key, Object value) {
		req.getSession().setAttribute(key, value);
	}
	
}
