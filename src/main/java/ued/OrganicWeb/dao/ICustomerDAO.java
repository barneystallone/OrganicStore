package ued.OrganicWeb.dao;

import java.util.List;

import ued.OrganicWeb.model.CustomerModel;



public interface ICustomerDAO {

	//=========================================
	// 1 param -> LIMIT, 2 param -> OFFSET, LIMIT 
	List<CustomerModel> listCustomers(Integer... params);
	int save(CustomerModel customer);
	void update(CustomerModel customer);
	void delete(CustomerModel customer);
	CustomerModel get(int id);

}
