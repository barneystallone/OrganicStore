package ued.OrganicWeb.mapper.impl;

import java.sql.ResultSet;
import java.sql.SQLException;

import ued.OrganicWeb.mapper.MapModel;
import ued.OrganicWeb.model.ShipCODModel;

public class ShipCODMapper implements MapModel<ShipCODModel> {

	@Override
	public ShipCODModel mapRow(ResultSet rs) {
		try {
			ShipCODModel model = new ShipCODModel();
			model.setId(rs.getInt("id"));
			model.setMin_price(rs.getInt("min_price"));
			model.setMax_distance_for_min_price(rs.getInt("max_distance_for_min_price"));
			model.setPrice_per_kilo(rs.getInt("price_per_kilo"));
			model.setWeight_kg(rs.getInt("Weight_kg"));
			
			return model;
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
		
	}

}
