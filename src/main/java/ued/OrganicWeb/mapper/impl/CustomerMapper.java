package ued.OrganicWeb.mapper.impl;

import java.sql.ResultSet;
import java.sql.SQLException;

import ued.OrganicWeb.mapper.MapModel;
import ued.OrganicWeb.model.CustomerModel;


public class CustomerMapper implements MapModel<CustomerModel>{
	
	@Override
	public CustomerModel mapRow(ResultSet rs) {
			try {
				CustomerModel customer = new CustomerModel();
				customer.setId(rs.getInt("id"));
				customer.setEmail(rs.getString("email"));
				customer.setName(rs.getString("name"));
				customer.setPhoneNumber(rs.getString("phone_number"));
				customer.setHouseStreet(rs.getString("house_street"));
				customer.setCity(rs.getString("city"));
				customer.setDistrict(rs.getString("district"));
				customer.setSubDistrict(rs.getString("subdistrict"));
				customer.setAreaId(rs.getInt("area_id"));
				return customer;
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				return null;
			}
	}
}
