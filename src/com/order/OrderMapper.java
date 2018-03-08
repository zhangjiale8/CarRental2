package com.order;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

public interface OrderMapper {
	/**
	 * 登录验证
	 * @param userId 
	 * 
	 * @param user
	 * @return
	 */
	//查询当前用户所有订单
	public List<Order> searchOrderList(@Param("startRow") int startRow, @Param("pageSize") Integer pageSize, @Param("param") Map<String, Object> param, @Param("userId") Integer userId);
	//public int addOrder(@Param("orderinfo")Order orderinfo);
	//计算当前用户的所有订单数目
	public Integer countOrder(Map<String, Object> param, @Param("userId")Integer userId);
	public void orderDelete(@Param("id")Integer id);
	public Integer countAllOrder(@Param("param")Map<String, Object> param);
	public List<Order> searchAllOrderList(@Param("startRow") int startRow,  @Param("pageSize") Integer pageSize, @Param("param") Map<String, Object> param);
	/**
	 * 新增订单
	 * @param map
	 * @return
	 */
	public int addOrder(@Param("map")Map<String, Object> map);
	/**
	 * 获取新增订单Id
	 * @return
	 */
	public int getOrderId();
	/**
	 * 20160426.14.03
	 * 更新订单支付状态
	 * @param map
	 * @return
	 */
	public Integer updateOrderPayStatus(@Param("map")Map<String, Object> map);
	/**
	 * 2016.4.29.14.31
	 * 计算当前用户的订单数目，订单状态 非6 用户已删除 
	 * @param map
	 * @return
	 */
	public Integer countUserAllOrder(@Param("map")Map<String, Object> map);
	/**
	 * 用户
	 * 查询所有订单
	 * @param startRow
	 * @param pageSize
	 * @param map
	 * @return
	 */
	public List<Map<String, Object>> searchUserAllOrder(@Param("startRow")int startRow, @Param("pageSize")Integer pageSize, @Param("map")Map<String, Object> map);
	/**
	 * 用户删除订单
	 * @param map
	 * @return
	 */
	public Integer updateUserDel(@Param("map")Map<String, Object> map);
	/**
	 * 计算当前用户所有待审核订单数
	 * @param map
	 * @return
	 */
	public Integer countUserCheckingOrder(@Param("map")Map<String, Object> map);
	/**
	 * 当前用户待审核订单列表
	 * @param startRow
	 * @param pageSize
	 * @param map
	 * @return
	 */
	public List<Map<String, Object>> searchUserCheckingOrder(@Param("startRow")int startRow, @Param("pageSize")Integer pageSize, @Param("map")Map<String, Object> map);
	
	/**
	 * 用户取消订单
	 * @param map
	 * @return
	 */
	public Integer userCheckingOrderCal(@Param("map")Map<String, Object> map);
	/***
	 * 插入订单总金额
	 * @param map
	 * @return
	 */
	public Integer insertOrderTotal(@Param("map")Map<String, Object> map);
	/**
	 * 计算未支付的订单数
	 * @param map
	 * @return
	 */
	public Integer countUserPayingOrder(@Param("map")Map<String, Object> map);
	/**
	 * 未支付的订单列表
	 * @param startRow
	 * @param pageSize
	 * @param map
	 * @return
	 */
	public List<Map<String, Object>> searchUserPayingOrder(@Param("startRow")int startRow, @Param("pageSize")Integer pageSize, @Param("map")Map<String, Object> map);
	/**
	 * 20160505.14.11
	 * 根据Id查询订单信息
	 * @param map
	 * @return
	 */
	public Order selectOrderById(@Param("map")Map<String, Object> map);
	
	/**
	 * 计算当前用户所有待完成订单数
	 * @param map
	 * @return
	 */
	public Integer countUserGoingOrder(@Param("map")Map<String, Object> map);
	/**
	 * 当前用户待完成订单列表
	 * @param startRow
	 * @param pageSize
	 * @param map
	 * @return
	 */
	public List<Map<String, Object>> searchUserGoingOrder(@Param("startRow")int startRow, @Param("pageSize")Integer pageSize, @Param("map")Map<String, Object> map);
	/**
	 * 结束订单
	 * @param map
	 * @return
	 */
	public Integer endOrder(@Param("map")Map<String, Object> map);
	/**
	 * 计算所有用户的订单数
	 * @param map
	 * @return
	 */
	public Integer countManagerAllUserOrder(@Param("map")Map<String, Object> map);
	/***
	 * 所有用户订单列表
	 * @param startRow
	 * @param pageSize
	 * @param map
	 * @return
	 */
	public List<Map<String, Object>> searchManagerAllUserOrder(@Param("startRow")int startRow, @Param("pageSize")Integer pageSize, @Param("map")Map<String, Object> map);
	/**
	 * 管理员
	 * 计算待审核订单数
	 * @param map
	 * @return
	 */
	public Integer countManagerAllUserCheckingOrder(@Param("map")Map<String, Object> map);
	/**
	 * 管理员
	 * 查询待审核订单
	 * @param startRow
	 * @param pageSize
	 * @param map
	 * @return
	 */
	public List<Map<String, Object>> searchManagerAllUserCheckingOrder(@Param("startRow")int startRow, @Param("pageSize")Integer pageSize, @Param("map")Map<String, Object> map);
	/**
	 * 管理员
	 * 审核订单
	 * @param map
	 * @return
	 */
	public Integer ManagerAllUserCheckingOrderOn(@Param("map")Map<String, Object> map);
	/**
	 * 用户还车
	 * @param map
	 * @return
	 */
	public Integer userEndOrder(@Param("map")Map<String, Object> map);
	/**
	 * 用户续租
	 * @param map
	 * @return
	 */
	public Integer delayOrder(@Param("map")Map<String, Object> map);
	/***
	 * 计算用户提交还车申请订单数
	 * @param map
	 * @return
	 */
	public Integer countManagerAllUserBackOrder(@Param("map")Map<String, Object> map);
	/**
	 * 用户提交还车申请订单列表
	 * @param startRow
	 * @param pageSize
	 * @param map
	 * @return
	 */
	public List<Map<String, Object>> searchManagerAllUserBackOrder(@Param("startRow")int startRow, @Param("pageSize")Integer pageSize, @Param("map")Map<String, Object> map);
	/**
	 * 计算用户超时订单数，这里的超时订单指的是超时七天以上的
	 * @param map
	 * @return
	 */
	public Integer countManagerAllUserOverTimeOrder(@Param("map")Map<String, Object> map);
	/**
	 * 用户超时订单列表，这里的超时订单指的是超时七天以上的
	 * @param startRow
	 * @param pageSize
	 * @param map
	 * @return
	 */
	public List<Map<String, Object>> searchManagerAllUserOverTimeOrder(@Param("startRow")int startRow, @Param("pageSize")Integer pageSize, @Param("map")Map<String, Object> map);
	
	/***
	 * 查询超时和未支付订单列表
	 * @return
	 */
	public List<Order> selectOrderUpaingAndOvertimeOrder();
	/**
	 * 管理员更新订单
	 * @param map
	 * @return
	 */
	public Integer ManagerUpdateOrder(@Param("map")Map<String, Object> map);
	
	
}
