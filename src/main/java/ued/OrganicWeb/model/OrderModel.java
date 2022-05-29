package ued.OrganicWeb.model;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import ued.OrganicWeb.utils.DateUtil;
@JsonIgnoreProperties({"createDate","purchaseDate"})
public class OrderModel extends AbstractModel{
	private Date createDate;
	private Date purchaseDate;
	private String strCreateDate;
	private String strPurchaseDate;
	private int status;
	private int totalPrice;
	private String shipping_address;
	private int area_id;
	private AreaModel area;
	private String recipient_name;
	private String recipient_phone;
	private String payment_method;
	private int customer_id;
	private CustomerModel customer;
	public OrderModel() {};
	
	
	public OrderModel(Date createDate, int status, int totalPrice, String shipping_address, int area_id,
			String recipient_name, String recipient_phone, int customer_id) {
		super();
		this.createDate = createDate;
		this.status = status;
		this.totalPrice = totalPrice;
		this.shipping_address = shipping_address;
		this.area_id = area_id;
		this.recipient_name = recipient_name;
		this.recipient_phone = recipient_phone;
		this.customer_id = customer_id;
	}
	public String getStrCreateDate() {
		strCreateDate = (createDate!=null) ? DateUtil.format(createDate) : "";
		return strCreateDate;
	}
	public void setStrCreateDate(String strCreateDate) {
		this.strCreateDate = strCreateDate;
	}
	public String getStrPurchaseDate() {
		strPurchaseDate = (purchaseDate!=null) ? DateUtil.format(purchaseDate):"";			
		return strPurchaseDate;
	}
	public void setStrPurchaseDate(String strPurchaseDate) {
		this.strPurchaseDate = strPurchaseDate;
	}
	public Date getCreateDate() {
		if(createDate==null&&strCreateDate!=null) {
			createDate = DateUtil.parse(strCreateDate);			
		}
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public Date getPurchaseDate() {
		if(strPurchaseDate!=null) {
			purchaseDate = DateUtil.parse(strPurchaseDate);			
		}
		return purchaseDate;
	}
	public void setPurchaseDate(Date purchaseDate) {
		this.purchaseDate = purchaseDate;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public int getTotalPrice() {
		return totalPrice;
	}
	public void setTotalPrice(int totalPrice) {
		this.totalPrice = totalPrice;
	}
	public String getShipping_address() {
		return shipping_address;
	}
	public void setShipping_address(String shipping_address) {
		this.shipping_address = shipping_address;
	}
	public AreaModel getArea() {
		return area;
	}
	public void setArea(AreaModel area) {
		this.area = area;
	}
	public String getRecipient_name() {
		return recipient_name;
	}
	public void setRecipient_name(String recipient_name) {
		this.recipient_name = recipient_name;
	}
	public String getRecipient_phone() {
		return recipient_phone;
	}
	public void setRecipient_phone(String recipient_phone) {
		this.recipient_phone = recipient_phone;
	}
	public String getPayment_method() {
		return payment_method;
	}
	public void setPayment_method(String payment_method) {
		this.payment_method = payment_method;
	}
	public int getCustomer_id() {
		return customer_id;
	}
	public void setCustomer_id(int customer_id) {
		this.customer_id = customer_id;
	}
	public CustomerModel getCustomer() {
		return customer;
	}
	public void setCustomer(CustomerModel customer) {
		this.customer = customer;
	}
	public int getArea_id() {
		return area_id;
	}
	public void setArea_id(int area_id) {
		this.area_id = area_id;
	}
	
	
	
}
