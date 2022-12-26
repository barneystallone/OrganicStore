package ued.OrganicWeb.dao;


import java.util.List;

import ued.OrganicWeb.model.ProductModel;
import ued.OrganicWeb.model.StockCardInfoModel;

public interface IProductDAO extends Generic2DAO<ProductModel>{
	List<ProductModel> listDiscountProduct();
	List<ProductModel> searchProduct(String query);
	ProductModel getNameAndPrice(int id);
	List<ProductModel> listTonKho ();
}
