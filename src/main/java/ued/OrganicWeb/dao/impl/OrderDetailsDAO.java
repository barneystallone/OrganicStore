package ued.OrganicWeb.dao.impl;

import java.util.ArrayList;
import java.util.List;


import ued.OrganicWeb.dao.IOrderDetailsDAO;
import ued.OrganicWeb.mapper.impl.OrderDetailsMapper;
import ued.OrganicWeb.model.OrderDetailsModel;

public class OrderDetailsDAO extends AbstractDAO<OrderDetailsModel> implements IOrderDetailsDAO{
	
	private static OrderDetailsDAO instance = null;
	
	private OrderDetailsDAO() {};

	public static OrderDetailsDAO getInstance() {
		if(instance == null) {
			instance = new OrderDetailsDAO();
		}
		return instance;
	}
	
	
	@Override
	public List<OrderDetailsModel> list(int orderId) {
		StringBuilder sql = new StringBuilder("Select * from orderdetails where order_id= ? ");
		return query(sql, new OrderDetailsMapper(), orderId);
	}

	@Override
	public int save(OrderDetailsModel model) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int saveMulti(List<OrderDetailsModel> listModel) {
		StringBuilder sql = new StringBuilder("Insert into orderdetails values");
		List<Object> itemFields = new ArrayList<>();
		for (OrderDetailsModel model : listModel) {
			sql.append("(?,?,?,?), ");
			itemFields.add(model.getQuantity());
			itemFields.add(model.getSubTotalPrice());
			itemFields.add(model.getOrder_id());
			itemFields.add(model.getProduct_id());
		}
		sql.deleteCharAt(sql.length()-2);
		return insert(sql , itemFields.toArray(new Object[0]));
	}

}
