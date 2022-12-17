package ued.OrganicWeb.dao;


import java.util.List;

import ued.OrganicWeb.model.ProductModel;

public interface IProductDAO extends GenericDAO<ProductModel>{
	List<ProductModel> listDiscountProduct();
	List<ProductModel> searchProduct(String query);
}
