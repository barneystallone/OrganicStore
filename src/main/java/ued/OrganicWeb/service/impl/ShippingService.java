package ued.OrganicWeb.service.impl;


import java.text.DecimalFormat;

import ued.OrganicWeb.dao.impl.ShippingDAO;
import ued.OrganicWeb.model.ShipCODModel;
import ued.OrganicWeb.service.IShippingService;

public class ShippingService implements IShippingService{
	
	private ShippingDAO shippingDAO = ShippingDAO.getInstance();
	
	@Override
	public int save(ShipCODModel model) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public void update(ShipCODModel model) {
		// TODO Auto-generated method stub
		shippingDAO.update(model);
	}

	@Override
	public void delete(ShipCODModel model) {
		// TODO Auto-generated method stub
		
	}

	// <10kg
	@Override
	public int calcShippingFee(float distance) {
		// Làm tròn tới 1 chữ số thập phân
		distance = (float)Math.round(distance*10)/10;
		ShipCODModel model = getShippingPriceList();
		// khoảng cách bị dư ra
		float offset = (float)Math.round((distance - model.getMax_distance_for_min_price())*10)/10;
		float shippingFee = (offset < 0) ? model.getMin_price() 
				: model.getMin_price() + offset* model.getPrice_per_kilo();
		return Math.round(shippingFee);
	}

	@Override
	public ShipCODModel getShippingPriceList() {
		// TODO Auto-generated method stub
		return shippingDAO.getShippingPriceList();
	}

	



}
