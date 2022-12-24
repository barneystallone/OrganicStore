package ued.OrganicWeb.mapper.impl;

import java.sql.ResultSet;
import java.sql.SQLException;

import ued.OrganicWeb.dao.impl.CustomerDAO;
import ued.OrganicWeb.dao.impl.GRNInfoDAO;
import ued.OrganicWeb.mapper.MapModel;
import ued.OrganicWeb.model.GRNModel;

public class GRNMapper implements MapModel<GRNModel>{

	
	
	@Override
	public GRNModel mapRow(ResultSet rs) {
		try {
			GRNModel model = new GRNModel();
			model.setId(rs.getInt("id"));
			model.setCustomerId(rs.getInt("customerId"));
			model.setTraTruoc(rs.getInt("traTruoc"));
			model.setGRNstatus(rs.getString("GRNstatus"));
			model.setTotalPrice(rs.getInt("totalPrice"));
			model.setNgayGio(rs.getTimestamp("ngayGio"));
			model.setCustomer(CustomerDAO.getInstance().get(model.getCustomerId()));
//			set list info
			model.setListInfoGRN(GRNInfoDAO.getInstance().listBy_idGRN(model.getId()));
			model.setTotalCountInfoGRN(model.getListInfoGRN().size());
			
			return model;
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}
	
}
