package com.order;
/** * @author  作者 E-mail:
 *  * @date 创建时间：2016年4月19日 下午2:13:16 
 *  * @version 1.0 
 *  * @parameter 
 *   * @since  
 *   * @return  */
public class Ordercheck {
	/** 订单审核状态编号 */
	private int id;
	/**订单审核状态种类*/
	private String order_check_kind;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getOrder_check_kind() {
		return order_check_kind;
	}
	public void setOrder_check_kind(String order_check_kind) {
		this.order_check_kind = order_check_kind;
	}
	@Override
	public String toString() {
		return "Ordercheck [id=" + id + ", order_check_kind=" + order_check_kind + "]";
	}
	
}
