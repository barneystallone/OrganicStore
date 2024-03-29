package ued.OrganicWeb.mapper.impl;

import java.sql.ResultSet;
import java.sql.SQLException;

import ued.OrganicWeb.dao.impl.CategoryDAO;
import ued.OrganicWeb.mapper.MapModel;
import ued.OrganicWeb.model.ProductModel;

public class ProductMapper implements MapModel<ProductModel>{

	@Override
	public ProductModel mapRow(ResultSet rs) {
		ProductModel product = new ProductModel();
		try {
			product.setId(rs.getInt("id"));
			product.setName(rs.getString("name"));
			product.setDescription(rs.getString("description"));
			product.setImage(rs.getBytes("image"));
			product.setIn_stock(rs.getInt("in_stock"));
			product.setCategoryId(rs.getInt("categoryId"));
			product.setCategory(CategoryDAO.getInstance().get(product.getCategoryId()));
			product.setPrice(rs.getInt("price"));
			product.setHsd(rs.getInt("hsd"));
			product.setSaleOff(rs.getInt("saleOff"));
			return product;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return null;
		
		
	}
	
}
