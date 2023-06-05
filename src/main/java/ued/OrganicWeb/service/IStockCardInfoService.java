package ued.OrganicWeb.service;

import java.util.List;

import ued.OrganicWeb.model.StockCardInfoModel;

public interface IStockCardInfoService {
	List<StockCardInfoModel> listIOProduct(int id,  int offset, int limit);
}
