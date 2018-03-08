package com.manager;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.user.User;
import com.user.UserException;



@Service
public class ManagerService {

	@Autowired
	ManagerMapper managerMapper;

	/**
	 * 登录
	 * 
	 * @param user
	 * @throws Exception
	 * @return
	 */
	public Manager login(String m_username,String m_password) throws ManagerException, Exception {
		Manager result = null;
		System.out.println("ManagerService注册");
		/*String sha1pwd = DigestUtils.sha1Hex(password);*/
		System.out.println(m_username+"传过来的参数"+m_password);

		result = managerMapper.loginVerification(m_username, m_password);

		
		if(result == null){
			throw new ManagerException("用户名或密码错误");
		}
		System.out.println(result.toString()+"结果 ");
		return result;
	}

	public Map<String, Object> searchAllUserList(Map<String, Object> map) {
		Integer pageNumber = Integer.valueOf((String) map.get("page"));
		Integer pageSize = Integer.valueOf((String) map.get("rows"));
		Map<String, Object> result = null;
		int startRow = 0; // 开始记录数
		Integer total = null; // 总记录数
		List<User> rows = null; // 分页记录
		startRow = (pageNumber - 1) * pageSize; // 计算从第几条开始
		
		total = managerMapper.countAllUser(map);
		System.out.println(total);
		rows = managerMapper.searchAllUserList(startRow, pageSize, map);

		result = new HashMap<String, Object>();
		result.put("total", total);
		result.put("rows", rows);

		return result;
	}

	public  Map<String, Object> searchManagerInfo(Map<String, Object> param, Integer managerId) {
		// TODO Auto-generated method stub
		System.out.println("searchManagerInfo"+managerId);
		Integer pageNumber = Integer.valueOf((String) param.get("page"));
		Integer pageSize = Integer.valueOf((String) param.get("rows"));
		Map<String, Object> result = null;
		int startRow = 0; // 开始记录数
		Integer total = 0; // 总记录数
		List<Manager> rows = null; // 分页记录

		startRow = (pageNumber - 1) * pageSize; // 计算从第几条开始
		System.out.println("total"+total);
		total = 1;
		System.out.println("5"+total);

		rows = managerMapper.searchManagerInfo(startRow, pageSize, param,managerId);

		result = new HashMap<String, Object>();
		result.put("total", total);
		result.put("rows", rows);

		return result;
	}
	/**
	 * 更新个人信息
	 * @param manager
	 * @return
	 * @throws ManagerException
	 */
	public int updateManager(Manager manager) throws ManagerException {
		// TODO Auto-generated method stub
		Integer result = managerMapper.updateManager(manager);
		if(result == 0) {
			throw new ManagerException("更新个人資料失敗");
		}
		return result;
	}
	/**
	 * 查询个人信息，重新放在session里
	 * @param m_username
	 * @return
	 */
	public Manager searchManagerByName(String m_username) {
		// TODO Auto-generated method stub
		System.out.println("ManagerService根据用户名查询"+m_username);
		Manager manager = managerMapper.searchManagerByName(m_username);
		return manager;
	}

}
