package com.manager;

public enum ManagerStatus {

	ACTIVATED("激活"), DEACTIVATED("停用");

	private final String value;

	private ManagerStatus(String value) {
		this.value = value;
	}

	public String getValue() {
		return value;
	}

}
