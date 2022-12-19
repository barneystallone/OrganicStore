package ued.OrganicWeb.service;

import java.util.List;

import ued.OrganicWeb.model.OrderModel;

public interface IOrderService extends IGeneric2Service<OrderModel> {
	List<OrderModel> listOrders(int customerId );
}
