package com.order;

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
import com.receiver.Receiver;
import com.user.User;
import com.user.UserException;
import com.user.UserService;



@Controller
public class OrderController extends Controller_ {

	@Autowired
	OrderService orderService;
	
	@Autowired
	UserService userService;
	
	
	/**
	 * 保存表单
	 * @param session
	 * @return
	 * 删除订单
	 */
	@ResponseBody
	@RequestMapping(value = "/order/insertOrderTotal.ctrl", produces = "application/json")
	public Map<String, Object> insertOrderTotal(@RequestBody Map<String, Object> map,HttpServletRequest request) {
		System.out.println(map);
		System.out.println("order/insertOrderTotal.ctrl");
		String error = null;
		Object object = null;
		int result= 0;
		try {
			Integer userId=(Integer)request.getSession().getAttribute("userId");
			map.put("userId", userId);
			result = orderService.insertOrderTotal(map);
		
			object = "ok";
		}
		catch (Exception e) {
			error = e.getMessage();
		}
		object = result;
		return result(error, object);
	}
	/**
	 * 保存表单
	 * @param session
	 * @return
	 * 删除订单
	 */
	@ResponseBody
	@RequestMapping(value = "order/del.ctrl", produces = "application/json")
	public Map<String, Object> orderDel(Integer id) {
		System.out.println("nnnn"+id);
		System.out.println("order/del.ctrl");
		String error = null;
		Object object = null;
		try {
			orderService.orderDelete(id);
		
			object = "ok";
		}
		catch (Exception e) {
			error = e.getMessage();
		}
		
		return result(error, object);
	}
	
	/**
	 * 保存表单
	 * @param session
	 * @return
	 * 用户删除时间
	 * 更新状态为订单状态用户已删除
	 */
	@ResponseBody
	@RequestMapping(value = "order/updateUserDel.ctrl", produces = "application/json")
	public Map<String, Object> updateUserDel(@RequestParam Map<String, Object> map,HttpServletRequest request) {
		System.out.println(map);
		System.out.println("order/updateUserDel.ctrl");
		String error = null;
		Object object = null;
		int result= 0;
		try {
			Integer userId=(Integer)request.getSession().getAttribute("userId");
			map.put("userId", userId);
			result = orderService.updateUserDel(map);
		
			
		}
		catch (Exception e) {
			error = e.getMessage();
		}
		object = result;
		return result(error, object);
	}
	
	
	/**
	 * 保存表单
	 * @param session
	 * @return
	 * 用户取消订单
	 */
	@ResponseBody
	@RequestMapping(value = "order/userCheckingOrderCal.ctrl", produces = "application/json")
	public Map<String, Object> userCheckingOrderCal(@RequestParam Map<String, Object> map,HttpServletRequest request) {
		System.out.println(map);
		System.out.println("order/userCheckingOrderCal.ctrl");
		String error = null;
		Object object = null;
		int result= 0;
		try {
			Integer userId=(Integer)request.getSession().getAttribute("userId");
			map.put("userId", userId);
			result = orderService.userCheckingOrderCal(map);
		
			
		}
		catch (Exception e) {
			error = e.getMessage();
		}
		object = result;
		System.out.println("222"+object);
		return result(error, object);
	}
	
	/**
	 * 增加汽车
	 * @param session
	 * @return
	 * 先查询是否存在该汽车，存在就增加数目，不存在就新增
	 *//*
	@ResponseBody
	@RequestMapping(value = "/addOrder.ctrl", produces = "application/json")
	public Map<String, Object> addCar(Order orderinfo, HttpSession httpSession) {
		
		System.out.println("addOrder.ctrl"+orderinfo.toString());
		String error = null;
		Object object = null;
		int result=0;
		try {
				result = orderService.addOrder(orderinfo);
				System.out.println("增加订单结果"+result);
			
		}catch (OrderException o) {
			log.controller().error("OrderController.addCar({},{})", o);
			error = o.getMessage();
		}
		catch (Exception e) {
			log.controller().error("OrderController.addCar({},{})", e);
			error = e.getMessage();
		}
		object=result;
		System.out.println("返回结果为1是注册成功此时返回结果："+result);
		return result(error, object);
	}

	*/
	
	/**
	 * 修改20160429.14.28
	 * 个人订单信息列表
	 * @param page：当前页页号
	 * @param rows：每页显示的记录数
	 * @param map：记录页面传到后台的数据
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/order/searchUserAllOrder.ctrl")
	public Map<String, Object> searchUserAllOrder(@RequestParam Map<String, Object> map,HttpServletRequest request) {
		System.out.println(map);
		System.out.println("55555进入controller");
	//	log.controller().info("OrderController.searchOrder({},{})", map);
		String error = null;
		Object object = null;

		try {
			Integer userId=(Integer)request.getSession().getAttribute("userId");
			map.put("userId", userId);
			object = orderService.searchUserAllOrder(map);
		}
		catch (Exception e) {
		//	log.controller().error("OrderController.searchOrder({},{}) failed: {}", map, e);
			error = e.getMessage();
		}

		return result(error, object);

	}
	/**
	 * 查询待审核订单列表
	 * @param map
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/order/searchUserCheckingOrder.ctrl")
	public Map<String, Object> searchUserCheckingOrder(@RequestParam Map<String, Object> map,HttpServletRequest request) {
		System.out.println(map);
		System.out.println("55555进入controller");
	//	log.controller().info("OrderController.searchOrder({},{})", map);
		String error = null;
		Object object = null;

		try {
			Integer userId=(Integer)request.getSession().getAttribute("userId");
			map.put("userId", userId);
			object = orderService.searchUserCheckingOrder(map);
		}
		catch (Exception e) {
		//	log.controller().error("OrderController.searchOrder({},{}) failed: {}", map, e);
			error = e.getMessage();
		}

		return result(error, object);

	}
	/**
	 * 查询用户未支付订单
	 * @param map
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/order/searchUserPayingOrder.ctrl")
	public Map<String, Object> searchUserPayingOrder(@RequestParam Map<String, Object> map,HttpServletRequest request) {
		System.out.println(map);
		System.out.println("55555进入controller");
	//	log.controller().info("OrderController.searchOrder({},{})", map);
		String error = null;
		Object object = null;

		try {
			Integer userId=(Integer)request.getSession().getAttribute("userId");
			map.put("userId", userId);
			object = orderService.searchUserPayingOrder(map);
		}
		catch (Exception e) {
		//	log.controller().error("OrderController.searchOrder({},{}) failed: {}", map, e);
			error = e.getMessage();
		}

		return result(error, object);

	}
	/**
	 * 个人订单信息列表
	 * @param page：当前页页号
	 * @param rows：每页显示的记录数
	 * @param map：记录页面传到后台的数据
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/order/searchAllOrder.ctrl")
	public Map<String, Object> searchAllOrderList(@RequestParam Map<String, Object> param) {
		System.out.println(param);
		System.out.println("55555进入controller");
		
		String error = null;
		Object object = null;
		
		try {
			object = orderService.searchAllOrder(param);
		}
		catch (Exception e) {
		
			error = e.getMessage();
		}
		
		return result(error, object);
		
	}
	
	/**
	 * 2016-04-20
	 * 修改2016-04-24
	 * 增加订单信息
	 * @param session
	 * @param map
	 * @return
	 * 
	 */
	@ResponseBody
	@RequestMapping(value = "/order/addOrder.ctrl", produces = "application/json")
	public Map<String, Object> addOrder(HttpServletRequest request,@RequestBody Map<String, Object> map) {
		System.out.println("order/addOrder.ctrl");
		System.out.println(map);
		String error = null;
		Object object = null;
		int result=0;
		Integer userId=(Integer)request.getSession().getAttribute("userId");
		map.put("userId", userId);
		try {
			//此时result是订单编号
			result = orderService.addOrder(map);
			System.out.println("返回结果不为0是添加成功  此时返回结果："+result);
		}catch (OrderException o) {
			//log.controller().error("CarController.addCar({},{})", o);
			error = o.getMessage();	
		}catch (CarException c) {
		//log.controller().error("CarController.addCar({},{})", o);
		error = c.getMessage();
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
	 * 20160426.13.49
	 * 这边注意的是当你更新用户的资料时必须把用户的资料重新放在session里，否则容易取到以前的值
	 * @param request
	 * @param map
	 * @return
	 */
	
	@ResponseBody
	@RequestMapping(value = "/order/updateOrderPayStatus.ctrl", produces = "application/json")
	public Map<String, Object> updateOrderPayStatus(HttpServletRequest request,HttpSession session,@RequestBody Map<String, Object> map) {
		System.out.println("order/updateOrderPayStatus.ctrl");
		System.out.println(map);
		String error = null;
		Object object = null;
		int result=0;
		Integer userId=(Integer)request.getSession().getAttribute("userId");
		map.put("userId", userId);
		try {
			//此时result是订单编号
			result = orderService.updateOrderPayStatus(map);
			System.out.println("返回结果不为0是添加成功  此时返回结果："+result);
			User user = userService.searchUserById(userId);
			session.setAttribute("user", user);
		}catch (OrderException o) {
			//log.controller().error("CarController.addCar({},{})", o);
			error = o.getMessage();	
		}catch (UserException u) {
		//log.controller().error("CarController.addCar({},{})", o);
		error = u.getMessage();
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
	 * 根据订单id
	 * @param Receiver id
	 */
	@ResponseBody
	@RequestMapping(value = "/order/selectOrderById.ctrl", produces = "application/json"  )
	public Map<String, Object> selectOrderById(@RequestBody Map<String, Object> map) {
		System.out.println("order/selectOrderById.ctrl");
		System.out.println(map);
		String error = null;
		Object object = null;
			try {
				object= orderService.selectOrderById(map);
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
	
	
	/**
	 * 查询待审核订单列表
	 * @param map
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/order/searchUserGoingOrder.ctrl")
	public Map<String, Object> searchUserGoingOrder(@RequestParam Map<String, Object> map,HttpServletRequest request) {
		System.out.println(map);
		System.out.println("55555进入controller");
	//	log.controller().info("OrderController.searchOrder({},{})", map);
		String error = null;
		Object object = null;

		try {
			Integer userId=(Integer)request.getSession().getAttribute("userId");
			map.put("userId", userId);
			object = orderService.searchUserGoingOrder(map);
		}
		catch (Exception e) {
		//	log.controller().error("OrderController.searchOrder({},{}) failed: {}", map, e);
			error = e.getMessage();
		}

		return result(error, object);

	}
	
	
	@ResponseBody
	@RequestMapping(value = "order/endOrder.ctrl", produces = "application/json")
	public Map<String, Object> endOrder(@RequestBody Map<String, Object> map,HttpServletRequest request) {
		System.out.println(map);
		System.out.println("order/endOrder.ctrl");
		String error = null;
		Object object = null;
		int result= 0;
		try {
			
			result = orderService.endOrder(map);
		
			
		}
		catch (Exception e) {
			error = e.getMessage();
		}
		object = result;
		return result(error, object);
	}
	
	/**
	 * 管理员
	 * 查询所有用户订单列表
	 * @param map
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/order/searchManagerAllUserOrder.ctrl")
	public Map<String, Object> searchManagerAllUserOrder(@RequestParam Map<String, Object> map,HttpServletRequest request) {
		System.out.println(map);
		System.out.println("order/searchManagerAllUserOrder.ctrl");
	//	log.controller().info("OrderController.searchOrder({},{})", map);
		String error = null;
		Object object = null;

		try {			
			object = orderService.searchManagerAllUserOrder(map);
		}
		catch (Exception e) {
		//	log.controller().error("OrderController.searchOrder({},{}) failed: {}", map, e);
			error = e.getMessage();
		}

		return result(error, object);

	}
	/**
	 * 管理员
	 * 查询所有带审核订单
	 * @param map
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/order/searchManagerAllUserCheckingOrder.ctrl")
	public Map<String, Object> searchManagerAllUserCheckingOrder(@RequestParam Map<String, Object> map,HttpServletRequest request) {
		System.out.println(map);
		System.out.println("55555进入controller");
	//	log.controller().info("OrderController.searchOrder({},{})", map);
		String error = null;
		Object object = null;

		try {
			
			object = orderService.searchManagerAllUserCheckingOrder(map);
		}
		catch (Exception e) {
		//	log.controller().error("OrderController.searchOrder({},{}) failed: {}", map, e);
			error = e.getMessage();
		}

		return result(error, object);

	}
	
	/**
	 * 管理员审核订单
	 * @param map
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "order/ManagerAllUserCheckingOrderOn.ctrl", produces = "application/json")
	public Map<String, Object> ManagerAllUserCheckingOrderOn(@RequestBody Map<String, Object> map) {
		System.out.println(map);
		System.out.println("order/ManagerAllUserCheckingOrderOn.ctrl");
		String error = null;
		Object object = null;
		int result= 0;
		try {
			result = orderService.ManagerAllUserCheckingOrderOn(map);
		
			
		}
		catch (Exception e) {
			error = e.getMessage();
		}
		object = result;
		System.out.println("222"+object);
		return result(error, object);
	}
	
	/**
	 * 用户还车
	 * @param map
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "order/userEndOrder.ctrl", produces = "application/json")
	public Map<String, Object> userEndOrder(@RequestBody Map<String, Object> map,HttpServletRequest request) {
		System.out.println(map);
		System.out.println("order/userEndOrder.ctrl");
		String error = null;
		Object object = null;
		int result= 0;
		try {
			Integer userId=(Integer)request.getSession().getAttribute("userId");
			map.put("userId", userId);
			result = orderService.userEndOrder(map);
		
			
		}
		catch (Exception e) {
			error = e.getMessage();
		}
		object = result;
		return result(error, object);
	}
	
	
	/**
	 * 用户续租
	 * @param map
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "order/delayOrder.ctrl", produces = "application/json")
	public Map<String, Object> delayOrder(@RequestBody Map<String, Object> map,HttpServletRequest request) {
		System.out.println(map);
		System.out.println("order/delayOrder.ctrl");
		String error = null;
		Object object = null;
		int result= 0;
		try {
			Integer userId=(Integer)request.getSession().getAttribute("userId");
			map.put("userId", userId);
			result = orderService.delayOrder(map);
		
			
		}
		catch (Exception e) {
			error = e.getMessage();
		}
		object = result;
		return result(error, object);
	}
	
	/**
	 * 用户申请还车列表
	 * @param map
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/order/searchManagerAllUserBackOrder.ctrl")
	public Map<String, Object> searchManagerAllUserBackOrder(@RequestParam Map<String, Object> map,HttpServletRequest request) {
		System.out.println(map);
		System.out.println("55555进入controller");
	//	log.controller().info("OrderController.searchOrder({},{})", map);
		String error = null;
		Object object = null;

		try {
			
			object = orderService.searchManagerAllUserBackOrder(map);
		}
		catch (Exception e) {
		//	log.controller().error("OrderController.searchOrder({},{}) failed: {}", map, e);
			error = e.getMessage();
		}

		return result(error, object);

	}
	/**
	 * 查询所有用户超时一周订单
	 * @param map
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/order/searchManagerAllUserOverTimeOrder.ctrl")
	public Map<String, Object> searchManagerAllUserOverTimeOrder(@RequestParam Map<String, Object> map,HttpServletRequest request) {
		System.out.println(map);
		System.out.println("55555进入controller");
	//	log.controller().info("OrderController.searchOrder({},{})", map);
		String error = null;
		Object object = null;

		try {
			
			object = orderService.searchManagerAllUserOverTimeOrder(map);
		}
		catch (Exception e) {
		//	log.controller().error("OrderController.searchOrder({},{}) failed: {}", map, e);
			error = e.getMessage();
		}

		return result(error, object);

	}
	
	
	/**
	 * 在系统首页异步加载查询超时和未支付订单列表
	 * @param map
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/order/selectOrderUpaingAndOvertime.ctrl")
	public Map<String, Object> selectOrderUpaingAndOvertimeOrder() {
		System.out.println("order/selectOrderUpaingAndOvertime.ctrl");
	//	log.controller().info("OrderController.searchOrder({},{})", map);
		String error = null;
		Object object = null;

		try {
			
			object = orderService.selectOrderUpaingAndOvertimeOrder();
		}
		catch (Exception e) {
		//	log.controller().error("OrderController.searchOrder({},{}) failed: {}", map, e);
			error = e.getMessage();
		}

		return result(error, object);

	}
	
	
	@ResponseBody
	@RequestMapping(value = "order/SystemOrderCal.ctrl", produces = "application/json")
	public Map<String, Object> SystemOrderCal(@RequestBody Map<String, Object> map,HttpServletRequest request) {
		System.out.println(map);
		System.out.println("order/SystemOrderCal.ctrl");
		String error = null;
		Object object = null;
		int result= 0;
		try {
			result = orderService.userCheckingOrderCal(map);
		
			
		}
		catch (Exception e) {
			error = e.getMessage();
		}
		object = result;
		System.out.println("222"+object);
		return result(error, object);
	}
	
	
	@ResponseBody
	@RequestMapping(value = "order/ManagerUpdateOrder.ctrl", produces = "application/json")
	public Map<String, Object> ManagerUpdateOrder(@RequestBody Map<String, Object> map,HttpServletRequest request) {
		System.out.println(map);
		System.out.println("order/ManagerUpdateOrder.ctrl");
		String error = null;
		Object object = null;
		int result= 0;
		try {
			result = orderService.ManagerUpdateOrder(map);
		
			
		}
		catch (Exception e) {
			error = e.getMessage();
		}
		object = result;
		return result(error, object);
	}
	
}
