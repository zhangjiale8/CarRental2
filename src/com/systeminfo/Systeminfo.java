package com.systeminfo;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.user.UserStatus;

public class Systeminfo {
	
	/** id */
	private int id;
	/** 用户编号u_id */
	private int u_id;
	/** 标题*/
	private String w_title;
	/** 正文*/
	private String w_body;
	/** 发布时间*/
	@JsonFormat(pattern = "yyyy-MM-dd",timezone="GMT+8")  //取日期时使用  
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date w_publishAt;
	
	/** 信息状态*/
	private String w_status;

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

	public String getW_title() {
		return w_title;
	}

	public void setW_title(String w_title) {
		this.w_title = w_title;
	}

	public String getW_body() {
		return w_body;
	}

	public void setW_body(String w_body) {
		this.w_body = w_body;
	}

	public Date getW_publishAt() {
		return w_publishAt;
	}

	public void setW_publishAt(Date w_publishAt) {
		this.w_publishAt = w_publishAt;
	}

	public String getW_status() {
		return w_status;
	}

	public void setW_status(String w_status) {
		this.w_status = w_status;
	}
	
	
	
	

}
