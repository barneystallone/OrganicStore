package ued.OrganicWeb.dao.impl;

import java.util.List;

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
	public List<ProductModel> listProducts(Integer... params) {
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
		StringBuilder sql = new StringBuilder("Update product set name = ?, description = ?, image = ?,"
				+ " in_stock = ?, categoryId = ?, price = ?, saleOff = ?, hsd = ? where id = ?");
		super.update(
				sql, 
				product.getName(),
				product.getDescription(),
				product.getImage(),
				product.getIn_stock(),
				product.getCategoryId(),
				product.getPrice(),
				product.getSaleOff(),
				product.getHsd(),
				product.getId()
			);	
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
	
}