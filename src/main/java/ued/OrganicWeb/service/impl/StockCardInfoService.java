package ued.OrganicWeb.service.impl;

import java.util.List;

import javax.inject.Inject;

import ued.OrganicWeb.dao.IStockCardInfoDAO;
import ued.OrganicWeb.model.StockCardInfoModel;
import ued.OrganicWeb.service.IStockCardInfoService;

public class StockCardInfoService implements IStockCardInfoService{

	@Inject
	IStockCardInfoDAO stockCardInfoDAO;
	
	@Override
	public List<StockCardInfoModel> listIOProduct(int id, int offset, int limit) {
		// TODO Auto-generated method stub
		return stockCardInfoDAO.listIOProduct(id, offset,limit);
	}

}
