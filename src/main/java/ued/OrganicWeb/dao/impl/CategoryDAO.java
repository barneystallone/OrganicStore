package ued.OrganicWeb.dao.impl;

import java.util.List;

import ued.OrganicWeb.dao.ICategoryDAO;
import ued.OrganicWeb.mapper.impl.CatergoryMapper;
import ued.OrganicWeb.model.CategoryModel;


public class CategoryDAO extends AbstractDAO<CategoryModel> implements ICategoryDAO{
	private static CategoryDAO instance = null;
	
	
	private CategoryDAO() {}
	
	public static CategoryDAO getInstance () {
		if (instance==null) {
			instance = new CategoryDAO();
		}
		return instance;
	}
	
	
	@Override
	public List<CategoryModel> list(Integer... params) {
		StringBuilder sql = new StringBuilder("Select * from category ");
		int len = params.length;
		if(len > 0) {
			int maxLen = Math.min(len, 2);
			String[] a = {" limit ? "," order by id" ," where id >= ?"};
			for(int i = maxLen;i>=0;i--) {
				sql.append(a[i]);
			}
		}
		return query(sql,new CatergoryMapper(),params);
	}

	@Override
	public int save(CategoryModel category) {
		StringBuilder sql = new StringBuilder("Insert into category(name , parent_id) values (? , ?)");
		if(category.getParent_id()!= 0) {
			return insert(sql, category.getName(),category.getParent_id());
		}
		else {
			return insert(sql, category.getName(),null);
		}
	}

	@Override
	public void update(CategoryModel category) {
		StringBuilder sql = new StringBuilder("Update category set name = ? , parent_id = ? where id = ?");
		if(category.getParent_id()!= 0) {
			super.update(sql,category.getName(),category.getParent_id(),category.getId() );
		}
		else {
			super.update(sql,category.getName(),null,category.getId() );
		}
		
	}

	@Override
	public void delete(CategoryModel category) {
		// TODO Auto-generated method stub
		StringBuilder sql = new StringBuilder("Delete from category where id = ?");
		super.update(sql, category.getId());
		
	}

	@Override
	public CategoryModel get(int id) {
		StringBuilder sql = new StringBuilder("Select * from category where id = ?");
		return super.get(sql, new CatergoryMapper(), id);
	}

	@Override
	public int getRowCount() {
		StringBuilder sql = new StringBuilder("select count(id) from category");
		return rowCount(sql);
	}
	
	
	
}
