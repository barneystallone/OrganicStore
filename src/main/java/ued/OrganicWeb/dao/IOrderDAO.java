package ued.OrganicWeb.dao;

import java.util.List;

import ued.OrganicWeb.model.OrderModel;

public interface IOrderDAO extends GenericDAO<OrderModel> {
	List<OrderModel> listOrders(int customerId );
}
