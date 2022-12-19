package ued.OrganicWeb.dao.impl;

import java.util.ArrayList;
import java.util.List;

import ued.OrganicWeb.dao.IOrderDAO;
import ued.OrganicWeb.mapper.impl.OrderMapper;
import ued.OrganicWeb.model.OrderModel;

public class OrderDAO extends AbstractDAO<OrderModel> implements IOrderDAO{

	private static OrderDAO instance = null;
	
	private OrderDAO() {};

	public static OrderDAO getInstance() {
		if(instance == null) {
			instance = new OrderDAO();
		}
		return instance;
	}
	
	@Override
	public List<OrderModel> list(Integer... params) {
		StringBuilder sql = new StringBuilder("Select * from BillOrder ");
		int len = params.length;
		if(len > 0) {
			int maxLen = Math.min(len, 2);
			String[] a = {" limit ? "," order by id" ," where id >= ?"};
			for(int i = maxLen;i>=0;i--) {
				sql.append(a[i]);
			}
		}
		return query(sql, new OrderMapper(), params);
	}
	
	@Override
	public int save(OrderModel model) {
		StringBuilder sql = new StringBuilder("Insert into BillOrder"
			+ "(createDate,status,totalPrice,shipping_address,"
			+ "recipient_name,recipient_phone,payment_method,customer_id,area_id,shippingFee) "
			+ "values(?,?,?,?,?,?,?,?,?,?)");
		List<Object> fields = List.of(
			model.getCreateDate(),
			model.getStatus(),
			model.getTotalPrice(),
			model.getShipping_address(),
			model.getRecipient_name(),
			model.getRecipient_phone(),
			"cod",
			model.getCustomer_id(),
			model.getArea_id(),
			model.getShippingFee()
		);

		return insert(sql, fields.toArray(new Object[0]));
	}

	@Override
	public void update(OrderModel model) {
		StringBuilder sql = new StringBuilder("Update BillOrder set status = 1 , purchaseDate = ? where id = ?");
		super.update(sql,model.getPurchaseDate(),model.getId());
//		super.update(sql,new java.util.Date(),model.getId());
	}

	@Override
	public void delete(OrderModel model) {
		StringBuilder sql = new StringBuilder("delete from BillOrder where id = ? ");
		super.update(sql,model.getId());
	}

	@Override
	public OrderModel get(int id) {
		StringBuilder sql = new StringBuilder("Select * from BillOrder where id = ?");
		return super.get(sql, new OrderMapper(), id);
	}
	@Override
	public List<OrderModel> listOrders(int customerId ) {
		StringBuilder sql = new StringBuilder("Select * from BillOrder where customer_id = ? ");
		return query(sql, new OrderMapper(), customerId);
	}
	@Override
	public int getRowCount() {
		StringBuilder sql = new StringBuilder("select count(id) from BillOrder");
		return rowCount(sql);
	}
	
}
