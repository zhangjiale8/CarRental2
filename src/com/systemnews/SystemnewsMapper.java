package com.systemnews;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;


public interface SystemnewsMapper {
	/**
	 * 新闻列表
	 * 前台
	 * @return
	 */
	public List<Systemnews> searchSystemnewsList();
	/***
	 * 根据id查询新闻详情
	 * @param map
	 * @return
	 */

	public Systemnews selectNewsById(@Param("map")Map<String, Object> map);
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
	 * 后台新增新闻
	 * @param map
	 * @return
	 */
	public int addnews(@Param("map") Map<String, Object> map);

	
	

	
}
