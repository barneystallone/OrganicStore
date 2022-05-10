package ued.OrganicWeb.mapper.impl;

import java.sql.ResultSet;
import java.sql.SQLException;

import ued.OrganicWeb.mapper.MapModel;
import ued.OrganicWeb.model.CategoryModel;

public class CatergoryMapper implements MapModel<CategoryModel>{
	
	@Override
	public CategoryModel mapRow(ResultSet rs) {
			try {
				CategoryModel category = new CategoryModel();
				category.setId(rs.getInt("id"));
				category.setName(rs.getString("name"));
				int a;
				if((a= rs.getInt("parent_id"))!=0) {
					category.setParent_id(a);
					
				}
				return category;
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				return null;
			}
	}
}
