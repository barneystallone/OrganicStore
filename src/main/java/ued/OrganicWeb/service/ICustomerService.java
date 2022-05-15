package ued.OrganicWeb.service;

import java.util.List;

import ued.OrganicWeb.model.CustomerModel;

public interface ICustomerService extends IGenericService<CustomerModel> {
	List<CustomerModel> listCustomers(Integer... params);
}
