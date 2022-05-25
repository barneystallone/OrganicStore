package ued.OrganicWeb.mapper.impl;

import java.sql.ResultSet;
import java.sql.SQLException;

import ued.OrganicWeb.mapper.MapModel;
import ued.OrganicWeb.model.OrderDetailsModel;

public class OrderDetailsMapper implements MapModel<OrderDetailsModel> {

	@Override
	public OrderDetailsModel mapRow(ResultSet rs) {
		try {
			OrderDetailsModel model = new OrderDetailsModel();
			model.setOrder_id(rs.getInt("Order_id"));
			model.setProduct_id(rs.getInt("product_id"));
			model.setQuantity(rs.getInt("quantity"));
			model.setSubTotalPrice(rs.getInt("subTotalPrice"));
			return model;
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	
	}
	
}
