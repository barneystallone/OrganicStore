package ued.OrganicWeb.model;

public class ShipCODModel extends AbstractModel {
	private int min_price;
	private int max_distance_for_min_price;
	private int price_per_kilo;
	private int weight_kg;
	
	public int getMin_price() {
		return min_price;
	}
	public void setMin_price(int min_price) {
		this.min_price = min_price;
	}
	public int getMax_distance_for_min_price() {
		return max_distance_for_min_price;
	}
	public void setMax_distance_for_min_price(int max_distance_for_min_price) {
		this.max_distance_for_min_price = max_distance_for_min_price;
	}
	public int getPrice_per_kilo() {
		return price_per_kilo;
	}
	public void setPrice_per_kilo(int price_per_kilo) {
		this.price_per_kilo = price_per_kilo;
	}
	public int getWeight_kg() {
		return weight_kg;
	}
	public void setWeight_kg(int weight_kg) {
		this.weight_kg = weight_kg;
	}
	
	
}
