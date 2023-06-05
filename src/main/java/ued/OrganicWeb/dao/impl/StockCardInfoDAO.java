package ued.OrganicWeb.dao.impl;

import java.util.List;

import ued.OrganicWeb.dao.IStockCardInfoDAO;
import ued.OrganicWeb.mapper.impl.StockCardInfoMapper;
import ued.OrganicWeb.model.StockCardInfoModel;

public class StockCardInfoDAO extends AbstractDAO<StockCardInfoModel> implements IStockCardInfoDAO{

	@Override
	public List<StockCardInfoModel> listIOProduct(int productId, int offset, int limit) {
		// TODO Auto-generated method stub
		StringBuilder sql = new StringBuilder("call listIOProduct(?,?,?)");
		
		
		return call(sql ,new StockCardInfoMapper(),productId,offset,limit);	
	}
}
