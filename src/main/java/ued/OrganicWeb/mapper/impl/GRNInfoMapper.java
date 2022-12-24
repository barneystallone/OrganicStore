package ued.OrganicWeb.mapper.impl;

import java.sql.ResultSet;
import java.sql.SQLException;

import ued.OrganicWeb.dao.impl.ProductDAO;
import ued.OrganicWeb.mapper.MapModel;
import ued.OrganicWeb.model.GRNInfoModel;
import ued.OrganicWeb.model.ProductModel;

public class GRNInfoMapper implements MapModel<GRNInfoModel> {

	@Override
	public GRNInfoModel mapRow(ResultSet rs) {
		try {
			GRNInfoModel model = new GRNInfoModel();
			model.setId(rs.getInt("id"));
			model.setIdGRN(rs.getInt("idGRN"));
			model.setIdProduct(rs.getInt("idProduct"));
			model.setPriceNhap(rs.getInt("importPrice"));
			model.setQuantity(rs.getInt("quantity"));
			model.setTotalSubPrice(rs.getInt("subTotalPrice"));
			ProductModel productModel = ProductDAO.getInstance().getNameAndPrice(model.getIdProduct());
//			model.setProduct(productModel.getName());
			model.setProductName(productModel.getName());
			model.setProductPrice(productModel.getPrice()*(100-productModel.getSaleOff())/100);
			return model;
		} catch (SQLException e) {
			// TODO: handle exception
			e.printStackTrace();
			return null;
		}
		
	}

}
