package com.order;
/** * @author  作者 E-mail: 
 * * @date 创建时间：2016年4月19日 下午2:17:05
 *  * @version 1.0 
 *  * @parameter  
 *  * @since  
 *  * @return  */
public class Orderstatus {
	/** 订单状态编号 */
	private int id;
	/**订单状态种类*/
	private String order_status_kind;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getOrder_status_kind() {
		return order_status_kind;
	}
	public void setOrder_status_kind(String order_status_kind) {
		this.order_status_kind = order_status_kind;
	}
	@Override
	public String toString() {
		return "Orderstatus [id=" + id + ", order_status_kind=" + order_status_kind + "]";
	}
	
}
