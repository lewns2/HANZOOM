package com.cdp.hanzoom.api.service;

import com.cdp.hanzoom.db.entity.User;
import com.cdp.hanzoom.api.request.UserRegisterPostReq;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {
	User createUser(UserRegisterPostReq userRegisterInfo);
	User getUserByUserId(String userId);
}
