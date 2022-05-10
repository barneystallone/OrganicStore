package ued.OrganicWeb.dao.impl;

import java.util.List;

import ued.OrganicWeb.dao.ICategoryDAO;
import ued.OrganicWeb.model.CategoryModel;
import ued.OrganicWeb.model.CustomerModel;


public class CategoryDAO extends AbstractDAO<CustomerModel> implements ICategoryDAO{

	@Override
	public List<CategoryModel> listCustomers(Integer... params) {
		StringBuilder sql = new StringBuilder("Select * from category ");
		return null;
	}

	@Override
	public int save(CategoryModel category) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public void update(CategoryModel category) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void delete(CategoryModel category) {
		// TODO Auto-generated method stub
		
	}
	
	
	
}
