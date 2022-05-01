package ued.OrganicWeb.mapper;

import java.sql.ResultSet;

public interface MapModel<T> {
	T mapRow(ResultSet rs);
}
