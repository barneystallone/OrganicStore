package ued.OrganicWeb.dao;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import org.junit.BeforeClass;
import org.junit.Test;

import ued.OrganicWeb.dao.impl.ProductDAO;
import ued.OrganicWeb.model.ProductModel;

public class testProductDAO {
	private static ProductDAO productDAO;
	private static ProductModel product;
	
//	static => init
	@BeforeClass
	public static void setUp() {
		productDAO = ProductDAO.getInstance();
		product = new ProductModel();
	}
	
//	@Test
//	public void testListProducts() {
//		List<ProductModel> list = productDAO.list();
//		String path ="F:\\OneDrive - Danang University of Education\\Downloads\\images\\a.jpg";
//		String imagePath ="F:\\OneDrive - Danang University of Education\\Downloads\\images\\broccoli.jpg";
//		try {
//			
//			Files.write(Paths.get(path), list.get(0).getImage());
//			assertNotNull(list.get(0).getImage());
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		assertNotNull(list);
//	}
	@Test
	public void testListTonKho() {
		List<ProductModel> list = productDAO.listTonKho();
		
		
	
		assertNotNull(list.get(0));
	}
//	@Test
//	public void testInsert() {
//		String imagePath ="F:\\OneDrive - Danang University of Education\\Downloads\\images\\broccoli.jpg";
//		byte[] imageBytes;
//		int id=0;
//		try {
//			imageBytes = Files.readAllBytes(Paths.get(imagePath));
//			product.setImage(imageBytes);
//			product.setName("na");
//			product.setDescription("description");
//			product.setIn_stock(3);
//			product.setCategoryId(3);
//			product.setPrice(3);
//			product.setHsd(3);
//			product.setSaleOff(3);
//			id = productDAO.save(product);
//			product = productDAO.get(id);
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
// 	
//		assertEquals(product.getName(), "na");
//	}
//	@Test
//	public void testUpdate() {
//		product.setName("????");
//		product.setId(24);
//
//		assertEquals("????", product.getName());
//	}
//	
//	@Test
//	public void testGetOne() {
//		product = productDAO.get(1);
//		assertEquals("Rau củ quả", product.getName());
//
//	}
}
