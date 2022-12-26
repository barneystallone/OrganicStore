package ued.OrganicWeb.dao;


import java.util.List;

import ued.OrganicWeb.model.ProductModel;

public interface IProductDAO extends Generic2DAO<ProductModel>{
	List<ProductModel> listDiscountProduct();
	List<ProductModel> searchProduct(String query);
	ProductModel getNameAndPrice(int id);
	List<ProductModel> listTonKho ();
}
