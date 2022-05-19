package ued.OrganicWeb.dao;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

import java.util.List;

import org.junit.BeforeClass;
import org.junit.Test;

import ued.OrganicWeb.dao.impl.CategoryDAO;
import ued.OrganicWeb.dao.impl.UserDAO;
import ued.OrganicWeb.model.CategoryModel;
import ued.OrganicWeb.model.UserModel;

public class testUserDAO {
	private static UserDAO userDAO;
	private static UserModel user;
	
//	static => init
	@BeforeClass
	public static void setUp() {
		userDAO = UserDAO.getInstance();
		 user = new UserModel();
	}
	
//	@Test
//	public void testListCategory() {
//		List<CategoryModel> list = UserDAO.list();
//		
//		assertNotNull(list);
//	}
//	@Test
//	public void testInsertCategory() {
//		category.setName("asss");
//		int id = UserDAO.save(category);
//		assertNotEquals(0, id);
//	}
//	@Test
//	public void testUpdate() {
//		category.setName("????");
//		category.setId(24);
//		categoryDAO.update(category);
//		category= categoryDAO.list(6,1).get(0);
//		assertEquals("????", category.getName());
//	}
	
//	@Test
//	public void testGetOne() {
//		category = categoryDAO.get(1);
//		assertEquals("Rau củ quả", category.getName());
//
//	}
	
	@Test
	public void  testCheckLogin() {
//		user.setUsername("abc' or '1' = '1");
		user.setUsername("Admin");
		user.setPassword("Admin");
		int id = userDAO.checkLogin(user);
		System.out.println(id);
		assertEquals(0,id);
	}
}
