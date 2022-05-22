package ued.OrganicWeb.dao;

import static org.junit.Assert.assertEquals;

import org.junit.BeforeClass;
import org.junit.Test;

import ued.OrganicWeb.dao.impl.OrderDAO;
import ued.OrganicWeb.model.OrderModel;



public class tOrderDAO {
	private static OrderDAO orderDAO;
	private static OrderModel order;
	

	@BeforeClass
	public static void setUp() {
		order = new OrderModel();
		orderDAO = OrderDAO.getInstance();
	}
	
	@Test
	public void testGet() {
		order = orderDAO.get(1);
		assertEquals("22-05-2022", order.getStrCreateDate());
	}
}
