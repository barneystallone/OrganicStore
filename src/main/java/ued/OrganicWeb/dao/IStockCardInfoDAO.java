package ued.OrganicWeb.dao;

import java.util.List;

import ued.OrganicWeb.model.StockCardInfoModel;

public interface IStockCardInfoDAO {
	List<StockCardInfoModel> listIOProduct(int productId, int offset, int limit);
}
