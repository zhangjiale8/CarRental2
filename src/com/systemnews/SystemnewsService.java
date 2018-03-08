package com.systemnews;



import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.car.CarException;
import com.order.Order;






@Service
public class SystemnewsService {

	@Autowired
	SystemnewsMapper systemnewsMapper;

	/**
	 * 
	 * 新闻列表
	 * @return
	 */
	public List<Systemnews> searchSystemnewsList() {
		
			// TODO Auto-generated method stub
			
			System.out.println("99999");
			System.out.println("service");
			List<Systemnews> result = systemnewsMapper.searchSystemnewsList();
			if(result.size() == 0) {
				throw new IllegalArgumentException("不存在新闻信息！");
			}
			return result;
	}

	/**
	 * 前台
	 * 根据id查询新闻信息
	 * @param map
	 * @return
	 */
	public Systemnews selectNewsById(Map<String, Object> map) {
		System.out.println("service"+map.toString());
		Systemnews result = systemnewsMapper.selectNewsById(map);	
		if (result == null) {
			throw new IllegalArgumentException("没有此新闻信息");
		}
		System.out.println(result.toString());
		return result;
	}

	public Map<String, Object> searchAllnews(Map<String, Object> map) {
		Integer pageNumber = Integer.valueOf((String) map.get("page"));
		Integer pageSize = Integer.valueOf((String) map.get("rows"));
		Map<String, Object> result = null;
		int startRow = 0; // 开始记录数
		Integer total = null; // 总记录数
		List<Map<String,Object>> rows = null; // 分页记录
		
		startRow = (pageNumber - 1) * pageSize; // 计算从第几条开始
		total = systemnewsMapper.countAllnews(map);
		System.out.println("5"+total);

		rows = systemnewsMapper.searchAllnews(startRow, pageSize, map);
			
		result = new HashMap<String, Object>();
		result.put("total", total);
		result.put("rows", rows);

		
		return result;
		
	}

	public void newsDel(Map<String, Object> map) {
		// TODO Auto-generated method stub
		System.out.println("service"+map);
		systemnewsMapper.newsDel(map);
	}

	public int updatenews(Map<String, Object> map) throws SystemnewsException {
		System.out.println("newsservice"+map);
		Integer result = systemnewsMapper.updatenews(map);
		if(result == 0) {
			throw new SystemnewsException("更新车辆信息失敗！");
		}
		return result;
	}

	public int addnews(Map<String, Object> map) throws SystemnewsException {
		int result=0;
		System.out.println("addnews"+map);
		System.out.println("addnews注册");
		result = systemnewsMapper.addnews(map);
		System.out.println("CarService注册结果"+map);
		if(result==0){
			throw new SystemnewsException("新增新闻失败");
		}
		
		return result;
	}

	/*public Map<String, Object> searchSystemnewsList() {
		
		// TODO Auto-generated method stub
		
		System.out.println("99999");
		System.out.println("service");
		Map<String, Object> result = null;
		List<Map<String,Object>> rows = systemnewsMapper.searchSystemnewsList();
		if(rows.size() == 0) {
			throw new IllegalArgumentException("不存在新闻信息！");
		}
		
		result = new HashMap<String, Object>();
		result.put("rows", rows);
		return result;
}*/
	

}
