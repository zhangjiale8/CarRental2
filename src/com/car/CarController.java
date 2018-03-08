package com.car;

import java.util.Map;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.base.Controller_;





@Controller
public class CarController extends Controller_ {

	@Autowired
	CarService carService;
	
	
	
	/**
	 * 增加汽车
	 * @param session
	 * @return
	 * 先查询是否存在该汽车，存在就不能再添加，在前台提示，不存在就新增
	 */
	@ResponseBody
	@RequestMapping(value = "/addCar.ctrl", produces = "application/json")
	public Map<String, Object> addCar(@RequestBody Map<String, Object> map) {
		System.out.println("addCar.ctrl");
		System.out.println(map.get("license"));
		String error = null;
		Object object = null;
		int result=0;
		try {
			Car car = carService.searchCarByLicense(map);
			
			System.out.println((car!=null)+"是否已存在这个车牌号，当为ture存在，false不存在");
			if(car==null){
				
				result = carService.addCar(map);
				System.out.println("Controller注册返回结果"+result);
			}
			
		}catch (CarException c) {
			log.controller().error("CarController.addCar({},{})", c);
			error = c.getMessage();
		}
		catch (Exception e) {
			log.controller().error("CarController.addCar({},{})", e);
			error = e.getMessage();
		}
		object=result;
		System.out.println("返回结果为1是添加成功  此时返回结果："+result);
		return result(error, object);
	}

	
	
	/**
	 * 车辆信息列表
	 * @param page：当前页页号
	 * @param rows：每页显示的记录数
	 * @param map：记录页面传到后台的数据
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/searchAllCar.ctrl")
	public Map<String, Object> searchCarList(@RequestParam Map<String, Object> map) {
		System.out.println(map);
		System.out.println("55555进入controller");
		String error = null;
		Object object = null;

		try {
			object = carService.searchAllCar(map);
		}
		catch (Exception e) {
			error = e.getMessage();
		}

		return result(error, object);

	}
	/**
	 * 异步加载车辆信息列表
	 * @param page：当前页页号
	 * @param rows：每页显示的记录数
	 * @param map：记录页面传到后台的数据
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/searchAllRentableCarList.ctrl")
	public Map<String, Object> searchAllRentableCarList() {
		
		System.out.println("55555进入controller");
		String error = null;
		Object object = null;
		
		try {
			object = carService.searchAllRentableCarList();
		}
		catch (Exception e) {
			error = e.getMessage();
		}
		
		return result(error, object);
		
	}
	
	/**
	 * 更新汽车信息
	 * 
	 */
	@ResponseBody
	@RequestMapping(value = "/car/updateCar.ctrl", produces = "application/json")
	public Map<String, Object> updateCar(@RequestBody Map<String, Object> map) {
		System.out.println(map);
		System.out.println("car/updateCar.ctrl");
		String error = null;
		Object object = null;
		int result =0;
		try {
			result = carService.updateCar(map);
			
			
		}catch (CarException c) {
		//	log.controller().error("UserController.updateCar({},{})", c);
			error = c.getMessage();
		}
		catch (Exception e) {
		//	log.controller().error("UserController.updateCar({},{})", e);
			error = e.getMessage();
		}
		object=result;
		System.out.println("返回结果为1是修改成功此时返回结果："+result);
		return result(error, object);
		
	}

	/**
	 * 根据用户姓名删除用户信息
	 * 
	 */
	@ResponseBody
	@RequestMapping(value = "/removeCar.ctrl", produces = "application/json")
	public Map<String, Object> removeUser( Map<String, String> map) {
		String error = null;
		Object object = null;
		int result =0;
		try {
			result = carService.removeCar(map.get("username"));
			
			
		}catch (CarException c ) {
			log.controller().error("UserController.removeCar({},{})", c);
			error = c.getMessage();
		}
		catch (Exception e) {
			log.controller().error("UserController.removeCar({},{})", e);
			error = e.getMessage();
		}
		object=result;
		System.out.println("返回结果为1是删除成功此时返回结果："+result);
		return result(error, object);
		
	}
	
	/**
	 * 保存表单
	 * @param session
	 * @return
	 * 删除汽车信息
	 */
	@ResponseBody
	@RequestMapping(value = "car/delete.ctrl", produces = "application/json")
	public Map<String, Object> carDelete(Integer id) {
		System.out.println("nnnn"+id);
		System.out.println("car/delete.ctrl");
		String error = null;
		Object object = null;
		try {
			carService.carDelete(id);
		
			object = "ok";
		}
		catch (Exception e) {
			error = e.getMessage();
		}
		return result(error, object);
	}
	
	
	/**
	 * @param car id
	 */
	@ResponseBody
	@RequestMapping("/car/selectCarById.ctrl")
	public Map<String, Object> selectCarById( @RequestBody Car carInfo) {
		System.out.println(carInfo.getId());
		String error = null;
		Object object = null;
			try {
				object = carService.selectCarById(carInfo.getId());
				System.out.println(object.toString());
			}
			catch (IllegalStateException i) {
				error = i.getMessage();
			}
			catch (Exception e) {
				error = e.getMessage();
			}
		
		return result(error, object);
	}
	
	/**
	 * @param c_level
	 */
	@ResponseBody
	@RequestMapping("/car/selectdepositById.ctrl")
	public Map<String, Object> selectdepositById( @RequestBody Map<String, Object> map) {
		System.out.println("CarController"+map);
		String error = null;
		Object object = null;
			try {
				object = carService.selectdepositById(map);
				System.out.println(object.toString());
			}
			catch (IllegalStateException i) {
				error = i.getMessage();
			}
			catch (Exception e) {
				error = e.getMessage();
			}
		
		return result(error, object);
	}
	
	/**
	 * 2015
	 * 更新汽车信息状态
	 * 
	 */
	@ResponseBody
	@RequestMapping(value = "/car/updateCarStatus.ctrl", produces = "application/json")
	public Map<String, Object> updateCarStatus(@RequestBody Map<String, Object> map) {
		System.out.println(map);
		System.out.println("car/updateCarStatus.ctrl");
		String error = null;
		Object object = null;
		int result =0;
		try {
			result = carService.updateCarStatus(map);
			
			
		}catch (CarException c) {
		//	log.controller().error("UserController.updateCar({},{})", c);
			error = c.getMessage();
		}
		catch (Exception e) {
		//	log.controller().error("UserController.updateCar({},{})", e);
			error = e.getMessage();
		}
		object=result;
		System.out.println("返回结果为1是修改成功此时返回结果："+result);
		return result(error, object);
		
	}
	
	/**
	 * 根据车牌号码查询车的押金和扣费
	 * @param map
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/car/tackDepositAndfine.ctrl", produces = "application/json")
	public Map<String, Object> tackDepositAndfine(@RequestBody Map<String, Object> map) {
		System.out.println(map);
		System.out.println("car/tackDepositAndfine.ctrl");
		String error = null;
		Object object = null;
		
		try {
			Carlevel carlevel = carService.tackDepositAndfine(map);
			object = carlevel;
						
		}catch (CarException c) {
		//	log.controller().error("UserController.updateCar({},{})", c);
			error = c.getMessage();
		}
		catch (Exception e) {
		//	log.controller().error("UserController.updateCar({},{})", e);
			error = e.getMessage();
		}
		
		return result(error, object);
		
	}
	
	
	/**
	 * 用户条件查询，车辆
	 * @param map
	 * @return
	 */
	
	@ResponseBody
	@RequestMapping(value = "/car/searchCarListByCondition.ctrl", produces = "application/json")
	public Map<String, Object> searchCarListByCondition(@RequestBody Map<String, Object> map) {
		
		System.out.println("car/searchCarListByCondition.ctrl");
		System.out.println(map);
		String error = null;
		Object object = null;
		
		try {
			object = carService.searchCarListByCondition(map);
		}
		catch (Exception e) {
			error = e.getMessage();
		}
		
		return result(error, object);
		
	}
	
	/**
	 * 根据车牌号码获取车辆信息
	 * @param map
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/car/getCarInfo.ctrl", produces = "application/json")
	public Map<String, Object> getCarInfo(@RequestBody Map<String, Object> map) {
		System.out.println(map);
		System.out.println("car/getCarInfo.ctrl");
		String error = null;
		Object object = null;
		Car result=null;
		try {
			result = carService.getCarInfo(map);
			
			
		}catch (CarException c) {
		//	log.controller().error("UserController.updateCar({},{})", c);
			error = c.getMessage();
		}
		catch (Exception e) {
		//	log.controller().error("UserController.updateCar({},{})", e);
			error = e.getMessage();
		}
		object=result;
		System.out.println("返回结果为1是修改成功此时返回结果："+result);
		return result(error, object);
		
	}
	
	/**
	 * 根据车辆id更新车辆状态
	 * @param map
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/car/updateCarStatusByCarId.ctrl", produces = "application/json")
	public Map<String, Object> updateCarStatusByCarId(@RequestBody Map<String, Object> map) {
		System.out.println(map);
		System.out.println("car/updateCarStatusByCarId.ctrl");
		String error = null;
		Object object = null;
		int result =0;
		try {
			result = carService.updateCarStatusByCarId(map);
			
			
		}catch (CarException c) {
		//	log.controller().error("UserController.updateCar({},{})", c);
			error = c.getMessage();
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
