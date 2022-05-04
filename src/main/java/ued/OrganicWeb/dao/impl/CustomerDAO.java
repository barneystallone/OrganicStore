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
	public List<CustomerModel> listCustomers(Integer... params) {
		StringBuilder sql = new StringBuilder("select * from ViewCustomers ");
		int len = params.length;
		if (len>0) {
			sql = new StringBuilder("select v.* from  ");
			StringBuilder sql2 = new StringBuilder(" (select id from customer ");
			String sql3 = ") c join ViewCustomers v on v.id = c.id";
			
			int maxLen = Math.min(len, 2);
			String[] arr = { " LIMIT ?"," order by id " ," where id >= ?" }; 
			
			/**	len = 1 -> LIMIT  	: 	len =2 -> OFFSET, LIMIT */
			for (int i = maxLen  ; i >= 0 ; i--) {
				sql2.append(arr[i]);
			}
			sql.append(sql2.toString()).append(sql3);
			return query(sql, new CustomerMapper(), params);
		}
		return query(sql,new CustomerMapper());
	}

	@Override
	public int save(CustomerModel c) {
		StringBuilder sql = new StringBuilder("CALL add_customer"
							+ "(?, ?, ?, ?, ?, ?, ?)");
	return insert( sql, c.getName(),c.getEmail(),c.getPhoneNumber()
			,c.getHouseStreet(),c.getSubDistrict(),c.getDistrict(),c.getCity());
				
	}
	
	@Override
	public void delete(CustomerModel customer) {
		StringBuilder sql = new StringBuilder("DELETE FROM CUSTOMER WHERE ID  = ?");
		super.update(sql,customer.getId());
		
	}
	

	@Override
	public void update(CustomerModel customer) {
		StringBuilder sql = new StringBuilder("Update customer set ");
		StringBuilder sql2 = new StringBuilder(" area_id = (select id from area where "
				+ "subdistrict = ? and district = ? and city = ?) , ");
		String sql3 = " where id = ? ;";
		List<Object> fields = new ArrayList<>();
		fields.add(customer.getName());
		fields.add(customer.getEmail());
		fields.add(customer.getPhoneNumber());
		fields.add(customer.getHouseStreet());

		List<Object> fieldUpdate = new ArrayList<>();
		int len = fields.size();

		for(int i=0;i<len;i++) {
			if (fields.get(i)!=null) {
				sql.append(Constants.CUSTOMER_TITLE[i]).append(" = ? , ");
				fieldUpdate.add(fields.get(i));
			}
		}
		if (customer.getCity()!= null) {
			sql.append(sql2);
			fieldUpdate.add(customer.getSubDistrict());
			fieldUpdate.add(customer.getDistrict());
			fieldUpdate.add(customer.getCity());
		}
		fieldUpdate.add(customer.getId());
		sql.deleteCharAt(sql.length() - 2 ).append(sql3);
		
		super.update(sql, fieldUpdate.toArray(new Object[0]));
	}

	
}
