package com.user;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.order.Order;




@Service
public class UserService {

	@Autowired
	UserMapper userMapper;

	/**
	 * 登录
	 * 
	 * @param user
	 * @throws Exception
	 * @return
	 */
	public User login(String username,String password) throws UserException, Exception {
		User result = null;
		System.out.println("UserService注册");
		/*String sha1pwd = DigestUtils.sha1Hex(password);*/
		System.out.println(username+"传过来的参数"+password);

		result = userMapper.loginVerification(username, password);

		System.out.println(result+"结果 ");
		if(result == null){
			throw new UserException("用户名或密码错误");
		}
		
		return result;
	}
	/**
	 * 用户注册（客户权限）
	 * @param userinfo
	 * @return
	 * @throws UserException
	 */
	public int register(User userinfo) throws UserException {
		// TODO Auto-generated method stub
		int result=0;
		System.out.println("UserService注册");
		result = userMapper.register(userinfo);
		System.out.println("UserService注册结果"+result);
		if(result==0){
			throw new UserException("该用户已注册");
		}
		
		return result;
	}
	/**
	 * 根据用户名查询用户信息
	 * @param username
	 * @return
	 */
	public User searchUserByName(String username) {
		System.out.println("UserService根据用户名查询"+username);
		User user = userMapper.searchUserByName(username);
		return user  ;
	}
	/**
	 * 查询用户列表（管理员权限）
	 * @param map
	 * @return
	 */
	public Map<String, Object> searchUserList(Map<String, Object> map) {
		// TODO Auto-generated method stub
		Integer pageNumber = Integer.valueOf((String) map.get("page"));
		Integer pageSize = Integer.valueOf((String) map.get("rows"));
		Map<String, Object> result = null;
		int startRow = 0; // 开始记录数
		Integer total = null; // 总记录数
		List<User> rows = null; // 分页记录

		startRow = (pageNumber - 1) * pageSize; // 计算从第几条开始

		total = userMapper.countUser(map);

		rows = userMapper.searchUserList(startRow, pageSize, map);

		result = new HashMap<String, Object>();
		result.put("total", total);
		result.put("rows", rows);

		return result;
	}
	/**
	 * 更新用户信息
	 * @param user
	 * @return
	 * @throws UserException
	 */
	//更新用户资料
	public int updateUser(User user) throws UserException {
		Integer result = userMapper.updateUser(user);
		if(result == 0) {
			throw new UserException("更新用户資料失敗");
		}
		return result;
	}
	/**
	 * 删除用户信息（管理员权限）
	 * @param username
	 * @return
	 * @throws UserException
	 */
	//删除用户信息
	public int removeUser(String username) throws UserException {
	// TODO Auto-generated method stub
		Integer result = userMapper.delete(username);
		if(result == 0) {
			throw new UserException("删除用户資料失敗");
		}
		return result;
		
	}
	/**
	 * 查询个人信息，以列表的形式显示
	 * @param param
	 * @param userId
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> searchUserInfo(Map<String, Object> param, Integer userId)throws Exception {
		// TODO Auto-generated method stub
		System.out.println("searchUser"+userId);
		Integer pageNumber = Integer.valueOf((String) param.get("page"));
		Integer pageSize = Integer.valueOf((String) param.get("rows"));
		Map<String, Object> result = null;
		int startRow = 0; // 开始记录数
		Integer total = 0; // 总记录数
		List<User> rows = null; // 分页记录

		startRow = (pageNumber - 1) * pageSize; // 计算从第几条开始
		System.out.println("total"+total);
		total = 1;
		System.out.println("5"+total);

		rows = userMapper.searchUserInfo(startRow, pageSize, param,userId);

		result = new HashMap<String, Object>();
		result.put("total", total);
		result.put("rows", rows);

		return result;
	}
	/**
	 * 根据用户Id查询客户资料
	 * @param userId
	 * @return
	 * @throws UserException
	 */
	public User searchUserById(Integer userId) throws UserException {
		// TODO Auto-generated method stub
		User user = userMapper.searchUserById(userId);
		if(user==null){
			throw new UserException("不存在这个用户资料！");
		}
		return user;
	}
	/**
	 * 20160427.16.14
	 * @param map
	 * @return
	 * @throws UserException 
	 */
	public int updateUserAccount(Map<String, Object> map) throws UserException {
		// TODO Auto-generated method stub
		System.out.println("updateUserAccount+service"+map);
		Integer updateAccountResult = userMapper.updateAccount(map);
		if(updateAccountResult==0){
			throw new UserException("更新用户账户余额失败！");
		}
		return updateAccountResult;
	}
	/**
	 * 修改密码
	 * @param userinfo
	 * @return
	 * @throws UserException 
	 */
	public int userUpdaePassword(User userinfo) throws UserException {
		// TODO Auto-generated method stub
		// TODO Auto-generated method stub
				int result=0;
				System.out.println("UserService修改密码");
				result = userMapper.userUpdaePassword(userinfo);
				System.out.println("UserService修改密码结果"+result);
				if(result==0){
					throw new UserException("修改密码失败，请检查信息填写是否准确！！");
				}
				
				return result;
	}
	public User getUserInfoById(Map<String, Object> map) {
		// TODO Auto-generated method stub
		
				System.out.println("service"+map);
				User result = userMapper.getUserInfoById(map);	
				if (result == null) {
					throw new IllegalArgumentException("获取下单人信息失败！");
				}
				System.out.println(result.toString());
				return result;
	}
	
	

	

	


}
