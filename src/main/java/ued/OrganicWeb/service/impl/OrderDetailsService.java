package ued.OrganicWeb.service.impl;

import java.util.List;

import ued.OrganicWeb.dao.IOrderDetailsDAO;
import ued.OrganicWeb.dao.impl.OrderDetailsDAO;
import ued.OrganicWeb.model.OrderDetailsModel;
import ued.OrganicWeb.service.IOrderDetailsService;

public class OrderDetailsService implements IOrderDetailsService {

	private IOrderDetailsDAO orderdetailsDAO = OrderDetailsDAO.getInstance();
	
	@Override
	public List<OrderDetailsModel> list(int order_id) {
		return orderdetailsDAO.list(order_id);
	}

	@Override
	public int save(OrderDetailsModel model) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int saveMulti(List<OrderDetailsModel> listModel) {
		// TODO Auto-generated method stub
		return orderdetailsDAO.saveMulti(listModel);
	}

}
