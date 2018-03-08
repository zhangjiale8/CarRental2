package com.user;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.order.Order;

public interface UserMapper {
	
	/**
	 * 用户登录
	 * @param username
	 * @param password
	 * @return
	 */
	public User loginVerification(String username, String password);
	/**
	 * 用户注册
	 * @param userinfo
	 * @return
	 */
	public int register(User userinfo);
	
	public User searchUserByName(String username);

	public Integer countUser(Map<String, Object> map);

	/**
	 * 更新用户信息
	 * @param user
	 * @return
	 */
	//修改个人信息
	public Integer updateUser(User user);
	/**
	 * 
	 * @param username
	 * @return
	 */
	public Integer delete(@Param("username")String username);
	/**
	 * 个人信息查询
	 * @param startRow
	 * @param pageSize
	 * @param param
	 * @param userId
	 * @return
	 */
	public List<User> searchUserInfo(@Param("startRow")int startRow, @Param("pageSize")Integer pageSize, Map<String, Object> param,  @Param("userId")Integer userId);
	/**
	 * 查询用户列表，manager功能模块
	 * @param startRow
	 * @param pageSize
	 * @param map
	 * @return
	 */
	public List<User> searchUserList(int startRow, Integer pageSize, Map<String, Object> map);
	/**
	 * 20160426
	 * 20160427
	 * @param map
	 * @return
	 */
	public Integer updateAccount(@Param("map")Map<String, Object> map);
	/**
	 * 根据Id查询用户信息，这里要放在session里，调用的地方在orderservice，用户充值时
	 * @param userId
	 * @return
	 */
	public User searchUserById(@Param("userId")Integer userId);
	/**
	 * 修改密码
	 * @param userinfo
	 * @return
	 */
	public int userUpdaePassword(User userinfo);
	/**
	 * 管理员
	 * 获取下单人信息
	 * @param map
	 * @return
	 */
	public User getUserInfoById(@Param("map")Map<String, Object> map);

	
}
