package ued.OrganicWeb.dao;

import ued.OrganicWeb.model.ShipCODModel;

public interface IShippingDAO extends Generic1DAO<ShipCODModel>{
	ShipCODModel getShippingPriceList();
}
