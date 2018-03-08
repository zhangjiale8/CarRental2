package com.manager;




public class Manager {
	
	
	public String getM_username() {
		return m_username;
	}
	public void setM_username(String m_username) {
		this.m_username = m_username;
	}
	public String getM_password() {
		return m_password;
	}
	public void setM_password(String m_password) {
		this.m_password = m_password;
	}
	
	public ManagerStatus getM_status() {
		return m_status;
	}
	public void setM_status(ManagerStatus m_status) {
		this.m_status = m_status;
	}
	public String getM_sex() {
		return m_sex;
	}
	public void setM_sex(String m_sex) {
		this.m_sex = m_sex;
	}
	public String getM_fullname() {
		return m_fullname;
	}
	public void setM_fullname(String m_fullname) {
		this.m_fullname = m_fullname;
	}
	public String getM_identity() {
		return m_identity;
	}
	public void setM_identity(String m_identity) {
		this.m_identity = m_identity;
	}
	
	public String getM_phone() {
		return m_phone;
	}
	public void setM_phone(String m_phone) {
		this.m_phone = m_phone;
	}
	public String getM_address() {
		return m_address;
	}
	public void setM_address(String m_address) {
		this.m_address = m_address;
	}
	/** id */
	private int id;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	/** 用户名*/
	private String m_username;
	/** 密码 */
	private String m_password;
	/** 状态 */
	private ManagerStatus m_status;
	/** 性别*/
	private String m_sex;
	/** 真实姓名 */
	private String m_fullname;
	/** 身份证号*/
	private String m_identity;
	/** 邮箱 */
	private String m_email;
	/** 手机号码 */
	private String m_phone;
	/** 家庭住址*/
	private String m_address;
	public String getM_email() {
		return m_email;
	}
	public void setM_email(String m_email) {
		this.m_email = m_email;
	}
	@Override
	public String toString() {
		return "Manager [id=" + id + ", m_username=" + m_username + ", m_password=" + m_password + ", m_status="
				+ m_status + ", m_sex=" + m_sex + ", m_fullname=" + m_fullname + ", m_identity=" + m_identity
				+ ", m_email=" + m_email + ", m_phone=" + m_phone + ", m_address=" + m_address + "]";
	}
	
	
	

	
	

}
