package ued.OrganicWeb.dao;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertNotNull;

import java.util.List;

import org.junit.BeforeClass;
import org.junit.Test;

import ued.OrganicWeb.dao.impl.CategoryDAO;
import ued.OrganicWeb.model.CategoryModel;

public class testCategoryDAO {
	private static CategoryDAO categoryDAO;
	private static CategoryModel category;
	
//	static => init
	@BeforeClass
	public static void setUp() {
//		categoryDAO = new CategoryDAO();
		category = new CategoryModel();
	}
	
	@Test
	public void testListCategory() {
		List<CategoryModel> list = categoryDAO.listCategories();
		
		assertNotNull(list);
	}
	@Test
	public void testInsertCategory() {
		category.setName("asss");
		int id = categoryDAO.save(category);
		assertNotEquals(0, id);
	}
	@Test
	public void testUpdate() {
		category.setName("????");
		category.setId(24);
		categoryDAO.update(category);
		category= categoryDAO.listCategories(6,1).get(0);
		assertEquals("????", category.getName());
	}
	
	@Test
	public void testGetOne() {
		category = categoryDAO.get(1);
		assertEquals("Rau củ quả", category.getName());

	}
}
