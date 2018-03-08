package com.user;

import java.util.Map;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.base.Controller_;

@Controller
public class UserController extends Controller_ {

	@Autowired
	UserService userService;
	/**
	 * 登录
	 * */
	@ResponseBody
	@RequestMapping(value = "/login.ctrl", produces = "application/json")
	public Map<String, Object> login(@RequestParam("username") String username, @RequestParam("password") String password, HttpSession httpSession) {
		System.out.println(username+"++++"+password);
		System.out.println("login.ctrl");
		String error = null;
		Object object = null;
		try {
			User loginUser = userService.login(username, password);
			httpSession.setAttribute("user", loginUser);
			httpSession.setAttribute("userId", loginUser.getId());
			object = "ok";
		}
		catch (UserException u) {
			log.controller().error("UserController.login({},{})", username, password, u);
			error = u.getMessage();
		}
		catch (Exception e) {
			log.controller().error("UserController.login({},{})", username, password, e);
			error = e.getMessage();
		}
		return result(error, object);
	}
	
	/**
	 * 注册
	 * @param session
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/register.ctrl", produces = "application/json")
	public Map<String, Object> register(User userinfo, HttpSession httpSession) {
		
		System.out.println("register.ctrl");
		String error = null;
		Object object = null;
		int result=0;
		try {
			User user = userService.searchUserByName(userinfo.getUsername());
			if(user==null){
				result = userService.register(userinfo);
				System.out.println("Controller注册返回结果"+result);
			}else{
				result=0;
				throw new UserException("该用户已注册");
			}
		}catch (UserException u) {
			log.controller().error("UserController.register({},{})", u);
			error = u.getMessage();
		}
		catch (Exception e) {
			log.controller().error("UserController.register({},{})", e);
			error = e.getMessage();
		}
		object=result;
		System.out.println("返回结果为1是注册成功此时返回结果："+result);
		return result(error, object);
	}

	/**
	 * 登出
	 * @param session
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/logout.ctrl", produces = "application/json")
	public Map<String, Object> logout(HttpSession session) {
		log.controller().info("UserController.logout({})", session);
		String error = null;
		String object = null;
		try {
			session.invalidate();
			object = "ok";
		}
		catch (Exception e) {
			log.controller().error("UserController.logout({},{})", session, e);
			error = e.getMessage();
		}
		return result(error, object);
	}

	/**
	 * 获取当前登录用户信息
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/getLoginUserInfo.ctrl", produces = "application/json")
	public Map<String, Object> getLoginUserName(HttpServletRequest request) {
		String error = null;
		Object object = null;
		User user = (User) request.getSession().getAttribute("user");		
		if (user == null) {
			error = "用户不存在";
		}
		else {
			object = user;
		}
		System.out.println(user.toString());
		return result(error, object);
	}
	
	
	/**
	 * 根据用户名查用户信息
	 * 
	 */
	@ResponseBody
	@RequestMapping(value = "/searchUserByUserName.ctrl", produces = "application/json")
	public Map<String, Object> searchUserByName(@RequestParam("username") String username) {
		System.out.println("searchUserByUserName.ctrl");
		String error = null;
		Object object = null;
		User user = userService.searchUserByName(username); 
		if (user == null) {
			error = "此用户不存在";
		}
		else {
			object = user;
		}
		return result(error, object);
		
	}
	/**
	 * 更新用户信息
	 * 
	 */
		/**
		 * 更新用户信息，然后刷新session
		 * @param session
		 * @param user
		 * @return
		 */
		//更新用户信息
		@ResponseBody
		@RequestMapping(value = "/userInfo/updateUser.ctrl", method = RequestMethod.POST,produces = "application/json")
		public Map<String, Object> updateUser(HttpSession session,User user) {
		String error = null;
		Object object = null;
		int result =0;
		try {
			object = userService.updateUser(user);
			User newuser = userService.searchUserByName(user.getUsername());
			session.setAttribute("user", newuser);
			
			
		}catch (UserException u) {
			log.controller().error("UserController.updateUser({},{})", u);
			error = u.getMessage();
		}
		catch (Exception e) {
			log.controller().error("UserController.updateUser({},{})", e);
			error = e.getMessage();
		}
		object=result;
		System.out.println("返回结果为1是注册成功此时返回结果："+result);
		return result(error, object);
		
	}

	/**
	 * 根据用户姓名删除用户信息
	 * 
	 */
	@ResponseBody
	@RequestMapping(value = "/removeUser.ctrl", produces = "application/json")
	public Map<String, Object> removeUser( Map<String, String> map) {
		String error = null;
		Object object = null;
		int result =0;
		try {
			result = userService.removeUser(map.get("username"));
			
			
		}catch (UserException u) {
			log.controller().error("UserController.removeUser({},{})", u);
			error = u.getMessage();
		}
		catch (Exception e) {
			log.controller().error("UserController.removeUser({},{})", e);
			error = e.getMessage();
		}
		object=result;
		System.out.println("返回结果为1是删除成功此时返回结果："+result);
		return result(error, object);
		
	}
	/**
	 * 当前用户信息列表
	 * @param page：当前页页号
	 * @param rows：每页显示的记录数
	 * @param map：记录页面传到后台的数据
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/searchUser.ctrl")
	public Map<String, Object> searchUserInfo(@RequestParam Map<String, Object> param,HttpServletRequest request) {
		System.out.println(param);
		System.out.println("55555进入controller");
		log.controller().info("OrderController.searchUser({},{})", param);
		String error = null;
		Object object = null;

		try {
			Integer userId=(Integer)request.getSession().getAttribute("userId");
			object = userService.searchUserInfo(param,userId);
		}
		catch (Exception e) {
			log.controller().error("OrderController.searchUser({},{}) failed: {}", param, e);
			error = e.getMessage();
		}

		return result(error, object);

	}
	
	/**
	 * 更新用户余额，更新后要根据Id再次查询user放在session里
	 * 20160427.16
	 * @param request
	 * @param session
	 * @param map
	 * @return
	 */
	//更新用户信息
		@ResponseBody
		@RequestMapping(value = "/user/updateUserAccount.ctrl", produces = "application/json")
		public Map<String, Object> updateUserAccount(HttpServletRequest request,HttpSession session,@RequestBody Map<String, Object> map) {
			
			System.out.println(map);	
			String error = null;
			Object object = null;
			int result =0;
			try {
				Integer userId=(Integer)request.getSession().getAttribute("userId");
				map.put("userId", userId);
				result = userService.updateUserAccount(map);
				System.out.println("返回结果不为0是添加成功  此时返回结果："+result);
				User user = userService.searchUserById(userId);
				session.setAttribute("user", user);			
				
			}catch (UserException u) {
				log.controller().error("UserController.updateUser({},{})", u);
				error = u.getMessage();
			}
			catch (Exception e) {
				log.controller().error("UserController.updateUser({},{})", e);
				error = e.getMessage();
			}
			object=result;
			System.out.println("返回结果为1是注册成功此时返回结果："+result);
			return result(error, object);
			
		}
		/**
		 * 修改密码
		 * @param userinfo
		 * @param httpSession
		 * @return
		 */
		@ResponseBody
		@RequestMapping(value = "/userUpdaePassword.ctrl", produces = "application/json")
		public Map<String, Object> userUpdaePassword(User userinfo, HttpSession httpSession) {
			
			System.out.println("userUpdaePassword.ctrl");
			String error = null;
			Object object = null;
			int result=0;
			try {
				User user = userService.searchUserByName(userinfo.getUsername());
				if(user!=null){
					result = userService.userUpdaePassword(userinfo);
					System.out.println("Controller修改密码返回结果"+result);
				}else{
					result=0;
					throw new UserException("该用户不存在！");
				}
			}catch (UserException u) {
				log.controller().error("UserController.register({},{})", u);
				error = u.getMessage();
			}
			catch (Exception e) {
				log.controller().error("UserController.register({},{})", e);
				error = e.getMessage();
			}
			object=result;
			System.out.println("返回结果为1是修改成功此时返回结果："+result);
			return result(error, object);
		}
	
		/**
		 * 根据Id获取用户信息
		 * @param username
		 * @return
		 */
		@ResponseBody
		@RequestMapping(value = "/user/getUserInfoById.ctrl", produces = "application/json")
		public Map<String, Object> getUserInfoById(@RequestBody Map<String, Object> map) {
			System.out.println("getUserInfoById.ctrl");
			System.out.println(map);
			String error = null;
			Object object = null;
			User user = userService.getUserInfoById(map); 
			if (user == null) {
				error = "获取用户信息失败！";
			}
			else {
				object = user;
			}
			return result(error, object);
			
		}
		
		/**
		 * 
		 * 管理员更新用户账户余额
		 * @param session
		 * @param map
		 * @return
		 */
		@ResponseBody
		@RequestMapping(value = "/user/ManagerUpdateUserAccount.ctrl", produces = "application/json")
		public Map<String, Object> ManagerUpdateUserAccount(@RequestBody Map<String, Object> map) {
			
			System.out.println(map);	
			System.out.println("user/ManagerUpdateUserAccount.ctrl");
			String error = null;
			Object object = null;
			int result =0;
			try {
				result = userService.updateUserAccount(map);
				System.out.println("返回结果不为0是添加成功  此时返回结果："+result);				
				
			}catch (UserException u) {
				log.controller().error("UserController.updateUser({},{})", u);
				error = u.getMessage();
			}
			catch (Exception e) {
				log.controller().error("UserController.updateUser({},{})", e);
				error = e.getMessage();
			}
			object=result;
			System.out.println("返回结果为1是注册成功此时返回结果："+result);
			return result(error, object);
			
		}
}
