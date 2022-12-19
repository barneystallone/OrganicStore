package ued.OrganicWeb.dao.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import ued.OrganicWeb.dao.IProductDAO;
import ued.OrganicWeb.mapper.impl.ProductMapper;
import ued.OrganicWeb.model.ProductModel;

public class ProductDAO extends AbstractDAO<ProductModel> implements IProductDAO {
	
	private static ProductDAO instance = null;
	
	private ProductDAO() {};
	
	public static ProductDAO getInstance() {
		if(instance==null) {
			instance = new ProductDAO();
		}
		return instance;
	}

	@Override
	public List<ProductModel> list(Integer... params) {
		StringBuilder sql = new StringBuilder("Select * from product");
		int len = params.length;
		if(len > 0) {
			int maxLen = Math.min(len, 2);
			String[] a = {" limit ? "," order by id" ," where id >= ?"};
			for(int i = maxLen;i>=0;i--) {
				sql.append(a[i]);
			}
		}
		return query(sql, new ProductMapper(), params);
	}

	@Override
	public int save(ProductModel product) {
		StringBuilder sql = new StringBuilder("insert into product(name, description, image,"
				+ " in_stock, categoryId, price, saleOff, hsd) values (?,?,?,?,?,?,?,?)");
		return insert(
			sql, 
			product.getName(),
			product.getDescription(),
			product.getImage(),
			product.getIn_stock(),
			product.getCategoryId(),
			product.getPrice(),
			product.getSaleOff(),
			product.getHsd()
		);	
	}

	@Override
	public void update(ProductModel product) {
		// TODO Auto-generated method stub
		StringBuilder sql = new StringBuilder("Update product set name = ?, description = ?,"
				+ " in_stock = ?, categoryId = ?, price = ?, saleOff = ?, hsd= ? ");
		List<Object> fields = List.of(
				product.getName(),
				product.getDescription(),
				product.getIn_stock(),
				product.getCategoryId(),
				product.getPrice(),
				product.getSaleOff(),
				product.getHsd()
		);
		fields =  fields.stream().collect(Collectors.toList());
		if(product.getImage()!=null) {
			fields.add(product.getImage());
			sql.append(", image = ? ");
		}
		fields.add(product.getId());
		sql.append("where id = ?");
		super.update(sql,fields.toArray(new Object[0]));	
	}

	@Override
	public void delete(ProductModel product) {
		StringBuilder sql = new StringBuilder("Delete from product where id = ?");
		super.update(sql, product.getId());
		
	}

	@Override
	public ProductModel get(int id) {
		StringBuilder sql = new StringBuilder("select * from product where id = ?");
		return super.get(sql, new ProductMapper(), id);
	}

	@Override
	public int getRowCount() {
		StringBuilder sql = new StringBuilder("select count(id) from product");
		return rowCount(sql);
	}

	@Override
	public List<ProductModel> listDiscountProduct() {
		StringBuilder sql = new StringBuilder("select * from product  where saleOff>0 order by saleOff");
		return query(sql, new ProductMapper());
	}

	@Override
	public List<ProductModel> searchProduct(String query) {
		// TODO Auto-generated method stub
		StringBuilder sql = new StringBuilder("select * from product where name like ?");
		return query(sql, new ProductMapper(), "%".concat(query).concat("%"));
	}
}
