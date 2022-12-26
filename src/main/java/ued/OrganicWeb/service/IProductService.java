package ued.OrganicWeb.service;

import java.util.List;

import ued.OrganicWeb.model.ProductModel;

public interface IProductService extends IGeneric2Service<ProductModel>{
//	List<ProductModel> listProducts(Integer... params);
	List<ProductModel> listDiscountProduct();
	List<ProductModel> searchProduct(String query);
	List<ProductModel> listTonKho();
	
}
