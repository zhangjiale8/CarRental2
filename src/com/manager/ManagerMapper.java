package com.manager;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.user.User;

public interface ManagerMapper {
	/**
	 * 登录验证
	 * 
	 * @param user
	 * @return
	 */
	
	

	public Manager loginVerification(String m_username, String m_password);

	public Integer countAllUser(@Param("map")Map<String, Object> map);

	public List<User> searchAllUserList(@Param("startRow")int startRow, @Param("pageSize")Integer pageSize,@Param("map") Map<String, Object> map);
	/**
	 * 查询个人信息，以列表的形式显示
	 * @param startRow
	 * @param pageSize
	 * @param param
	 * @param managerId
	 * @return
	 */
	public List<Manager> searchManagerInfo(@Param("startRow")int startRow, @Param("pageSize")Integer pageSize, Map<String, Object> param,  @Param("managerId")Integer managerId);
	/**
	 * 更新用户信息
	 * @param manager
	 * @return
	 */
	public Integer updateManager(Manager manager);
	/**
	 * 查询个人信息，重新放在session里
	 * @param m_username
	 * @return
	 */
	public Manager searchManagerByName(String m_username);

	

	
}
