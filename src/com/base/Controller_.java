package com.base;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

public abstract class Controller_ {

	@Autowired
	protected Log_ log;

	/**
	 * @param error 若失敗則有消息
	 * @param object 若成功則有對象
	 */
	protected Map<String, Object> result(String error, Object object) {
		Map<String, Object> result = new HashMap<String, Object>(2);
		// 若失敗則有消息
		if (error != null) {
			result.put("error", error);
			return result;
		}
		if (object != null) {
			result.put("object", object);
		}
		return result;
	}

}
