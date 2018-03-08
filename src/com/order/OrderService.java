package com.order;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.car.Car;
import com.car.CarException;
import com.car.CarMapper;
import com.receiver.Receiver;
import com.user.UserException;
import com.user.UserMapper;







@Service
public class OrderService {

	@Autowired
	OrderMapper orderMapper;
	
	@Autowired
	CarMapper carMapper;
	
	@Autowired
	UserMapper userMapper;

	/*public int addOrder(Order orderinfo) throws OrderException  {
		// TODO Auto-generated method stub
		System.out.println("OrderService注册"+orderinfo.toString());
		int result=0;
		result = orderMapper.addOrder(orderinfo);
		System.out.println("OrderService注册结果"+result);
		if(result==0){
			throw new OrderException("新增汽车失败");
		}
		
		return result;
	}*/
	
	/**
	 * 
	 * 查询用户个人订单列表
	 * @param param
	 * @return
	 * @throws Exception
	 */
	//查询当前用户的所有订单
	
	public Map<String, Object> searchUserAllOrder(Map<String, Object> map)throws Exception {
		// TODO Auto-generated method stub
		
		Integer pageNumber = Integer.valueOf((String) map.get("page"));
		Integer pageSize = Integer.valueOf((String) map.get("rows"));
		Map<String, Object> result = null;
		int startRow = 0; // 开始记录数
		Integer total = null; // 总记录数
		List<Map<String,Object>> rows = null; // 分页记录
		
		startRow = (pageNumber - 1) * pageSize; // 计算从第几条开始
		System.out.println("total"+total);
		total = orderMapper.countUserAllOrder(map);
		System.out.println("5"+total);

		rows = orderMapper.searchUserAllOrder(startRow, pageSize, map);
			
		result = new HashMap<String, Object>();
		result.put("total", total);
		result.put("rows", rows);

		
		return result;
	}
	public void orderDelete(Integer id) {
		// TODO Auto-generated method stub
		System.out.println("service"+id);
		orderMapper.orderDelete(id);
	}
	
	/**
	 * 
	 * @param param
	 * @return
	 */
	public Map<String, Object> searchAllOrder(Map<String, Object> param) {
		// TODO Auto-generated method stub
				
				Integer pageNumber = Integer.valueOf((String) param.get("page"));
				Integer pageSize = Integer.valueOf((String) param.get("rows"));
				Map<String, Object> result = null;
				int startRow = 0; // 开始记录数
				Integer total = 0; // 总记录数
				List<Order> rows = null; // 分页记录

				startRow = (pageNumber - 1) * pageSize; // 计算从第几条开始
				
				total = orderMapper.countAllOrder(param);
				

				rows = orderMapper.searchAllOrderList(startRow, pageSize, param);

				result = new HashMap<String, Object>();
				result.put("total", total);
				result.put("rows", rows);

				return result;
	}
	
	
	
	/**
	 * 新增订单
	 * 步骤：
	 * 先判断此时车辆的状态是不是可租赁，如果不是，说明已经被租赁了，否则则新增订单
	 * 1，addorder，新增 map
	 * 2，改变车辆状态 CarId
	 * @throws CarException 
	 * */
	public int addOrder(Map<String, Object> map) throws OrderException, CarException {
		int result = 0;	
		int orderId =0;
		System.out.println(map);
		int CarId = Integer.parseInt((String) map.get("CarId"));
		Car car = carMapper.selectCarById(CarId);
		System.out.println(car.getC_status());
		if(car.getC_status()==1){
			result= orderMapper.addOrder(map);
			System.out.println("OrderService注册结果"+result);
			if(result==0){
				throw new OrderException("新增订单失败");
				}else{
					int update_c_statusResult = carMapper.update_c_status(map);
				
					if(update_c_statusResult==0){
						throw new CarException("改变汽车状态失败！");
					}
				}
			orderId = orderMapper.getOrderId();
			if(orderId==0){
				throw new OrderException("订单状态异常，获取订单编号失败！");
			}
		
			}else{
				throw new CarException("汽车状态已改变不可租赁！");
			}
		//此时返回的是订单编号
		return orderId;
		
		
	}
	
	/**
	 * 
	 * @param map
	 * @return
	 * @throws OrderException
	 * @throws UserException
	 */
	public int updateOrderPayStatus(Map<String, Object> map) throws OrderException, UserException {
		// TODO Auto-generated method stub
		System.out.println("orderService"+map);
		Integer result = orderMapper.updateOrderPayStatus(map);
		System.out.println(result);
		if(result == 0) {
			throw new OrderException("更新支付状态失敗");
		}else{
			System.out.println(result);
			System.out.println("进去没");
			Integer updateAccountResult = userMapper.updateAccount(map);
			if(updateAccountResult==0){
				throw new UserException("更新用户余额失敗");
				
			}
			System.out.println("更新用户余额"+updateAccountResult);
		}
		System.out.println("更新支付状态"+result);
		return result;
	}
	/***
	 * 用户删除订单
	 * @param map
	 * @return
	 * @throws OrderException
	 */
	public int updateUserDel(Map<String, Object> map) throws OrderException {
		// TODO Auto-generated method stub
		Integer result = orderMapper.updateUserDel(map);
		System.out.println(result);
		if(result == 0) {
			throw new OrderException("删除订单失敗！");
		}
		System.out.println("删除订单状态"+result);
		return result;
	}
	/***
	 * 用户
	 * 查询待审核订单
	 * @param map
	 * @return
	 */
	public Map<String, Object> searchUserCheckingOrder(Map<String, Object> map) {
		Integer pageNumber = Integer.valueOf((String) map.get("page"));
		Integer pageSize = Integer.valueOf((String) map.get("rows"));
		Map<String, Object> result = null;
		int startRow = 0; // 开始记录数
		Integer total = null; // 总记录数
		List<Map<String,Object>> rows = null; // 分页记录
		
		startRow = (pageNumber - 1) * pageSize; // 计算从第几条开始
		System.out.println("total"+total);
		total = orderMapper.countUserCheckingOrder(map);
		System.out.println("5"+total);

		rows = orderMapper.searchUserCheckingOrder(startRow, pageSize, map);
			
		result = new HashMap<String, Object>();
		result.put("total", total);
		result.put("rows", rows);

		
		return result;
	}
	/**
	 * 用户取消订单
	 * @param map
	 * @return
	 * @throws OrderException
	 */
	public int userCheckingOrderCal(Map<String, Object> map) throws OrderException {
		// TODO Auto-generated method stub
		
				Integer result = orderMapper.userCheckingOrderCal(map);
				System.out.println(result);
				if(result == 0) {
					throw new OrderException("取消订单失敗！");
				}
				System.out.println("取消订单状态"+result);
				return result;
	}
	/***
	 * 插入订单总额
	 * @param map
	 * @return
	 * @throws OrderException
	 */
	public int insertOrderTotal(Map<String, Object> map) throws OrderException {
		// TODO Auto-generated method stub
		System.out.println("service"+map);
		Integer result = orderMapper.insertOrderTotal(map);
		System.out.println(result);
		if(result == 0) {
			throw new OrderException("插入订单总金额失敗！");
		}
		System.out.println("插入订单总金额状态"+result);
		return result;
	}
	public Map<String, Object> searchUserPayingOrder(Map<String, Object> map) {
			System.out.println("service"+map);
			Integer pageNumber = Integer.valueOf((String) map.get("page"));
			Integer pageSize = Integer.valueOf((String) map.get("rows"));
			Map<String, Object> result = null;
			int startRow = 0; // 开始记录数
			Integer total = 0; // 总记录数
			List<Map<String,Object>> rows = null; // 分页记录
			
			startRow = (pageNumber - 1) * pageSize; // 计算从第几条开始
			System.out.println("total"+total);
			total = orderMapper.countUserPayingOrder(map);
			System.out.println("5"+total);

			rows = orderMapper.searchUserPayingOrder(startRow, pageSize, map);
				
			result = new HashMap<String, Object>();
			result.put("total", total);
			result.put("rows", rows);

			
			return result;
		
	}
	/**
	 * 根据id查询订单信息
	 * @param map
	 * @return
	 */
	public Order selectOrderById(Map<String, Object> map) {
		// TODO Auto-generated method stub
		System.out.println("service"+map.toString());
		Order result = orderMapper.selectOrderById(map);	
		if (result == null) {
			throw new IllegalArgumentException("没有此条收货人信息");
		}
		System.out.println(result.toString());
		return result;
	}
	/***
	 * 查询待完成的订单
	 * @param map
	 * @return
	 */
	public Map<String, Object> searchUserGoingOrder(Map<String, Object> map) {
		Integer pageNumber = Integer.valueOf((String) map.get("page"));
		Integer pageSize = Integer.valueOf((String) map.get("rows"));
		Map<String, Object> result = null;
		int startRow = 0; // 开始记录数
		Integer total = null; // 总记录数
		List<Map<String,Object>> rows = null; // 分页记录
		
		startRow = (pageNumber - 1) * pageSize; // 计算从第几条开始
		System.out.println("total"+total);
		total = orderMapper.countUserGoingOrder(map);
		System.out.println("5"+total);

		rows = orderMapper.searchUserGoingOrder(startRow, pageSize, map);
			
		result = new HashMap<String, Object>();
		result.put("total", total);
		result.put("rows", rows);

		
		return result;
	}
	/***
	 * 结束订单
	 * @param map
	 * @return
	 * @throws OrderException
	 */
	public int endOrder(Map<String, Object> map) throws OrderException {
		// TODO Auto-generated method stub
		Integer result = orderMapper.endOrder(map);
		System.out.println(result);
		if(result == 0) {
			throw new OrderException("取消订单失敗！");
		}
		System.out.println("取消订单状态"+result);
		return result;
	}
	/***
	 * 管理员
	 * 查询用户所有订单
	 * @param map
	 * @return
	 */
	public Map<String, Object> searchManagerAllUserOrder(Map<String, Object> map) {
		Integer pageNumber = Integer.valueOf((String) map.get("page"));
		Integer pageSize = Integer.valueOf((String) map.get("rows"));
		Map<String, Object> result = null;
		int startRow = 0; // 开始记录数
		Integer total = null; // 总记录数
		List<Map<String,Object>> rows = null; // 分页记录
		
		startRow = (pageNumber - 1) * pageSize; // 计算从第几条开始
		System.out.println("total"+total);
		total = orderMapper.countManagerAllUserOrder(map);
		System.out.println("5"+total);

		rows = orderMapper.searchManagerAllUserOrder(startRow, pageSize, map);
			
		result = new HashMap<String, Object>();
		result.put("total", total);
		result.put("rows", rows);

		
		return result;
	}
	
	/**
	 * 管理员
	 * 查询所有待审核订单
	 * @param map
	 * @return
	 */
	public Map<String, Object> searchManagerAllUserCheckingOrder(Map<String, Object> map) {
		Integer pageNumber = Integer.valueOf((String) map.get("page"));
		Integer pageSize = Integer.valueOf((String) map.get("rows"));
		Map<String, Object> result = null;
		int startRow = 0; // 开始记录数
		Integer total = null; // 总记录数
		List<Map<String,Object>> rows = null; // 分页记录
		
		startRow = (pageNumber - 1) * pageSize; // 计算从第几条开始
		System.out.println("total"+total);
		total = orderMapper.countManagerAllUserCheckingOrder(map);
		System.out.println("5"+total);

		rows = orderMapper.searchManagerAllUserCheckingOrder(startRow, pageSize, map);
			
		result = new HashMap<String, Object>();
		result.put("total", total);
		result.put("rows", rows);

		
		return result;
	}
	public int ManagerAllUserCheckingOrderOn(Map<String, Object> map) throws OrderException {

		Integer result = orderMapper.ManagerAllUserCheckingOrderOn(map);
		System.out.println(result);
		if(result == 0) {
			throw new OrderException("取消订单失敗！");
		}
		System.out.println("取消订单状态"+result);
		return result;
		
		
	}
	/**
	 * 用户还车
	 * @param map
	 * @return
	 * @throws OrderException
	 */
	public int userEndOrder(Map<String, Object> map) throws OrderException {
		// TODO Auto-generated method stub
		System.out.println("service"+map);
		Integer result = orderMapper.userEndOrder(map);
		System.out.println(result);
		if(result == 0) {
			throw new OrderException("还车失敗！");
		}
		System.out.println("取消订单状态"+result);
		return result;
	}
	/**
	 * 用户续租
	 * @param map
	 * @return
	 * @throws OrderException 
	 */
	public int delayOrder(Map<String, Object> map) throws OrderException {
		// TODO Auto-generated method stub
		System.out.println("service"+map);
		Integer result = orderMapper.delayOrder(map);
		System.out.println(result);
		if(result == 0) {
			throw new OrderException("续租失敗！");
		}
		System.out.println("取消订单状态"+result);
		return result;
	}
	
	
	/**
	 * 用户提交还车申请列表
	 * @param map
	 * @return
	 */
	public Map<String, Object> searchManagerAllUserBackOrder(Map<String, Object> map) {
		Integer pageNumber = Integer.valueOf((String) map.get("page"));
		Integer pageSize = Integer.valueOf((String) map.get("rows"));
		Map<String, Object> result = null;
		int startRow = 0; // 开始记录数
		Integer total = null; // 总记录数
		List<Map<String,Object>> rows = null; // 分页记录
		
		startRow = (pageNumber - 1) * pageSize; // 计算从第几条开始
		System.out.println("total"+total);
		total = orderMapper.countManagerAllUserBackOrder(map);
		System.out.println("5"+total);

		rows = orderMapper.searchManagerAllUserBackOrder(startRow, pageSize, map);
			
		result = new HashMap<String, Object>();
		result.put("total", total);
		result.put("rows", rows);

		
		return result;
	}
	public Map<String, Object>  searchManagerAllUserOverTimeOrder(Map<String, Object> map) {
		// TODO Auto-generated method stub
		Integer pageNumber = Integer.valueOf((String) map.get("page"));
		Integer pageSize = Integer.valueOf((String) map.get("rows"));
		Map<String, Object> result = null;
		int startRow = 0; // 开始记录数
		Integer total = null; // 总记录数
		List<Map<String,Object>> rows = null; // 分页记录
		
		startRow = (pageNumber - 1) * pageSize; // 计算从第几条开始
		System.out.println("total"+total);
		total = orderMapper.countManagerAllUserOverTimeOrder(map);
		System.out.println("5"+total);

		rows = orderMapper.searchManagerAllUserOverTimeOrder(startRow, pageSize, map);
			
		result = new HashMap<String, Object>();
		result.put("total", total);
		result.put("rows", rows);

		
		return result;
	}
	public List<Order> selectOrderUpaingAndOvertimeOrder() {
		// TODO Auto-generated method stub
		System.out.println("uuuu");
		List<Order> result = orderMapper.selectOrderUpaingAndOvertimeOrder();;
		if(result.size() == 0) {
			throw new IllegalArgumentException("满足条件的订单信息！");
		}
		return result;
	}
	public int ManagerUpdateOrder(Map<String, Object> map) throws OrderException {
		// TODO Auto-generated method stub
		Integer result = orderMapper.ManagerUpdateOrder(map);
		System.out.println(result);
		if(result == 0) {
			throw new OrderException("删除订单失敗！");
		}
		System.out.println("删除订单状态"+result);
		return result;
	}

	
}
