package com.systeminfo;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;


public interface SysteminfoMapper {
	/**
	 * 新闻列表
	 * 前台
	 * @return
	 */
	public List<Systeminfo> searchSystemnewsList();
	/***
	 * 根据id查询新闻详情
	 * @param map
	 * @return
	 */

	public Systeminfo selectNewsById(@Param("map")Map<String, Object> map);
	/***
	 * 计算新闻数
	 * @param map
	 * @return
	 */
	public Integer countAllnews(@Param("map")Map<String, Object> map);
	/**
	 * 查询新闻列表
	 * 后台
	 * @param startRow
	 * @param pageSize
	 * @param map
	 * @return
	 */
	public List<Map<String, Object>> searchAllnews(@Param("startRow") int startRow, @Param("pageSize") Integer pageSize, @Param("map") Map<String, Object> map);
	/**
	 * 后台删除新闻
	 * @param map
	 */
	public void newsDel(@Param("map")Map<String, Object> map);
	/**
	 * 后台更新新闻
	 * @param map
	 * @return
	 */
	public Integer updatenews(@Param("map")Map<String, Object> map);
	/**
	 * 新增消息提醒
	 * @param map
	 * @return
	 */
	public int addSystemInfo(@Param("map")Map<String, Object> map);
	/**
	 * 前台
	 * 根据Id获取信息列表
	 * @param map
	 * @return
	 */
	public List<Systeminfo> getSysteminfoByUserId(@Param("map")Map<String, Object> map);
	/**
	 * 后台
	 * 计算未读的信息数
	 * @param map
	 * @return
	 */
	public Integer countSystemInfoUnReaded(@Param("map")Map<String, Object> map);
	/**
	 * 后台查询未读系统信息列表
	 * @param startRow
	 * @param pageSize
	 * @param map
	 * @return
	 */
	public List<Systeminfo> searchSystemInfoUnReaded(@Param("startRow")int startRow, @Param("pageSize")Integer pageSize, @Param("map") Map<String, Object> map);
	
	/**
	 * 后台
	 * 计算已读的信息数
	 * @param map
	 * @return
	 */
	public Integer countSystemInfoReaded(@Param("map")Map<String, Object> map);
	/**
	 * 后台查询已读系统信息列表
	 * @param startRow
	 * @param pageSize
	 * @param map
	 * @return
	 */
	public List<Systeminfo> searchSystemInfoReaded(@Param("startRow")int startRow, @Param("pageSize")Integer pageSize, @Param("map") Map<String, Object> map);
	/**
	 * 删除系统信息
	 * @param id
	 */
	public void searchSystemInfoDel(@Param("id")Integer id);
	/**
	 * 标记未读信息为已读
	 * @param id
	 * @return
	 */
	public int SystemInfoUpdate(@Param("id")Integer id);
	

	
	

	
}
