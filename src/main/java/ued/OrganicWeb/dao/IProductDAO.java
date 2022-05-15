package ued.OrganicWeb.dao;

import java.util.List;
import ued.OrganicWeb.model.ProductModel;

public interface IProductDAO extends IGenericDAO<ProductModel>{
	List<ProductModel> listProducts(Integer... params);
	int save(ProductModel product);
	void update(ProductModel product);
	void delete(ProductModel product);
	ProductModel get(int id);
}
