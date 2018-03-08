package com.car;
/** * @author  作者 
 * E-mail: * 
 * @date 创建时间：2016年4月18日 下午12:39:33 
 * @version 1.0 * 
 * @parameter 
 * @since 
 * @return  */
public class Carstatus {
	/** 状态编号 */
	private int id;
	/** 状态种类*/
	private String status_kind;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getStatus_kind() {
		return status_kind;
	}
	public void setStatus_kind(String status_kind) {
		this.status_kind = status_kind;
	}
	@Override
	public String toString() {
		return "Carstatus [id=" + id + ", status_kind=" + status_kind + "]";
	}
	
}
