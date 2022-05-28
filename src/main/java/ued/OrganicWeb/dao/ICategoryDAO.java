package ued.OrganicWeb.dao;



import java.util.List;

import ued.OrganicWeb.model.CategoryModel;


public interface ICategoryDAO extends GenericDAO<CategoryModel> {
	List<CategoryModel> listParentCategory();
//	//=========================================
//	List<CategoryModel> list(Integer... params);
//	int save(CategoryModel category);
//	void update(CategoryModel category);
//	void delete(CategoryModel category);
//	CategoryModel get(int id);
//	int getRowCount();
}
