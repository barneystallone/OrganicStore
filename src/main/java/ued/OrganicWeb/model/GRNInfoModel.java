package ued.OrganicWeb.model;

public class GRNInfoModel extends AbstractModel{	
	private int idGRN  ;
	private int quantity;
	private int importPrice;
	private int totalSubPrice ;
	private int idProd;
//	private ProductModel product;
	private String productName;
	private int productPrice;
	
	
	
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public int getProductPrice() {
		return productPrice;
	}
	public void setProductPrice(int giaBan) {
		this.productPrice = giaBan;
	}
//	public ProductModel getProduct() {
//		return product;
//	}
//	public void setProduct(ProductModel product) {
//		this.product = product;
//	}
	public int getIdGRN() {
		return idGRN;
	}
	public void setIdGRN(int idGRN) {
		this.idGRN = idGRN;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public int getIdProd() {
		return idProd;
	}
	public void setIdProd(int idProduct) {
		this.idProd = idProduct;
	}
	public int getImportPrice() {
		return importPrice;
	}
	public void setImportPrice(int priceNhap) {
		this.importPrice = priceNhap;
	}
	public int getTotalSubPrice() {
		return totalSubPrice;
	}
	public void setTotalSubPrice(int totalSubPrice) {
		this.totalSubPrice = totalSubPrice;
	}
	
	
}
