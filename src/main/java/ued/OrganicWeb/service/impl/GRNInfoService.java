package ued.OrganicWeb.service.impl;

import java.util.List;

import ued.OrganicWeb.dao.IGRNInfoDAO;
import ued.OrganicWeb.dao.impl.GRNInfoDAO;
import ued.OrganicWeb.model.GRNInfoModel;
import ued.OrganicWeb.service.IGRNInfoService;

public class GRNInfoService implements IGRNInfoService {

	IGRNInfoDAO grnInfoDAO = GRNInfoDAO.getInstance();
	@Override
	public int save(GRNInfoModel model) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public void update(GRNInfoModel model) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void delete(GRNInfoModel model) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public int saveMulti(List<GRNInfoModel> listModel) {
		// TODO Auto-generated method stub
		return grnInfoDAO.saveMulti(listModel);
	}
	
}
