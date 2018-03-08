package com.systemnews;



import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.base.Controller_;
import com.car.Car;
import com.car.CarException;
import com.manager.Manager;







@Controller
public class SystemnewsController extends Controller_ {

	@Autowired
	SystemnewsService systemnewsService;
	
	/**
	 * 前台
	 * 新闻列表
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/news/searchSystemnewsList.ctrl", produces = "application/json")
	public Map<String, Object> searchSystemnewsList() {
		
		System.out.println("news/searchSystemnewsList.ctrl");
		String error = null;
		Object object = null;
		
		try {
			object = systemnewsService.searchSystemnewsList();
		}
		catch (Exception e) {
			error = e.getMessage();
		}
		
		return result(error, object);
		
	}
	/**前台
	 * 根据id
	 * 查询新闻详细信息
	 * @param map
	 * @return
	 */
	
	@ResponseBody
	@RequestMapping(value = "/news/selectNewsById.ctrl", produces = "application/json"  )
	public Map<String, Object> selectNewsById(@RequestBody Map<String, Object> map) {
		System.out.println("news/selectNewsById.ctrl");
		System.out.println(map);
		String error = null;
		Object object = null;
			try {
				object= systemnewsService.selectNewsById(map);
				System.out.println(object.toString());
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
	/***
	 * 查询所有新闻
	 * 后台
	 * @param map
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/searchAllnews.ctrl")
	public Map<String, Object> searchAllnews(@RequestParam Map<String, Object> map) {
		System.out.println(map);
		System.out.println("/searchAllnews.ctrl");
		String error = null;
		Object object = null;

		try {
			object = systemnewsService.searchAllnews(map);
		}
		catch (Exception e) {
			error = e.getMessage();
		}

		return result(error, object);

	}

	
	
	@ResponseBody
	@RequestMapping(value = "/news/delete.ctrl", produces = "application/json")
	public Map<String, Object> newsDel(@RequestBody Map<String, Object> map) {
		System.out.println("nnnn"+map);
		System.out.println("news/delete.ctrl");
		String error = null;
		Object object = null;
		try {
			systemnewsService.newsDel(map);
		
			object = "ok";
		}
		catch (Exception e) {
			error = e.getMessage();
		}
		
		return result(error, object);
	}
	
	
	@ResponseBody
	@RequestMapping(value = "/news/addnews.ctrl", produces = "application/json")
	public Map<String, Object> addnews(HttpServletRequest request,@RequestBody Map<String, Object> map) {
		System.out.println("news/addnews.ctrl");
		String error = null;
		Object object = null;
		int result=0;
		Manager manager = (Manager) request.getSession().getAttribute("manager");
		int m_id = manager.getId();
		map.put("m_id", m_id);
		System.out.println("...."+map);
		try {
			
				result = systemnewsService.addnews(map);
				System.out.println("Controller注册返回结果"+result);
			
		}catch (SystemnewsException c) {
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
	@RequestMapping(value = "/news/updatenews.ctrl", produces = "application/json")
	public Map<String, Object> updatenews(@RequestBody Map<String, Object> map) {
		System.out.println(map);
		System.out.println("news/updatenews.ctrl");
		String error = null;
		Object object = null;
		int result =0;
		try {
			result = systemnewsService.updatenews(map);
			
			
		}catch (SystemnewsException sn) {
		//	log.controller().error("UserController.updateCar({},{})", c);
			error = sn.getMessage();
		}
		catch (Exception e) {
		//	log.controller().error("UserController.updateCar({},{})", e);
			error = e.getMessage();
		}
		object=result;
		System.out.println("返回结果为1是修改成功此时返回结果："+result);
		return result(error, object);
		
	}

}
