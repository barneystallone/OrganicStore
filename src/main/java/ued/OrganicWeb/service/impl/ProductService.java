package ued.OrganicWeb.service.impl;

import java.util.List;

import ued.OrganicWeb.dao.impl.ProductDAO;
import ued.OrganicWeb.model.ProductModel;
import ued.OrganicWeb.service.IProductService;

public class ProductService implements IProductService{

	ProductDAO productDAO = ProductDAO.getInstance();
	
	@Override
	public int save(ProductModel model) {
		return productDAO.save(model);
	}

	@Override
	public void update(ProductModel model) {
		productDAO.save(model);
	}

	@Override
	public void delete(ProductModel model) {
		productDAO.delete(model);
		
	}

	@Override
	public ProductModel get(int id) {
		return productDAO.get(id);
	}

	@Override
	public List<ProductModel> listProducts(Integer... params) {
		return productDAO.listProducts(params);
	}

	@Override
	public List<ProductModel> list(Integer... params) {
		return productDAO.listProducts(params);
	}
	
}
