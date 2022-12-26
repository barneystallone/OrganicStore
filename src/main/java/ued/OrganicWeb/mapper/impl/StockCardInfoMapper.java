package ued.OrganicWeb.mapper.impl;

import java.sql.ResultSet;
import java.sql.SQLException;

import ued.OrganicWeb.mapper.MapModel;
import ued.OrganicWeb.model.StockCardInfoModel;

public class StockCardInfoMapper implements MapModel<StockCardInfoModel>{
	
	@Override
	public StockCardInfoModel mapRow(ResultSet rs) {
		try {
			StockCardInfoModel model = new StockCardInfoModel();
			
			model.setId(rs.getInt("chungTu"));
			model.setNgayGio(rs.getTimestamp("ngayGio"));
			model.setQuantity(rs.getInt("quantity"));
			model.setGiaBan(rs.getInt("giaBan"));
			model.setGiaNhap(rs.getInt("giaNhap"));
			
			return model;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			return null;
		}
	}
}
