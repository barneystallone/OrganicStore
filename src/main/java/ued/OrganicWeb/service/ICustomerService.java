package ued.OrganicWeb.service;

import java.util.List;

import ued.OrganicWeb.model.CustomerModel;

public interface ICustomerService {
	List<CustomerModel> listCustomers(Integer... params);
	int save(CustomerModel customer);
	void update(CustomerModel customer);
	void delete(CustomerModel customer);
	
}
