package ued.OrganicWeb.service;

import java.util.List;

import ued.OrganicWeb.model.OrderModel;

public interface IOrderService extends IGenericService<OrderModel> {
	List<OrderModel> listOrders(int customerId );
}
