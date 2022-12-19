package ued.OrganicWeb.service;

import ued.OrganicWeb.model.ShipCODModel;

public interface IShippingService extends IGenericService<ShipCODModel> {
	ShipCODModel getShippingPriceList();
	// distance được làm tròn tới 1 chữ số thập phân
	int calcShippingFee(float distance);

}
