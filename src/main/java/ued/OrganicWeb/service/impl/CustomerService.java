package ued.OrganicWeb.service.impl;

import java.util.List;

import ued.OrganicWeb.dao.ICustomerDAO;
import ued.OrganicWeb.dao.impl.CustomerDAO;
import ued.OrganicWeb.model.CustomerModel;
import ued.OrganicWeb.service.ICustomerService;

public class CustomerService implements ICustomerService {

	private ICustomerDAO customerDAO = CustomerDAO.getInstance();

	@Override
	public List<CustomerModel> listCustomers(Integer... params) {
		return customerDAO.listCustomers(params);
	}
	public int save(CustomerModel customer) {
		return customerDAO.save(customer);
	}
	@Override
	public void update(CustomerModel customer) {
		customerDAO.update(customer);
	}
	@Override
	public void delete(CustomerModel customer) {
		customerDAO.delete(customer);
	}
	@Override
	public CustomerModel get(int id) {
		return customerDAO.get(id);
	}
	@Override
	public List<CustomerModel> list(Integer... params) {
		return customerDAO.listCustomers(params);
	}
	
	
}
