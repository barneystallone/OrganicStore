package ued.OrganicWeb.service.impl;

import java.util.List;

import ued.OrganicWeb.dao.IGrnDAO;
import ued.OrganicWeb.dao.impl.GRNDAO;
import ued.OrganicWeb.model.GRNModel;
import ued.OrganicWeb.service.IGRNService;

public class GRNService implements IGRNService{

	IGrnDAO GrnDAO = GRNDAO.getInstance();
	
	@Override
	public List<GRNModel> list(Integer... params) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public GRNModel get(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int save(GRNModel model) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public void update(GRNModel model) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void delete(GRNModel model) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<GRNModel> listActiveGRN(Integer... params) {
		return GrnDAO.listActiveGRN(params);
	}

	@Override
	public int getTotalItems() {
		return GrnDAO.getTotalItems();
	}

}
