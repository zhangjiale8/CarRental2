package com.order;
/** * @author  作者 E-mail: 
 *  * @date 创建时间：2016年4月19日 下午2:35:15 
 *  * @version 1.0 
 *  * @parameter  
 *  * @since  
 *  * @return  */
public class Paystatus {
	/** 订单支付状态编号 */
	private int id;
	/**订单支付状态种类*/
	private String pay_status_kind;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getPay_status_kind() {
		return pay_status_kind;
	}
	public void setPay_status_kind(String pay_status_kind) {
		this.pay_status_kind = pay_status_kind;
	}
	@Override
	public String toString() {
		return "Paystatus [id=" + id + ", pay_status_kind=" + pay_status_kind + "]";
	}
	
}
