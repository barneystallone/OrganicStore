package ued.OrganicWeb.model;

import java.sql.Timestamp;

public class StockCardModel extends AbstractModel {
	private Timestamp ngayGio;
	private int quantity;
	private int giaNhap;
	private int giaBan;
	
	public Timestamp getNgayGio() {
		return ngayGio;
	}
	public void setNgayGio(Timestamp ngayGio) {
		this.ngayGio = ngayGio;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public int getGiaNhap() {
		return giaNhap;
	}
	public void setGiaNhap(int giaNhap) {
		this.giaNhap = giaNhap;
	}
	public int getGiaBan() {
		return giaBan;
	}
	public void setGiaBan(int giaBan) {
		this.giaBan = giaBan;
	}
	
	
}
