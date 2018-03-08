package com.car;



public class Car {
	
	/** 汽车id */
	private int id;
	/** 车牌号码*/
	private String license;
	/** 车辆颜色  */
	private String color;
	/** 车辆品牌*/
	private String brand;	
	/** 车辆类型 */
	private String c_type;
	/** 车辆排量*/
	private String displacement;
	/** 车辆等级*/
	private int c_level;
	/** 车辆状态*/
	private int c_status;
	/** 车辆描述*/
	private String c_describe;
	/** 出租价格*/
	private float price;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getLicense() {
		return license;
	}
	public void setLicense(String license) {
		this.license = license;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public String getBrand() {
		return brand;
	}
	public void setBrand(String brand) {
		this.brand = brand;
	}
	public String getC_type() {
		return c_type;
	}
	public void setC_type(String c_type) {
		this.c_type = c_type;
	}
	public String getDisplacement() {
		return displacement;
	}
	public void setDisplacement(String displacement) {
		this.displacement = displacement;
	}
	public int getC_level() {
		return c_level;
	}
	public void setC_level(int c_level) {
		this.c_level = c_level;
	}
	public int getC_status() {
		return c_status;
	}
	public void setC_status(int c_status) {
		this.c_status = c_status;
	}
	public String getC_describe() {
		return c_describe;
	}
	public void setC_describe(String c_describe) {
		this.c_describe = c_describe;
	}
	public float getPrice() {
		return price;
	}
	public void setPrice(float price) {
		this.price = price;
	}

	@Override
	public String toString() {
		return "Car [id=" + id + ", license=" + license + ", color=" + color + ", brand=" + brand + ", c_type=" + c_type
				+ ", displacement=" + displacement + ", c_level=" + c_level + ", c_status=" + c_status + ", c_describe="
				+ c_describe + ", price=" + price + "]";
	}
	

	
	

}
