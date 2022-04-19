package com.cdp.hanzoom.api.service;

import com.cdp.hanzoom.api.request.UserFindPasswordReq;
import com.cdp.hanzoom.api.request.UserUpdateLatAndLngReq;
import com.cdp.hanzoom.api.request.UserUpdateReq;
import com.cdp.hanzoom.db.entity.User;
import com.cdp.hanzoom.api.request.UserRegisterReq;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {
	User registerUser(UserRegisterReq userRegisterInfo); // 회원 가입
	User getUserByUserEmail(String userEmail);
	User getUserByUserNickName(String userNickname);
	void updateUser(User user, UserUpdateReq updateUserDto); // 회원 닉넴, 비번 수정.
	void updateUserLatAndLng(User user,  UserUpdateLatAndLngReq updateUserLatAndLngDto); // 사용자 약속 만남 장소 위도, 경도 수정 기능.
	User getUser(UserFindPasswordReq userFindPasswordReq);
	boolean checkUserEmail(String userEmail); // 이메일 중복 체크
	boolean checkUserNickName(String userNickname); // 닉네임 중복 체크
	boolean deleteByUserEmail(User user);//  회원 탈퇴
}