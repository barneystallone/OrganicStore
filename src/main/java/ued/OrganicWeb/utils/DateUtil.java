package ued.OrganicWeb.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtil {
	
	
	public static String format(Date date) {
		return new SimpleDateFormat("dd-MM-yyyy").format(date);
	}
	public static Date parse(String str) {
		try {
			return new SimpleDateFormat("dd-MM-yyyy").parse(str);
		} catch (ParseException e) {
			return null;
		}
	}
}
