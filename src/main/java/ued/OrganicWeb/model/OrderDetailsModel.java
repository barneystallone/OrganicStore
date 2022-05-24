package ued.OrganicWeb.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

//@JsonIgnoreProperties(ignoreUnknown = true)
public class OrderDetailsModel {
	private int quantity;
	private int subTotalPrice;
	private int Order_id;
	private int product_id;
	
	public OrderDetailsModel() {}
	
	
	public OrderDetailsModel(int product_id,int quantity) {
		this.quantity = quantity;
		this.product_id = product_id;
	}



	public OrderDetailsModel(int quantity, int subTotalPrice, int order_id, int product_id) {
		this.quantity = quantity;
		this.subTotalPrice = subTotalPrice;
		Order_id = order_id;
		this.product_id = product_id;
	}



	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public int getSubTotalPrice() {
		return subTotalPrice;
	}
	public void setSubTotalPrice(int subTotalPrice) {
		this.subTotalPrice = subTotalPrice;
	}
	public int getOrder_id() {
		return Order_id;
	}
	public void setOrder_id(int order_id) {
		Order_id = order_id;
	}
	public int getProduct_id() {
		return product_id;
	}
	public void setProduct_id(int product_id) {
		this.product_id = product_id;
	}
	
	
}
