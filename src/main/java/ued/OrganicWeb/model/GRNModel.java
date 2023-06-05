package ued.OrganicWeb.model;

import java.sql.Timestamp;
import java.util.List;

public class GRNModel extends AbstractModel{
   
    private int customerId;
    private int traTruoc;
    private int totalPrice;
    private Timestamp ngayGio;
    private String GRNstatus;
	private CustomerModel customer;
	
	private List<GRNInfoModel> listInfoGRN;
	private int totalCountInfoGRN;
	
	
	public Timestamp getNgayGio() {
		return ngayGio;
	}
	public void setNgayGio(Timestamp ngayGio) {
		this.ngayGio = ngayGio;
	}
	public int getTotalCountInfoGRN() {
		return totalCountInfoGRN;
	}
	public void setTotalCountInfoGRN(int totalInfoGRN) {
		this.totalCountInfoGRN = totalInfoGRN;
	}
	public List<GRNInfoModel> getListInfoGRN() {
		return listInfoGRN;
	}
	public void setListInfoGRN(List<GRNInfoModel> listInfoGRN) {
		this.listInfoGRN = listInfoGRN;
	}
	public CustomerModel getCustomer() {
		return customer;
	}
	public void setCustomer(CustomerModel customer) {
		this.customer = customer;
	}
	public int getTotalPrice() {
		return totalPrice;
	}
	public void setTotalPrice(int totalPrice) {
		this.totalPrice = totalPrice;
	}
	public int getCustomerId() {
		return customerId;
	}
	public void setCustomerId(int customerId) {
		this.customerId = customerId;
	}
	public int getTraTruoc() {
		return traTruoc;
	}
	public void setTraTruoc(int debt) {
		this.traTruoc = debt;
	}
	public String getGRNstatus() {
		return GRNstatus;
	}
	public void setGRNstatus(String gRNstatus) {
		GRNstatus = gRNstatus;
	}
    
    
}
