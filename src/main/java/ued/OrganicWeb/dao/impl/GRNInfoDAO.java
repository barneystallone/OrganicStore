package ued.OrganicWeb.dao.impl;

import java.util.ArrayList;
import java.util.List;

import ued.OrganicWeb.dao.IGRNInfoDAO;
import ued.OrganicWeb.mapper.impl.GRNInfoMapper;
import ued.OrganicWeb.model.GRNInfoModel;

public class GRNInfoDAO extends AbstractDAO<GRNInfoModel> implements IGRNInfoDAO{
	private static GRNInfoDAO instance =null;
	
	private GRNInfoDAO() {};
	
	public static GRNInfoDAO getInstance() {
		if(instance==null) {
			instance = new GRNInfoDAO();
		}
		return instance;
	}
	
	@Override
	public int save(GRNInfoModel model) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public void update(GRNInfoModel model) {
		// TODO Auto-generated method stub
		
	}
	
	

	@Override
	public void delete(GRNInfoModel model) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<GRNInfoModel> listBy_idGRN(int id){
		StringBuilder sql = new StringBuilder("SELECT * from GRNinfo where idGRN = ? ");
		return query(sql, new GRNInfoMapper(), id);
	}

	@Override
	public int saveMulti(List<GRNInfoModel> listModel) {
		StringBuilder sql = new StringBuilder("Insert into GRNinfo values");
		List<Object> itemFields = new ArrayList<>();
//		(null,idGRN,idProd,quantity,importPrice,default)
		for (GRNInfoModel model : listModel) {
			sql.append("(null,?,?,?,?,default), ");
//			itemFields.add(null);
			itemFields.add(model.getIdGRN());
			itemFields.add(model.getIdProd());
			itemFields.add(model.getQuantity());
			itemFields.add(model.getImportPrice());
//			itemFields.add("default");
		}
		sql.deleteCharAt(sql.length()-2);
		return insert(sql , itemFields.toArray(new Object[0]));
	}

	

}
