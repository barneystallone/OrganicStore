package ued.OrganicWeb.utils;

import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.InvocationTargetException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.Part;

import org.apache.commons.beanutils.BeanUtils;

public class FormDataUtil {
	public static <T> T toModel (Class<T> tClass, HttpServletRequest req) {
		T obj = null;
		try {
			obj = tClass.newInstance();
			BeanUtils.populate(obj, req.getParameterMap());
		} catch (InstantiationException | IllegalAccessException | InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		
		return obj;
	}
	public static byte[] getImageBytes(Part part) {
		long size = part.getSize();
		if(part!=null && size>0) {
			byte[] imageBytes = new byte[(int) size];
			InputStream inputStream;
			try {
				inputStream = part.getInputStream();
				inputStream.read(imageBytes);
				inputStream.close();
				return imageBytes;
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return null;
	}
}
