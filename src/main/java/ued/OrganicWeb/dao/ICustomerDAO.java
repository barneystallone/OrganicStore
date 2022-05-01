package ued.OrganicWeb.dao;

import java.util.List;

import ued.OrganicWeb.model.CustomerModel;



public interface ICustomerDAO {
	List<CustomerModel> listCustomers(Integer... params);
	
}
