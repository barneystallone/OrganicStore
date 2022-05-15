package ued.OrganicWeb.service;

import java.util.List;

import ued.OrganicWeb.model.CategoryModel;

public interface ICategoryService extends IGenericService<CategoryModel>{
	List<CategoryModel> listCategories(Integer... params);	
}
