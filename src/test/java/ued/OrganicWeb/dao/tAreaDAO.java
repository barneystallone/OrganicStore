package ued.OrganicWeb.dao;

import static org.junit.Assert.assertEquals;

import org.junit.BeforeClass;
import org.junit.Test;

import ued.OrganicWeb.dao.impl.AreaDAO;
import ued.OrganicWeb.model.AreaModel;



public class tAreaDAO {
	private static AreaDAO areaDAO;
	private static AreaModel area;
	

	@BeforeClass
	public static void setUp() {
		area = new AreaModel();
		areaDAO = AreaDAO.getInstance();
	}
	
	@Test
	public void testGet() {
		area = areaDAO.get(2);
		
		assertEquals("Phường Thuận Phước", area.getSubDistrict());
	}
}
