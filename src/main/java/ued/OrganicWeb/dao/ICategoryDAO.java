package ued.OrganicWeb.dao;

import java.util.List;

import ued.OrganicWeb.model.CategoryModel;

public interface ICategoryDAO {

	//=========================================
	List<CategoryModel> listCustomers(Integer... params);
	int save(CategoryModel category);
	void update(CategoryModel category);
	void delete(CategoryModel category);

}
