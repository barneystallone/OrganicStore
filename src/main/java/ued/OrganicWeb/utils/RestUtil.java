package ued.OrganicWeb.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import ued.OrganicWeb.service.IGenericService;

public class RestUtil {

	private String strJson;
	public static StringBuilder message= new StringBuilder("a v");
	public RestUtil(String strJson) {
		this.strJson = strJson;
	}

	public <T> T toModel(Class<T> classType) {

		try {
			return new ObjectMapper().readValue(this.strJson, classType);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return null;
	}
	public <T> List<T> toListModels(Class<T[]> classType) {
		try {
			return Arrays.asList(new ObjectMapper().readValue(this.strJson, classType));
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			return null;
		}
	}
	public static RestUtil of(BufferedReader reader) {
		StringBuffer sb = new StringBuffer();
		try {
			String line;
			while ((line = reader.readLine()) != null) {
				sb.append(line);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return new RestUtil(sb.toString());
	}
	// limit , offset
	public static <T> List<T> getList(IGenericService<T> service,HttpServletRequest req, HttpServletResponse resp){
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
