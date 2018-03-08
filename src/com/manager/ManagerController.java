package com.manager;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.base.Controller_;
import com.user.User;
import com.user.UserException;







@Controller
public class ManagerController extends Controller_ {

	@Autowired
	ManagerService managerService;
	
	@ResponseBody
	@RequestMapping(value = "/Managerlogin.ctrl", produces = "application/json")
	public Map<String, Object> login(@RequestParam("m_username") String m_username, @RequestParam("m_password") String m_password, HttpSession httpSession) {
		System.out.println(m_username+"++++"+m_password);
		System.out.println("login.ctrl");
		String error = null;
		Object object = null;
		try {
			Manager manager = managerService.login(m_username, m_password);
			httpSession.setAttribute("manager", manager);
			httpSession.setAttribute("managerId", manager.getId());
			object = "ok";
		}
		catch (ManagerException u) {
			log.controller().error("ManagerController.login({},{})", m_username, m_password, u);
			error = u.getMessage();
		}
		catch (Exception e) {
			log.controller().error("ManagerController.login({},{})", m_username, m_password, e);
			error = e.getMessage();
		}
		return result(error, object);
	}
	
	/**
	 * 登出
	 * @param session
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/Managerlogout.ctrl", produces = "application/json")
	public Map<String, Object> logout(HttpSession session) {
		log.controller().info("ManagerController.logout({})", session);
		String error = null;
		String object = null;
		try {
			session.invalidate();
			object = "ok";
		}
		catch (Exception e) {
			log.controller().error("ManagerController.logout({},{})", session, e);
			error = e.getMessage();
		}
		return result(error, object);
	}

	/**
	 * 获取当前管理员用户信息--登录名
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/getLoginManagerM_userName.ctrl", produces = "application/json")
	public Map<String, Object> getLoginUserName(HttpServletRequest request) {
		log.controller().info("ManagerController.getLoginUserName({})", request);
		String error = null;
		Object object = null;
		Manager manager = (Manager) request.getSession().getAttribute("manager");
		if (manager == null) {
			error = "用户不存在";
		}
		else {
			object = manager;
		}
		return result(error, object);
	}
	/**
	 * 查询所有用户列表
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/searchAllUser.ctrl")
	public Map<String, Object> searchAllUserList(@RequestParam Map<String, Object> map) {
		System.out.println("55555进入controller");
		String error = null;
		Object object = null;

		try {
			object = managerService.searchAllUserList(map);
		}
		catch (Exception e) {
			error = e.getMessage();
		}

		return result(error, object);

	}
	/**
	 * 查询管理员个人信息
	 * @param param
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/searchManager.ctrl")
	public Map<String, Object> searchManagerInfo(@RequestParam Map<String, Object> param,HttpServletRequest request) {
		System.out.println(param);
		System.out.println("55555进入controller");
		log.controller().info("OrderController.searchUser({},{})", param);
		String error = null;
		Object object = null;

		try {
			Integer managerId=(Integer)request.getSession().getAttribute("managerId");
			object = managerService.searchManagerInfo(param,managerId);
		}
		catch (Exception e) {
			log.controller().error("OrderController.searchUser({},{}) failed: {}", param, e);
			error = e.getMessage();
		}

		return result(error, object);

	}

	/**
	 * 更新个人资料
	 * 查询个人信息，重新放在session里
	 * @param session
	 * @param manager
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/managerInfo/updateManager.ctrl", method = RequestMethod.POST,produces = "application/json")
	public Map<String, Object> updateManager(HttpSession session,Manager manager) {
	String error = null;
	Object object = null;
	int result =0;
	try {
		object = managerService.updateManager(manager);
		Manager newmanager = managerService.searchManagerByName(manager.getM_username());
		session.setAttribute("manager", newmanager);
		
		
	}catch (ManagerException m) {
		
		error = m.getMessage();
	}
	catch (Exception e) {
	
		error = e.getMessage();
	}
	object=result;
	System.out.println("返回结果为1是注册成功此时返回结果："+result);
	return result(error, object);
	
}
}
