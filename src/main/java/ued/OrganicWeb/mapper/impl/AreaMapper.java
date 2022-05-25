package ued.OrganicWeb.mapper.impl;

import java.sql.ResultSet;
import java.sql.SQLException;

import ued.OrganicWeb.mapper.MapModel;
import ued.OrganicWeb.model.AreaModel;

public class AreaMapper implements MapModel<AreaModel>{

	@Override
	public AreaModel mapRow(ResultSet rs) {
		try {
			AreaModel model = new AreaModel();
			model.setId(rs.getInt("id"));
			model.setCity(rs.getString("city"));
			model.setDistrict(rs.getString("district"));
			model.setSubDistrict(rs.getString("subdistrict"));
			return model;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}		
	}

}
