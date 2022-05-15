package ued.OrganicWeb.service.impl;

import java.util.List;

import ued.OrganicWeb.dao.ICategoryDAO;
import ued.OrganicWeb.dao.impl.CategoryDAO;
import ued.OrganicWeb.model.CategoryModel;
import ued.OrganicWeb.service.ICategoryService;

public class CategoryService implements ICategoryService {

	private ICategoryDAO categoryDAO = CategoryDAO.getInstance();

	@Override
	public List<CategoryModel> listCategories(Integer... params) {
		return categoryDAO.listCategories(params);
	}
	public int save(CategoryModel customer) {
		return categoryDAO.save(customer);
	}
	@Override
	public void update(CategoryModel customer) {
		categoryDAO.update(customer);
	}
	@Override
	public void delete(CategoryModel customer) {
		categoryDAO.delete(customer);
	}
	@Override
	public CategoryModel get(int id) {
		return categoryDAO.get(id);
	}
	@Override
	public List<CategoryModel> list(Integer... params) {
		return categoryDAO.listCategories(params);
	}
	
	
}
