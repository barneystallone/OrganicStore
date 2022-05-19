package ued.OrganicWeb.mapper.impl;

import java.sql.ResultSet;
import java.sql.SQLException;

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
			product.setPrice(rs.getInt("price"));
			product.setHsd(rs.getInt("hsd"));
//			if(rs.getInt("saleOff")!= 0) {
				product.setSaleOff(rs.getInt("saleOff"));
//			}
			return product;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return null;
		
		
	}
	
}
