package com.base;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.user.User;

/**
 * 判斷是否有登錄
 */
public class LoggedInInterceptor implements HandlerInterceptor {

	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
	}

	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
	}

	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		// 如果是ajax请求响应头会有，x-requested-with；
		User user = (User) request.getSession().getAttribute("user");
		if (user == null) {
			//ajax请求
			if (request.getHeader("x-requested-with") != null && request.getHeader("x-requested-with").equalsIgnoreCase("XMLHttpRequest")) {
				response.setStatus(444);
				response.setContentType("application/json");
				response.setCharacterEncoding("UTF-8");
				response.getWriter().print("{\"error\":\"用户未登录，请先登录。\"}");
				response.flushBuffer();
			}else {	//form表单请求
				response.setContentType("application/json");
				response.setCharacterEncoding("UTF-8");
				response.getWriter().print("{\"errorCode\":444}");
				response.flushBuffer();
			}
			return false;
		}

		return true;
	}

}
