package com.systemnews;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.user.UserStatus;

public class Systemnews {
	
	/** id */
	private int id;
	/** 管理员编号m_id */
	private int m_id;
	/** 标题*/
	private String title;
	/** 正文*/
	private String body;
	/** 发布时间*/
	@JsonFormat(pattern = "yyyy-MM-dd",timezone="GMT+8")  //取日期时使用  
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date publishAt;
	
	public Date getPublishAt() {
		return publishAt;
	}


	public void setPublishAt(Date publishAt) {
		this.publishAt = publishAt;
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public int getM_id() {
		return m_id;
	}


	public void setM_id(int m_id) {
		this.m_id = m_id;
	}


	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	}


	public String getBody() {
		return body;
	}


	public void setBody(String body) {
		this.body = body;
	}


	@Override
	public String toString() {
		return "Systemnews [id=" + id + ", m_id=" + m_id + ", title=" + title + ", body=" + body + ", publishAt="
				+ publishAt + "]";
	}
	
	

	
	

}
