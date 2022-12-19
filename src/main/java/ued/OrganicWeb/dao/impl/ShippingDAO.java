package ued.OrganicWeb.dao.impl;


import ued.OrganicWeb.dao.IShippingDAO;
import ued.OrganicWeb.mapper.impl.ShipCODMapper;
import ued.OrganicWeb.model.ShipCODModel;

public class ShippingDAO extends AbstractDAO<ShipCODModel> implements IShippingDAO{
	
	private static  ShippingDAO instance;
	
	private ShippingDAO() {};
	
	public static  ShippingDAO getInstance() {
		if(instance == null) {
			instance = new ShippingDAO();
		}
		return instance;
	}
	@Override
	public int save(ShipCODModel model) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public void update(ShipCODModel model) {
		StringBuilder sql = new StringBuilder("Update shipcod set min_price = ?, max_distance_for_min_price = ?,"
				+ " price_per_kilo = ?, weight_kg = ? ");		
		
		super.update(
				sql, 
				model.getMin_price(),
				model.getMax_distance_for_min_price(),
				model.getPrice_per_kilo(),
				model.getWeight_kg()
		);
	}
		
	@Override
	public void delete(ShipCODModel model) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public ShipCODModel getShippingPriceList() {
		StringBuilder sql = new StringBuilder("Select * from shipcod LIMIT 1 ");
		return query(sql, new ShipCODMapper()).get(0);
	}

	

	
}
