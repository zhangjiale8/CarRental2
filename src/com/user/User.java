package com.user;

import java.util.Date;

import com.user.UserStatus;

public class User {
	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", password=" + password + ", status=" + status + ", sex="
				+ sex + ", fullname=" + fullname + ", identity=" + identity + ", email=" + email + ", phone=" + phone
				+ ", address=" + address + ", account=" + account + "]";
	}
	/** id */
	private int id;
	/** 用户名*/
	private String username;
	/** 密码 */
	private String password;
	/** 状态 */
	private UserStatus status;
	/** 性别*/
	private String sex;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public UserStatus getStatus() {
		return status;
	}
	public void setStatus(UserStatus status) {
		this.status = status;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public String getFullname() {
		return fullname;
	}
	public void setFullname(String fullname) {
		this.fullname = fullname;
	}
	public String getIdentity() {
		return identity;
	}
	public void setIdentity(String identity) {
		this.identity = identity;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	/** 真实姓名 */
	private String fullname;
	/** 身份证号*/
	private String identity;
	/** 邮箱 */
	private String email;
	/** 手机号码 */
	private String phone;
	public float getAccount() {
		return account;
	}
	public void setAccount(float account) {
		this.account = account;
	}
	/** 家庭住址*/
	private String address;
	private float account;
	
	

	
	

}
