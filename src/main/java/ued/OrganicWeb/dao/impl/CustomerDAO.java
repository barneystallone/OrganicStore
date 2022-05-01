package ued.OrganicWeb.dao.impl;

import java.util.List;

import ued.OrganicWeb.dao.ICustomerDAO;
import ued.OrganicWeb.mapper.impl.CustomerMapper;
import ued.OrganicWeb.model.CustomerModel;


public class CustomerDAO extends AbstractDAO<CustomerModel> implements ICustomerDAO{
	@Override
	public List<CustomerModel> listCustomers(Integer... params) {
		StringBuilder sql = new StringBuilder("select * from ViewCustomers ");

		if (params != null) {
			int maxLen = Math.min(params.length, 2);
			String[] a = { " Limit ? ", " OFFSET ?" };
			for (int i = 0; i < maxLen; i++) {
				sql.append(a[i]);
			}
			return query(sql, new CustomerMapper(), params);
		}
		return query(sql,new CustomerMapper());
	}
}
