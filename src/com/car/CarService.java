package com.car;

import java.util.HashMap;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.order.Order;



@Service
public class CarService {

	@Autowired
	CarMapper carMapper;


//查询所有汽车的信息
	public Map<String, Object> searchAllCar(Map<String, Object> map) {
		// TODO Auto-generated method stub
		Integer pageNumber = Integer.valueOf((String) map.get("page"));
		Integer pageSize = Integer.valueOf((String) map.get("rows"));
		Map<String, Object> result = null;
		int startRow = 0; // 开始记录数
		Integer total = null; // 总记录数
		List<Car> rows = null; // 分页记录

		startRow = (pageNumber - 1) * pageSize; // 计算从第几条开始

		total = carMapper.countCar(map);
		System.out.println(total);

		rows = carMapper.searchCarList(startRow, pageSize, map);

		result = new HashMap<String, Object>();
		result.put("total", total);
		result.put("rows", rows);
		
		
		return result;
	}

	//更新车辆信息
	public int updateCar(Map<String, Object> map) throws CarException {
		// TODO Auto-generated method stub
		
		System.out.println("carservice"+map);
		Integer result = carMapper.updateCar(map);
		if(result == 0) {
			throw new CarException("更新车辆信息失敗！");
		}
		return result;
	}

	public int removeCar(String string) throws CarException {
		int result=0;
		// TODO Auto-generated method stub
		if(result == 0) {
			throw new CarException("更新用户資料失敗");
		}
		return result;
		
	}

	public void carDelete(Integer id) {
		// TODO Auto-generated method stub
		System.out.println("service"+id);
		carMapper.carDelete(id);
	}

	public List<Car>searchAllRentableCarList() {
		// TODO Auto-generated method stub
				System.out.println("99999");
				List<Car> result = carMapper.searchAllRentableCarList();;
				if(result.size() == 0) {
					throw new IllegalArgumentException("不存在汽车信息！");
				}
				return result;
				
	}

	public Car selectCarById(Integer id) {
		// TODO Auto-generated method stub
		Car result = carMapper.selectCarById(id);
		
		if (result == null) {
			throw new IllegalArgumentException("不存在这款汽车信息！");
		}
		System.out.println("result"+result.toString());
		return result;
	}
	//根据车牌号码查询车辆
	public Car searchCarByLicense(Map<String, Object> map) throws CarException {
		// TODO Auto-generated method stub
		System.out.println("searchCarByLicense"+map);
		Car car = carMapper.searchCarByLicense(map);
		if(car!=null){
			throw new CarException("汽车信息已存在，不可重复添加");
			
		}else{
			System.out.println("汽车信息不存在，可添加");
		}
		
		return car;
	}
	//新增汽车信息
	public int addCar(Map<String, Object> map) throws CarException {
		// TODO Auto-generated method stub
		
		int result=0;
		System.out.println("CarService注册");
		result = carMapper.addCar(map);
		System.out.println("CarService注册结果"+map);
		if(result==0){
			throw new CarException("新增汽车失败");
		}
		
		return result;
	}

	public Carlevel selectdepositById(Map<String, Object> map) throws CarException {
		System.out.println("carService"+map);
		Carlevel carlevel = carMapper.selectdepositById(map);
		if(carlevel==null){
			throw new CarException("不存在此汽车等级！");
			
		}else{
			System.out.println("汽车等级存在！，可添加");
		}
		System.out.println(carlevel.toString());
		return carlevel;
	}
	/**
	 * 更新车辆状态
	 * @param map
	 * @return
	 * @throws CarException 
	 */
	public int updateCarStatus(Map<String, Object> map) throws CarException {
		// TODO Auto-generated method stub
		System.out.println("carservice"+map);
		Integer result = carMapper.updateCarStatus(map);
		System.out.println("wwww"+result);
		if(result == 0) {
			throw new CarException("更新车辆状态失敗！");
		}
		return result;
	}

	public Carlevel tackDepositAndfine(Map<String, Object> map) throws CarException {
		// TODO Auto-generated method stub
		System.out.println("carservice"+map);
		Carlevel result = carMapper.tackDepositAndfine(map);
		System.out.println("wwww"+result);
		if(result == null) {
			throw new CarException("获取车辆等级信息失敗！");
		}
		return result;
	}

	public List<Car> searchCarListByCondition(Map<String, Object> map) {
		// TODO Auto-generated method stub
		
		System.out.println("99999");
		System.out.println("service"+map);
		List<Car> result = carMapper.searchCarListByCondition(map);;
		if(result.size() == 0) {
			throw new IllegalArgumentException("不存在汽车信息！");
		}
		return result;
	}

	public Car getCarInfo(Map<String, Object> map) throws CarException {
		// TODO Auto-generated method stub
		System.out.println("service。。。getCarInfo"+map);
		Car car = carMapper.searchCarByLicense(map);
		if(car==null){
			throw new CarException("获取车辆信息失败！");
			
		}else{
			System.out.println("汽车存在，可获取");
		}
		System.out.println(car.toString());
		return car;
	}
	/**
	 * 根据车辆id更新车辆状态
	 * @param map
	 * @return
	 * @throws CarException
	 */
	public int updateCarStatusByCarId(Map<String, Object> map) throws CarException {
		// TODO Auto-generated method stub
		System.out.println("carservice"+map);
		Integer result = carMapper.updateCarStatusByCarId(map);
		System.out.println("wwww"+result);
		if(result == 0) {
			throw new CarException("更新车辆状态失敗！");
		}
		return result;
	}

	



	
}
