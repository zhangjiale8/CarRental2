package com.car;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;


public interface CarMapper {
	

	//新增汽车
	public int addCar(@Param("map") Map<String, Object> map);
	public Integer countCar(@Param("map")Map<String, Object> map);
	//加载汽车列表
	public List<Car> searchCarList(@Param("startRow")int startRow, @Param("pageSize")Integer pageSize, @Param("map") Map<String, Object> map);
	//更新某条用户信息
	public Integer updateCar(@Param("map") Map<String, Object> map);
	//删除汽车信息
	public void carDelete(Integer id);
	/***
	 * 获取可租赁汽车
	 * @return
	 */
	public List<Car> searchAllRentableCarList();
	//根据id查询车辆信息
	public Car selectCarById(@Param("id")Integer id);
	/**
	 * 根据车牌号码查询车辆信息
	 * 2016.0511
	 * @param map
	 * @return
	 */
	public Car searchCarByLicense(@Param("map") Map<String, Object> map);
	public Integer update_c_status(@Param("map")Map<String, Object> map);
	public Carlevel selectdepositById(@Param("map")Map<String, Object> map);
	/**
	 * 用户
	 * 根据车牌号码更新车辆状态
	 * @param map
	 * @return
	 */
	public Integer updateCarStatus(@Param("map")Map<String, Object> map);
	/**
	 * 获取押金和扣费
	 * @param map
	 * @return
	 */
	public Carlevel tackDepositAndfine(@Param("map")Map<String, Object> map);
	/***
	 * 用户条件查询
	 * 车辆
	 * @param map
	 * @return
	 */
	public List<Car> searchCarListByCondition(@Param("map")Map<String, Object> map);
	/**
	 * 获取车辆信息，根据车牌号
	 * @param map
	 * @return
	 */
	/*public Car searchCarInfoByLicense(@Param("map")Map<String, Object> map);*/
	/**
	 * 根据车辆id更新车辆状态
	 * @param map
	 * @return
	 */
	public Integer updateCarStatusByCarId(@Param("map")Map<String, Object> map);
	
	

	
}
