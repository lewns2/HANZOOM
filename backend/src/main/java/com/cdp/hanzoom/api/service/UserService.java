package com.cdp.hanzoom.api.service;

import com.cdp.hanzoom.api.request.*;
import com.cdp.hanzoom.api.response.UserLikeListFindRes;
import com.cdp.hanzoom.api.response.UserRes;
import com.cdp.hanzoom.db.entity.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {
	User registerUser(UserRegisterReq userRegisterInfo); // 회원 가입
	User getUserByUserEmail(String userEmail);
	User getUserByUserNickName(String userNickname);
	User updateUserProfile(User user, MultipartFile imagePath) throws Exception;
	void updateUser(User user, UserUpdateReq updateUserDto); // 회원 닉넴, 비번 수정.
	void updateUserLatAndLng(User user,  UserUpdateLatAndLngReq updateUserLatAndLngDto); // 사용자 약속 만남 장소 위도, 경도 수정 기능.
	User getUser(UserFindPasswordReq userFindPasswordReq);
	boolean checkUserEmail(String userEmail); // 이메일 중복 체크
	boolean checkUserNickName(String userNickname); // 닉네임 중복 체크
	boolean deleteByUserEmail(User user);//  회원 탈퇴
	List<UserRes> getAllUser();	// 회원 전체 목록 조회
	/** 내가 찜한 목록 리스트 반환**/
	List<UserLikeListFindRes> findLikeListByUserId(String userEmail);
}