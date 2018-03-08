package com.receiver;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.car.Car;
import com.car.CarException;
import com.order.OrderException;







@Service
public class ReceiverService {

	@Autowired
	ReceiverMapper receiverMapper;

	public List<Receiver> receiverListByUserId(Integer userId) {
		// TODO Auto-generated method stub
		List<Receiver> result = receiverMapper.receiverListByUserId(userId);
		if(result.size() == 0) {
			throw new IllegalArgumentException("取车人信息是空的,请新增取车人信息！");
		}
		return result;
	}

	/**
	 * 
	 * @param receiver
	 * @return
	 */
	public Receiver searchReceiverById(Receiver receiver) {
		// TODO Auto-generated method stub
		System.out.println("service"+receiver.toString());
		Receiver result = receiverMapper.searchReceiverById(receiver);	
		if (result == null) {
			throw new IllegalArgumentException("没有此条收货人信息");
		}
		System.out.println(result.toString());
		return result;
	}
	
	/**
	 * 新增取车人信息
	 * @param receiver
	 * @return
	 * @throws ReceiverException
	 */

	public int addReceiver(Receiver receiver) throws ReceiverException {
		int result = 0;	
		System.out.println("service"+receiver.toString());
		if(receiver.getIsDefault()){
			receiverMapper.cancelDefault(receiver.getU_id());
		}
		result= receiverMapper.addReceiver(receiver);	
			if(result==0){
				throw new ReceiverException("新增取车人信息失败！");
				
				}	
			System.out.println("receiverService注册结果"+result);
		
		return result;
		
	}
	/**
	 * 查询当前用户的取车人信息列表
	 * @param map
	 * @return
	 */
	public Map<String, Object> backSearchReceiverList(Map<String, Object> map) {
		System.out.println("service"+map);
		Integer pageNumber = Integer.valueOf((String) map.get("page"));
		Integer pageSize = Integer.valueOf((String) map.get("rows"));
		Map<String, Object> result = null;
		int startRow = 0; // 开始记录数
		Integer total = 0; // 总记录数
		List<Receiver> rows = null; // 分页记录

		startRow = (pageNumber - 1) * pageSize; // 计算从第几条开始
		System.out.println("total"+total);
		total = receiverMapper.countAllReceiverByUserId(map);
		System.out.println("5..."+total);

		rows = receiverMapper.backSearchReceiverList(startRow, pageSize, map);

		result = new HashMap<String, Object>();
		result.put("total", total);
		result.put("rows", rows);

		return result;
	}
	
	/**
	 * 根据Id删除取车人信息
	 * @param id
	 */
	public void receiverDeleteById(Integer id) {
		// TODO Auto-generated method stub
		System.out.println("service"+id);
		receiverMapper.receiverDeleteById(id);
		
	}


/**
 * 会员中心更新取车人信息
 * @param receiver
 * @return
 * @throws ReceiverException
 */
	public int backUpdateReceiver(Receiver receiver) throws ReceiverException {
		System.out.println("service"+receiver.toString());
		if(receiver.getIsDefault()){
			receiverMapper.cancelDefault(receiver.getU_id());
		}
		
		Integer result = receiverMapper.backUpdateReceiver(receiver);
		if(result == 0) {
			throw new ReceiverException("更新车辆信息失敗！");
		}
		return result;
	}

	

	

	

	


}
