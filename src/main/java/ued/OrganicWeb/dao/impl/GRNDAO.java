package ued.OrganicWeb.dao.impl;

import java.util.List;

import ued.OrganicWeb.dao.IGrnDAO;
import ued.OrganicWeb.mapper.impl.GRNMapper;
import ued.OrganicWeb.model.GRNModel;

public class GRNDAO extends AbstractDAO<GRNModel> implements IGrnDAO{
	
	private static GRNDAO instance =null;
		
	private GRNDAO() {};
	
	public static GRNDAO getInstance() {
		if(instance==null) {
			instance = new GRNDAO();
		}
		return instance;
	}
	
	@Override
	public List<GRNModel> list(Integer... params) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public GRNModel get(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int getRowCount() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int save(GRNModel model) {
		// TODO Auto-generated method stub
//		null,customerId,default,default,traTruoc,default
		StringBuilder sql = new StringBuilder(
				"insert GRN values (null,?,default,default,?,default)"
			);
		
		return insert(sql,model.getCustomerId(),model.getTraTruoc());
	}

	@Override
	public void update(GRNModel model) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void delete(GRNModel model) {
		// TODO Auto-generated method stub
//		StringBuilder sql = new StringBuilder("call delete_grn_phieuTam(?)");
		StringBuilder sql = new StringBuilder("call huy_grn_phieuTam(?)");
		super.update(sql, model.getId());
	}

	@Override
	public List<GRNModel> listActiveGRN(Integer... params) {
		// TODO Auto-generated method stub
		StringBuilder sql = new StringBuilder(
					"SELECT * FROM GRN where GRNstatus in (\"phiếu tạm\",\"Đã hoàn thành\") order by id desc"
				);
		if(params.length==2) {
			sql.append(" LIMIT ?,?");
			//offset,limit
			return query(sql,new GRNMapper(),params);
		}
		
		return query(sql,new GRNMapper());
	}

	@Override
	public int getTotalItems() {
		StringBuilder sql = new StringBuilder("SELECT COUNT(id) from GRN "
				+ "where GRNstatus in (?,?)");
		
		return rowCount(sql, "phiếu tạm","Đã hoàn thành");
	}

	@Override
	public void saveComplete(GRNModel model) {
		StringBuilder sql = new StringBuilder("update grn set traTruoc = totalPrice "
				+ "where id = ?");
		super.update(sql, model.getId());
	}
	
	
}
