package com.receiver;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.base.Controller_;
import com.car.CarException;
import com.order.OrderException;
import com.user.User;





@Controller
public class ReceiverController extends Controller_ {

	@Autowired
	ReceiverService receiverService;
	
	/**
	 * 异步取车人信息列表
	 * @param page：当前页页号
	 * @param rows：每页显示的记录数
	 * @param map：记录页面传到后台的数据
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/receiver/receiverListByUserId.ctrl")
	public Map<String, Object> receiverListByUserId(HttpSession session) {
		
		String error = null;
		Object object = null;
		User user = (User) session.getAttribute("user");
		if (user == null) {
			error = "會員未登錄";
		}
		else {
			try {
				object = receiverService.receiverListByUserId(user.getId());
			}
			catch (IllegalStateException i) {
				error = i.getMessage();
			}
			catch (Exception e) {
				error = e.getMessage();
				/*log.getLogger("member_c").error("address.list({})", user.getId());
				log.getLogger("member_c").error("StackTrace: ", e);*/
			}
		}
		return result(error, object);
		
	}
	
	

	
	
	
	/**
	 * 根据id和用户id查询取车人地址
	 * @param Receiver id
	 */
	@ResponseBody
	@RequestMapping(value = "/receiver/searchReceiverById.ctrl", produces = "application/json"  )
	public Map<String, Object> searchReceiverById(HttpSession session, @RequestBody Receiver receiver) {
		System.out.println("receiver/searchReceiverById.ctrl");
		System.out.println(receiver.toString());
		String error = null;
		Object object = null;
		User user = (User) session.getAttribute("user");
		if (user == null) {
			error = "會員未登錄";
		}
		else {
			try {
				object= receiverService.searchReceiverById(receiver);
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
		}
		return result(error, object);
	}
	
	
	
	
	@ResponseBody
	@RequestMapping(value = "/receiver/addReceiver.ctrl", produces = "application/json")
	public Map<String, Object> addReceiver(HttpServletRequest request,@RequestBody Receiver receiver) {
		System.out.println("receiver/addReceiver");
		System.out.println(receiver.toString());
		String error = null;
		Object object = null;
		int result=0;
		int userId=(Integer)request.getSession().getAttribute("userId");
		receiver.setU_id(userId);
		try {
			//此时result是订单编号
			result = receiverService.addReceiver(receiver);
			System.out.println("返回结果不为0是添加成功  此时返回结果："+result);
		}catch (ReceiverException r) {
		//log.controller().error("CarController.addCar({},{})", o);
		error = r.getMessage();
		}
		catch (Exception e) {
			//log.controller().error("CarController.addCar({},{})", e);
			error = e.getMessage();
		}
		object=result;
		System.out.println("返回结果不为0是添加成功  此时返回结果："+result);
		return result(error, object);
	}
	
	/**
	 * 获取当前用户的取车人信息列表
	 * @param map
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/receiver/backSearchReceiverList.ctrl")
	public Map<String, Object> backSearchReceiverList(@RequestParam Map<String, Object> map,HttpServletRequest request) {
		System.out.println("/receiver/backSearchReceiverList.ctrl");
		System.out.println(map);
		//log.controller().info("OrderController.searchUser({},{})", map);
		String error = null;
		Object object = null;

		try {
			Integer userId=(Integer)request.getSession().getAttribute("userId");
			map.put("userId", userId);
			System.out.println(map);
			object = receiverService.backSearchReceiverList(map);
		}
		catch (Exception e) {
			log.controller().error("OrderController.searchUser({},{}) failed: {}", map, e);
			error = e.getMessage();
		}

		return result(error, object);

	}
	
	/**
	 * 根据Id删除取车人信息
	 * @param id
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "receiver/deleteById.ctrl", produces = "application/json")
	public Map<String, Object> receiverDeleteById(Integer id) {
		System.out.println("nnnn"+id);
		System.out.println("receiver/deleteById.ctrl");
		String error = null;
		Object object = null;
		try {
			receiverService.receiverDeleteById(id);		
			object = "ok";
		}
		catch (Exception e) {
			error = e.getMessage();
		}
		return result(error, object);
	}
	
	
	/**
	 * 会员中心更新地址信息
	 * @param map
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/receiver/backUpdateReceiver.ctrl", produces = "application/json")
	public Map<String, Object> backUpdateReceiver(HttpServletRequest request,@RequestBody Receiver receiver) {
		System.out.println(receiver.toString());
		System.out.println(receiver.getIsDefault());
		System.out.println("receiver/backUpdateReceiver.ctrl");
		String error = null;
		Object object = null;
		int result =0;
		try {
			
			Integer userId=(Integer)request.getSession().getAttribute("userId");
			receiver.setU_id(userId);
			System.out.println(receiver.toString());
			result = receiverService.backUpdateReceiver(receiver);
			
			
		}catch (ReceiverException r) {
		//	log.controller().error("UserController.updateCar({},{})", c);
			error = r.getMessage();
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
