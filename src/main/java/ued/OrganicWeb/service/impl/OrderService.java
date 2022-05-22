package ued.OrganicWeb.service.impl;

import java.util.List;

import ued.OrganicWeb.dao.IOrderDAO;
import ued.OrganicWeb.dao.impl.OrderDAO;
import ued.OrganicWeb.model.OrderModel;
import ued.OrganicWeb.service.IOrderService;

public class OrderService implements IOrderService {

	private IOrderDAO orderDAO = OrderDAO.getInstance();
	
	@Override
	public int save(OrderModel model) {
		return orderDAO.save(model);
	}

	@Override
	public List<OrderModel> list(Integer... params) {
		// TODO Auto-generated method stub
		return null;
	}

	
	@Override
	public void update(OrderModel model) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void delete(OrderModel model) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public OrderModel get(int id) {
		// TODO Auto-generated method stub
		return orderDAO.get(id);
	}

	@Override
	public List<OrderModel> listOrders(int customerId) {
		return orderDAO.listOrders(customerId);
	}

}
