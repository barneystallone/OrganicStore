package ued.OrganicWeb.dao;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;


import java.sql.Connection;
import java.util.List;

import org.junit.BeforeClass;
import org.junit.Test;

import ued.OrganicWeb.dao.impl.CustomerDAO;
import ued.OrganicWeb.model.CustomerModel;
/**
 * @author HP
 *
 */

public class testCustomerDAO {

	private static CustomerDAO customerDAO;
	private static CustomerModel customer;

	@BeforeClass
	public static void setUpClass() {
		customerDAO = CustomerDAO.getInstance();
		customer = new CustomerModel();
	}

	@Test
	public void testGetConnection() {
		Connection conn = customerDAO.getConnection();

		assertNotNull(conn);
	}

	@Test
	public void testListAllCustomers() {
		List<CustomerModel> result = customerDAO.listCustomers();
		
		customer = result.get(1);
		assertEquals("Nguyễn Văn B", customer.getName());
	}
	@Test
	public void testListCustomers() {
		List<CustomerModel> result = customerDAO.listCustomers(3,1);

		customer = result.get(2);
		assertEquals("Nguyễn Văn C", customer.getName());
	}

	@Test
	public void testUpdate1() {
		CustomerModel customer = new CustomerModel();
		customer.setId(2);
		customer.setName("Nguyễn Văn B4");

		customerDAO.update(customer);
		List<CustomerModel> result = customerDAO.listCustomers(2,1);
		customer = result.get(0);
		assertEquals("Nguyễn Văn B4", customer.getName());
	}
	@Test
	public void testUpdate2() {
		CustomerModel customer = new CustomerModel();
		customer.setId(2);
		customer.setName("Nguyễn Văn B4");
		customer.setSubDistrict("Phường Hòa Thuận Tây");
		customer.setDistrict("Quận Hải Châu");
		customer.setCity("Thành Phố Đà Nẵng");
		
		customerDAO.update(customer);
		List<CustomerModel> result = customerDAO.listCustomers(2,1);
		customer = result.get(0);
		assertEquals("Phường Hòa Thuận Tây", customer.getSubDistrict());
	}
	

}
