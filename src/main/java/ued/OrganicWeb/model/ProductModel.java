package ued.OrganicWeb.model;

import java.util.Base64;

public class ProductModel extends AbstractModel {
	private String name;
	private String description;
	private byte[] image;
	private int in_stock; 
	private int categoryId;
	private int price;
	private int saleOff;
	private int hsd;
	private String base64Images;
	
	public String getBase64Images() {
		base64Images = Base64.getEncoder().encodeToString(image);
		return base64Images;
	}
	public void setBase64Images(String base64Images) {
		this.base64Images = base64Images;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public byte[] getImage() {
		return image;
	}
	public void setImage(byte[] image) {
		this.image = image;
	}
	public int getIn_stock() {
		return in_stock;
	}
	public void setIn_stock(int in_stock) {
		this.in_stock = in_stock;
	}
	public int getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public int getSaleOff() {
		return saleOff;
	}
	public void setSaleOff(int saleOff) {
		this.saleOff = saleOff;
	}
	public int getHsd() {
		return hsd;
	}
	public void setHsd(int hsd) {
		this.hsd = hsd;
	}
	
	
}
