package com.user;

public enum UserStatus {

	ACTIVATED("激活"), DEACTIVATED("停用");

	private final String value;

	private UserStatus(String value) {
		this.value = value;
	}

	public String getValue() {
		return value;
	}

}
