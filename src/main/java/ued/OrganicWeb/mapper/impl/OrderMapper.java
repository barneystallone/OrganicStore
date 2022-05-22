package ued.OrganicWeb.mapper.impl;

import java.sql.ResultSet;
import java.sql.SQLException;

import ued.OrganicWeb.dao.impl.AreaDAO;
import ued.OrganicWeb.dao.impl.CustomerDAO;
import ued.OrganicWeb.mapper.MapModel;
import ued.OrganicWeb.model.OrderModel;

public class OrderMapper implements MapModel<OrderModel>{

	@Override
	public OrderModel mapRow(ResultSet rs) {
		try {
			OrderModel model = new OrderModel();
			model.setId(rs.getInt("id"));
			model.setCreateDate(rs.getDate("createDate"));
			model.setStatus(rs.getInt("status"));
			model.setTotalPrice(rs.getInt("totalPrice"));
			model.setPayment_method(rs.getString("payment_method"));
			model.setCustomer_id(rs.getInt("customer_id"));
			model.setCustomer(CustomerDAO.getInstance().get(model.getCustomer_id()));
			model.setArea_id(rs.getInt("area_id"));
			model.setArea(AreaDAO.getInstance().get(model.getArea_id()));
			model.setShipping_address(rs.getString("shipping_address"));
			model.setRecipient_name(rs.getString("recipient_name"));
			model.setRecipient_phone(rs.getString("recipient_phone"));
			if(rs.getDate("purchaseDate")!=null) {
				model.setPurchaseDate(rs.getDate("purchaseDate"));				
			}
			return model;
		} catch (SQLException e) {
			// TODO: handle exception
			e.printStackTrace();
			return null;
		}
		
	}
	
}
