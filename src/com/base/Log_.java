package com.base;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

@Service
public class Log_ {

	private static Logger controllerLogger = LogManager.getLogger("controller");
	private static Logger serviceLogger = LogManager.getLogger("service");

	public Logger controller() {
		return controllerLogger;
	}

	public Logger service() {
		return serviceLogger;
	}

	public Logger getLogger(String name) {
		// TODO Auto-generated method stub
		return LogManager.getLogger(name);
	}
}
