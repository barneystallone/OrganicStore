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
		customerDAO = new CustomerDAO();
		customer = new CustomerModel();
	}

	@Test
	public void tCustomerDAO() {
		Connection conn = customerDAO.getConnection();

		assertNotNull(conn);
	}

	@Test
	public void testCustomerDAO2() {
		List<CustomerModel> result = customerDAO.listCustomers(3,1);

		customer = result.get(2);
		assertEquals("Nguyễn Văn C", customer.getName());
	}

	@Test
	public void testCustomerDAO3() {
		List<CustomerModel> result = customerDAO.listCustomers();

		customer = result.get(0);
		assertEquals("Nguyễn Văn A", customer.getName());
	}

//		@Test
//		public void testService() {
//			
////			List<CustomerModel> listCustomers = customerService.listCustomers(new Limit());
////			assertNotNull(listCustomers);
//		}
}
