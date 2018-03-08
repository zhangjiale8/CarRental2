package com.order;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;


public class Order {
	
	/** 订单id */
	private int id;
	/** 用户id*/
	private int u_id;
	/** 取车人id*/
	private int r_id;
	/** 车辆id*/
	private int c_id;
	/** 订单开始时间*/
	@JsonFormat(pattern = "yyyy-MM-dd",timezone="GMT+8")  //取日期时使用  
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date startAt;
	/** 订单结束时间*/
	@JsonFormat(pattern = "yyyy-MM-dd",timezone="GMT+8")  //取日期时使用  
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date endAt;
	/** 还车时间*/
	@JsonFormat(pattern = "yyyy-MM-dd ",timezone="GMT+8")  //取日期时使用  
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date backAt;
	/**订单状态*/
	private int orderStatus;
	/**订单审核状态*/
	private int orderCheck;
	/**订单支付状态*/
	private int payStatus;
	/**订单总价*/
	private float total;
	/** 下单时间*/
	@JsonFormat(pattern = "yyyy-MM-dd ",timezone="GMT+8")  //取日期时使用  
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date tackAt;
	
	public Date getTackAt() {
		return tackAt;
	}
	public void setTackAt(Date tackAt) {
		this.tackAt = tackAt;
	}
	public float getTotal() {
		return total;
	}
	public void setTotal(float total) {
		this.total = total;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getU_id() {
		return u_id;
	}
	public void setU_id(int u_id) {
		this.u_id = u_id;
	}
	public int getR_id() {
		return r_id;
	}
	public void setR_id(int r_id) {
		this.r_id = r_id;
	}
	public int getC_id() {
		return c_id;
	}
	public void setC_id(int c_id) {
		this.c_id = c_id;
	}
	public Date getStartAt() {
		return startAt;
	}
	public void setStartAt(Date startAt) {
		this.startAt = startAt;
	}
	public Date getEndAt() {
		return endAt;
	}
	public void setEndAt(Date endAt) {
		this.endAt = endAt;
	}
	public Date getBackAt() {
		return backAt;
	}
	public void setBackAt(Date backAt) {
		this.backAt = backAt;
	}
	public int getOrderStatus() {
		return orderStatus;
	}
	public void setOrderStatus(int orderStatus) {
		this.orderStatus = orderStatus;
	}
	public int getOrderCheck() {
		return orderCheck;
	}
	public void setOrderCheck(int orderCheck) {
		this.orderCheck = orderCheck;
	}
	public int getPayStatus() {
		return payStatus;
	}
	public void setPayStatus(int payStatus) {
		this.payStatus = payStatus;
	}
	@Override
	public String toString() {
		return "Order [id=" + id + ", u_id=" + u_id + ", r_id=" + r_id + ", c_id=" + c_id + ", startAt=" + startAt
				+ ", endAt=" + endAt + ", backAt=" + backAt + ", orderStatus=" + orderStatus + ", orderCheck="
				+ orderCheck + ", payStatus=" + payStatus + ", total=" + total + ", tackAt=" + tackAt + "]";
	}
	
	

}
