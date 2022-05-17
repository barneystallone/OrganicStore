package ued.OrganicWeb.dao.impl;

import java.util.ArrayList;
import java.util.List;

import ued.OrganicWeb.dao.ICustomerDAO;
import ued.OrganicWeb.mapper.impl.CustomerMapper;
import ued.OrganicWeb.model.CustomerModel;
import ued.OrganicWeb.utils.Constants;


public class CustomerDAO extends AbstractDAO<CustomerModel> implements ICustomerDAO{
	
	private static CustomerDAO instance = null;
	
	
	private CustomerDAO() {}
	
	public static CustomerDAO getInstance () {
		if (instance==null) {
			instance = new CustomerDAO();
		}
		return instance;
	}
	
	
	@Override
	public List<CustomerModel> list(Integer... params) {
		StringBuilder sql = new StringBuilder("Select c.*,a.city,a.district,a.subdistrict");
		sql.append(" from Customer as c join area as a on c.area_id = a.id");
		int len = params.length;
		if (len>0) {
			int maxLen = Math.min(len, 2);
			String[] arr = { " LIMIT ?"," order by c.id " ," where c.id >= ?" }; 
			
			/**	len = 1 -> LIMIT  	: 	len =2 -> OFFSET, LIMIT */
			for (int i = maxLen  ; i >= 0 ; i--) {
				sql.append(arr[i]);
			}
			return query(sql, new CustomerMapper(), params);
		}
		
		return query(sql,new CustomerMapper());
	
	}
	
	@Override
	public int save(CustomerModel c) {
		StringBuilder sql = new StringBuilder("insert into customer(");
		String sql2 = ") values (?,?,?,?,?)";
		int len = Constants.CUSTOMER_TITLE.length;
		for(int i=0;i<len-1;i++) {
			sql.append(Constants.CUSTOMER_TITLE[i]).append(",");
		}
		sql.deleteCharAt(sql.length()-1).append(sql2);

		return insert( sql, c.getName(),c.getEmail(),c.getPhoneNumber()
				,c.getHouseStreet(),c.getAreaId());
					
	}
	
	@Override
	public void delete(CustomerModel customer) {
		StringBuilder sql = new StringBuilder("DELETE FROM CUSTOMER WHERE ID  = ?");
		super.update(sql,customer.getId());	
	}
	
	public void update(CustomerModel customer) {
		StringBuilder sql = new StringBuilder("Update customer set ");
		int len  = Constants.CUSTOMER_TITLE.length;
		for(int i=0;i<len-1;i++) {	
			sql.append(Constants.CUSTOMER_TITLE[i]).append(" = ? , ");
		}
		sql.deleteCharAt(sql.length() - 2 ).append(" where id = ?");
		List<Object> fields = new ArrayList<>();
		fields.add(customer.getName());
		fields.add(customer.getEmail());
		fields.add(customer.getPhoneNumber());
		fields.add(customer.getHouseStreet());
		fields.add(customer.getAreaId());
		fields.add(customer.getId());
		
		super.update(sql, fields.toArray(new Object[0]));
	
	}


	@Override
	public CustomerModel get(int id) {
		StringBuilder sql = new StringBuilder("Select c.*,a.city,a.district,a.subdistrict ");
		sql.append("from Customer as c join area as a on c.area_id = a.id") ;
		sql.append(" where c.id = ?"); 
		
		return super.get(sql, new CustomerMapper(), id);
		
	}

	@Override
	public int getRowCount() {
		// TODO Auto-generated method stub
		return 0;
	}

	
}
