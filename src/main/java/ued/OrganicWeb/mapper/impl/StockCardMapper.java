package ued.OrganicWeb.mapper.impl;

import java.sql.ResultSet;
import java.sql.SQLException;

import ued.OrganicWeb.mapper.MapModel;
import ued.OrganicWeb.model.StockCardModel;

public class StockCardMapper implements MapModel<StockCardModel>{
	
	@Override
	public StockCardModel mapRow(ResultSet rs) {
		try {
			StockCardModel category = new StockCardModel();
			category.setId(rs.getInt("id"));
			category.setNgayGio(rs.getTimestamp("ngayGio"));
			category.setQuantity(rs.getInt("quantity"));
			category.setGiaBan(rs.getInt("giaBan"));
			category.setGiaNhap(rs.getInt("giaNhap"));
			
			return category;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			return null;
		}
	}
}
