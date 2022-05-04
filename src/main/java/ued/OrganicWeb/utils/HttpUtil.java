package ued.OrganicWeb.utils;

import java.io.BufferedReader;
import java.io.IOException;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class HttpUtil {

	private String strJson;

	public HttpUtil(String strJson) {
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

	public static HttpUtil of(BufferedReader reader) {
		StringBuffer sb = new StringBuffer();
		try {
			String line;
			while ((line = reader.readLine()) != null) {
				sb.append(line);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return new HttpUtil(sb.toString());
	}

}
