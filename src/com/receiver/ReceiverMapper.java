package com.receiver;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

public interface ReceiverMapper {

	public Receiver selectExceptId(@Param("map")Map<String, Object> map);

	public Integer insertReceiver(@Param("map")Map<String, Object> map);
	/**
	 * 查询取车人列表
	 * @param userId
	 * @return
	 */

	public List<Receiver> receiverListByUserId(@Param("userId")Integer userId);
	/***
	 * 根据id查询取车人信息
	 * @param receiver
	 * @return
	 */

	public Receiver searchReceiverById(@Param("receiver")Receiver receiver);
	/**
	 * 
	 * @param receiver
	 * @return
	 */
	public int addReceiver(@Param("receiver")Receiver receiver);
	/**
	 * 计算当前用户取车人信息的数目
	 * @param param
	 * @return
	 */
	public Integer countAllReceiverByUserId(@Param("map")Map<String, Object> map);
	/**
	 * 查询当前用户取车人信息列表
	 * @param startRow
	 * @param pageSize
	 * @param param
	 * @return
	 */
	public List<Receiver> backSearchReceiverList(@Param("startRow")int startRow, @Param("pageSize")Integer pageSize, @Param("map")Map<String, Object> map);
	/**
	 * 根据Id删除取车人信息
	 * @param id
	 */
	public void receiverDeleteById(@Param("id")Integer id);
	/**
	 * 根据id更新取车人信息
	 * @param receiver
	 * @return
	 */
	public Integer backUpdateReceiver(@Param("receiver")Receiver receiver);

	public void cancelDefault(@Param("userId")int userId);

	

	

	
}
