package com.systeminfo;



import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.base.Controller_;








@Controller
public class SysteminfoController extends Controller_ {

	@Autowired
	SysteminfoService systeminfoService;
	
	
	
	/**
	 * 新增系统消息提醒
	 * @param map
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/warn/addSystemInfo.ctrl", produces = "application/json")
	public Map<String, Object> addSystemInfo(@RequestBody Map<String, Object> map) {
		
		System.out.println("warn/addSystemInfo.ctrl");
		System.out.println(map);
		String error = null;
		Object object = null;
		int result=0;
		try {
			
				result = systeminfoService.addSystemInfo(map);
				System.out.println("Controller新增返回结果"+result);
			
		}catch (SysteminfoException c) {
		//	log.controller().error("CarController.addCar({},{})", c);
			error = c.getMessage();
		}
		catch (Exception e) {
		//	log.controller().error("CarController.addCar({},{})", e);
			error = e.getMessage();
		}
		object=result;
		System.out.println("返回结果为1是添加成功  此时返回结果："+result);
		return result(error, object);
	}
	
	@ResponseBody
	@RequestMapping(value = "/warn/getSysteminfoByUserId.ctrl", produces = "application/json"  )
	public Map<String, Object> getSysteminfoByUserId(@RequestBody Map<String, Object> map) {
		System.out.println("warn/getSysteminfoByUserId.ctrl");
		System.out.println(map);
		String error = null;
		Object object = null;
			try {
				object= systeminfoService.getSysteminfoByUserId(map);
			//	System.out.println(object.toString());
			}
			catch (IllegalStateException i) {
				error = i.getMessage();
			}
			catch (Exception e) {
				error = e.getMessage();
				/*log.getLogger("member_c").error("address.select({})", address);
				log.getLogger("member_c").error("StackTrace: ", e);*/
			}
		
		return result(error, object);
	}
	
	/**
	 * 后台查询未读系统信息列表
	 * @param map
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/systeminfo/searchSystemInfoUnReaded.ctrl")
	public Map<String, Object> searchSystemInfoUnReaded(@RequestParam Map<String, Object> map,HttpServletRequest request) {
		System.out.println(map);
		System.out.println("systeminfo/searchSystemInfoUnReaded.ctrl");
	//	log.controller().info("OrderController.searchOrder({},{})", map);
		String error = null;
		Object object = null;

		try {
			Integer userId=(Integer)request.getSession().getAttribute("userId");
			map.put("userId", userId);
			object = systeminfoService.searchSystemInfoUnReaded(map);
		}
		catch (Exception e) {
		//	log.controller().error("OrderController.searchOrder({},{}) failed: {}", map, e);
			error = e.getMessage();
		}

		return result(error, object);

	}
	
	/**
	 * 后台查询已读系统信息列表
	 * @param map
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/systeminfo/searchSystemInfoReaded.ctrl")
	public Map<String, Object> searchSystemInfoReaded(@RequestParam Map<String, Object> map,HttpServletRequest request) {
		System.out.println(map);
		System.out.println("systeminfo/searchSystemInfoReaded.ctrl");
	//	log.controller().info("OrderController.searchOrder({},{})", map);
		String error = null;
		Object object = null;

		try {
			Integer userId=(Integer)request.getSession().getAttribute("userId");
			map.put("userId", userId);
			object = systeminfoService.searchSystemInfoReaded(map);
		}
		catch (Exception e) {
		//	log.controller().error("OrderController.searchOrder({},{}) failed: {}", map, e);
			error = e.getMessage();
		}

		return result(error, object);

	}

	/**
	 * 后台删除系统信息
	 * @param id
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "systeminfo/searchSystemInfoDel.ctrl", produces = "application/json")
	public Map<String, Object> searchSystemInfoDel(Integer id) {
		System.out.println("nnnn"+id);
		String error = null;
		Object object = null;
		try {
			systeminfoService.searchSystemInfoDel(id);
		
			object = "ok";
		}
		catch (Exception e) {
			error = e.getMessage();
		}
		return result(error, object);
	}
	
	@ResponseBody
	@RequestMapping(value = "systeminfo/SystemInfoUpdate.ctrl", produces = "application/json")
	public Map<String, Object> SystemInfoUpdate(Integer id) {
		System.out.println("nnnn"+id);
		String error = null;
		Object object = null;
		int result =0;
		try {
			result = systeminfoService.SystemInfoUpdate(id);
		
			object = result;
		}
		catch (Exception e) {
			error = e.getMessage();
		}
		return result(error, object);
	}
}
