package com.car;
/** * @author  作者 E-mail:
 *  * @date 创建时间：2016年4月18日 下午12:43:22 
 *  * @version 1.0 
 *  * @parameter  
 *  * @since  
 *  * @return  */
public class Carlevel {
	/** 等级编号 */
	private int id;
	/** 等级种类*/
	private String level_kind;
	/** 押金 */
	private float deposit;
	/** 罚款/天 */
	private float fine;
	public float getDeposit() {
		return deposit;
	}
	public void setDeposit(float deposit) {
		this.deposit = deposit;
	}
	public float getFine() {
		return fine;
	}
	public void setFine(float fine) {
		this.fine = fine;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getLevel_kind() {
		return level_kind;
	}
	public void setLevel_kind(String level_kind) {
		this.level_kind = level_kind;
	}
	@Override
	public String toString() {
		return "Carlevel [id=" + id + ", level_kind=" + level_kind + ", deposit=" + deposit + ", fine=" + fine + "]";
	}
	
}
