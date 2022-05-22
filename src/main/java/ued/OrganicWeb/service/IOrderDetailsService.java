package ued.OrganicWeb.service;

import java.util.List;

import ued.OrganicWeb.model.OrderDetailsModel;

public interface IOrderDetailsService {
	List<OrderDetailsModel> list(int order_id);
	int save(OrderDetailsModel model);
	int saveMulti(List<OrderDetailsModel> listModel);
}
