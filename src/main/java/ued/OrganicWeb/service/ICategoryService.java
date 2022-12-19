package ued.OrganicWeb.service;

import java.util.List;

import ued.OrganicWeb.model.CategoryModel;

public interface ICategoryService extends IGeneric2Service<CategoryModel>{
//	List<CategoryModel> listCategories(Integer... params);	
	int getRowCount();
	List<CategoryModel> listParentCategory();
	List<CategoryModel> listChildCategory();
}
