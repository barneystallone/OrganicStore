package ued.OrganicWeb.dao.impl;

import java.util.List;

import ued.OrganicWeb.dao.IAreaDAO;
import ued.OrganicWeb.mapper.impl.AreaMapper;
import ued.OrganicWeb.model.AreaModel;

public class AreaDAO extends AbstractDAO<AreaModel> implements IAreaDAO{
	
	private static AreaDAO instance = null;
	
	private AreaDAO() {};

	public static AreaDAO getInstance() {
		if(instance == null) {
			instance = new AreaDAO();
		}
		return instance;
	}
	
	@Override
	public AreaModel get(int id) {
		StringBuilder sql = new StringBuilder("Select * from area where id = ?");
		return super.get(sql, new AreaMapper(), id);
	}
	
	@Override
	public List<AreaModel> list(Integer... params) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int save(AreaModel model) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public void update(AreaModel model) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void delete(AreaModel model) {
		// TODO Auto-generated method stub
		
	}

	

	@Override
	public int getRowCount() {
		// TODO Auto-generated method stub
		return 0;
	}

}
