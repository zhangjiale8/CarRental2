package com.receiver;



public class Receiver {
	
	/** 取车人id */
	private int id;
	/** 用户id */
	private int u_id;
	/** 取车人姓名*/
	private String receiveName;
	/** 取车人身份证号码 */
	private String receiveIdentity;
	/** 取车人手机号码*/
	private String receivePhone;
	/** 取车地址 */
	private String receiveAddress;
	/** 还车地址 */
	private String backAddress;
	/** 是否默认 */
	private Boolean isDefault;;
	
	
	public Boolean getIsDefault() {
		return isDefault;
	}
	public void setIsDefault(Boolean isDefault) {
		this.isDefault = isDefault;
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
	public String getReceiveName() {
		return receiveName;
	}
	public void setReceiveName(String receiveName) {
		this.receiveName = receiveName;
	}
	public String getReceiveIdentity() {
		return receiveIdentity;
	}
	public void setReceiveIdentity(String receiveIdentity) {
		this.receiveIdentity = receiveIdentity;
	}
	public String getReceivePhone() {
		return receivePhone;
	}
	public void setReceivePhone(String receivePhone) {
		this.receivePhone = receivePhone;
	}
	public String getReceiveAddress() {
		return receiveAddress;
	}
	public void setReceiveAddress(String receiveAddress) {
		this.receiveAddress = receiveAddress;
	}
	public String getBackAddress() {
		return backAddress;
	}
	public void setBackAddress(String backAddress) {
		this.backAddress = backAddress;
	}
	@Override
	public String toString() {
		return "Receiver [id=" + id + ", u_id=" + u_id + ", receiveName=" + receiveName + ", receiveIdentity="
				+ receiveIdentity + ", receivePhone=" + receivePhone + ", receiveAddress=" + receiveAddress
				+ ", backAddress=" + backAddress + ", isDefault=" + isDefault + "]";
	}
	
	
	
	
	

	
	

}
