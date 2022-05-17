package ued.OrganicWeb.mapper.impl;

import java.sql.ResultSet;
import java.sql.SQLException;

import ued.OrganicWeb.dao.impl.CustomerDAO;
import ued.OrganicWeb.mapper.MapModel;
import ued.OrganicWeb.model.UserModel;

public class UserMapper implements MapModel<UserModel> {

	@Override
	public UserModel mapRow(ResultSet rs) {
		try {
			UserModel userModel = new  UserModel();
			userModel.setId(rs.getInt("id"));
			try {
				userModel.setUsername(rs.getString("username"));
				userModel.setCustomer_id(rs.getInt("customer_id"));
				userModel.setRole_id(rs.getInt("role_id"));
				userModel.setStatus(rs.getBoolean("status"));
				userModel.setCustomer(CustomerDAO.getInstance().get(userModel.getCustomer_id()));
				return userModel;
			} catch (Exception e) {
				return userModel;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}
	
}
