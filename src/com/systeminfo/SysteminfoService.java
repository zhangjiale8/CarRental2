package com.systeminfo;



import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.car.CarException;
import com.order.Order;






@Service
public class SysteminfoService {

	@Autowired
	SysteminfoMapper systeminfoMapper;

	/**
	 * 前台
	 * 根据id查询新闻信息
	 * @param map
	 * @return
	 */
	public Systeminfo selectNewsById(Map<String, Object> map) {
		System.out.println("service"+map.toString());
		Systeminfo result = systeminfoMapper.selectNewsById(map);	
		if (result == null) {
			throw new IllegalArgumentException("没有此新闻信息");
		}
		System.out.println(result.toString());
		return result;
	}
	/**
	 * 后台查询未读系统信息
	 * @param map
	 * @return
	 */
	public Map<String, Object> searchSystemInfoUnReaded(Map<String, Object> map) {
		System.out.println("service"+map);
		Integer pageNumber = Integer.valueOf((String) map.get("page"));
		Integer pageSize = Integer.valueOf((String) map.get("rows"));
		Map<String, Object> result = null;
		int startRow = 0; // 开始记录数
		Integer total = null; // 总记录数
		List<Systeminfo> rows = null; // 分页记录
		
		startRow = (pageNumber - 1) * pageSize; // 计算从第几条开始
		total = systeminfoMapper.countSystemInfoUnReaded(map);
		System.out.println("5"+total);

		rows = systeminfoMapper.searchSystemInfoUnReaded(startRow, pageSize, map);
			
		result = new HashMap<String, Object>();
		result.put("total", total);
		result.put("rows", rows);

		
		return result;
		
	}
	
	/**
	 * 后台查询已读系统信息
	 * @param map
	 * @return
	 */
	public Map<String, Object> searchSystemInfoReaded(Map<String, Object> map) {
		System.out.println("service"+map);
		Integer pageNumber = Integer.valueOf((String) map.get("page"));
		Integer pageSize = Integer.valueOf((String) map.get("rows"));
		Map<String, Object> result = null;
		int startRow = 0; // 开始记录数
		Integer total = null; // 总记录数
		List<Systeminfo> rows = null; // 分页记录
		
		startRow = (pageNumber - 1) * pageSize; // 计算从第几条开始
		total = systeminfoMapper.countSystemInfoReaded(map);
		System.out.println("5"+total);

		rows = systeminfoMapper.searchSystemInfoReaded(startRow, pageSize, map);
			
		result = new HashMap<String, Object>();
		result.put("total", total);
		result.put("rows", rows);

		
		return result;
		
	}
	

	public void newsDel(Map<String, Object> map) {
		// TODO Auto-generated method stub
		System.out.println("service"+map);
		systeminfoMapper.newsDel(map);
	}

	

	/**
	 * 新增系统信息
	 * @param map
	 * @return
	 * @throws SysteminfoException
	 */
	public int addSystemInfo(Map<String, Object> map) throws SysteminfoException {
		// TODO Auto-generated method stub
		int result=0;
		System.out.println("addSystemInfo"+map);
		result = systeminfoMapper.addSystemInfo(map);
		if(result==0){
			throw new SysteminfoException("新增消息提醒失败！");
		}
		
		return result;
	}
	/**
	 * 前台获取信消息列表
	 * @param map
	 * @return
	 */
	public List<Systeminfo> getSysteminfoByUserId(Map<String, Object> map) {
		// TODO Auto-generated method stub
		//System.out.println("99999");
		System.out.println("service...getSysteminfoByUserId"+map);
		List<Systeminfo> result = systeminfoMapper.getSysteminfoByUserId(map);
		/*if(result.size() == 0) {
			throw new IllegalArgumentException("不存在新闻信息！");
		}*/
		return result;
	}
	/**
	 * 后台删除系统信息
	 * @param id
	 */
	public void searchSystemInfoDel(Integer id) {
		// TODO Auto-generated method stub
		System.out.println("service"+id);
		systeminfoMapper.searchSystemInfoDel(id);
	}
	public int SystemInfoUpdate(Integer id) {
		// TODO Auto-generated method stub
		System.out.println("service"+id);
		int result =0 ;
		result = systeminfoMapper.SystemInfoUpdate(id);
		if(result==0){
			throw new IllegalArgumentException("更新系统信息失败！");
		}
		return result;
	}

	

	/*public Map<String, Object> searchSystemnewsList() {
		
		// TODO Auto-generated method stub
		
		System.out.println("99999");
		System.out.println("service");
		Map<String, Object> result = null;
		List<Map<String,Object>> rows = systeminfoMapper.searchSystemnewsList();
		if(rows.size() == 0) {
			throw new IllegalArgumentException("不存在新闻信息！");
		}
		
		result = new HashMap<String, Object>();
		result.put("rows", rows);
		return result;
}*/
	

}
