package com.cdp.hanzoom.api.service;

import com.cdp.hanzoom.api.request.*;
import com.cdp.hanzoom.db.entity.User;
import com.cdp.hanzoom.db.repository.UserRepository;
import com.cdp.hanzoom.db.repository.UserRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.Optional;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("userService")
public class UserServiceImpl implements UserService {
	@Autowired
    UserRepository userRepository;
	
	@Autowired
    UserRepositorySupport userRepositorySupport;
	
	@Autowired
	@Lazy
	PasswordEncoder passwordEncoder;

	@Autowired
	S3FileUploadService s3FileUploadService;

	@Override
	public User registerUser(UserRegisterReq userRegisterInfo) {
		System.out.println("debug " + userRegisterInfo.toString());
		User user = new User();
		user.setUserEmail(userRegisterInfo.getUserEmail());
		user.setUserNickname(userRegisterInfo.getUserNickname());
		// 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
		user.setUserPassword(passwordEncoder.encode(userRegisterInfo.getUserPassword()));
		return userRepository.save(user);
	}

	@Override
	public User getUserByUserEmail(String userEmail) {
		// 디비에 유저 정보 조회 (userId 를 통한 조회).
		User user = userRepositorySupport.findUserByUserEmail(userEmail).get();
		return user;
	}

	@Override
	public User getUser(UserFindPasswordReq userFindPasswordReq) {
		String userEmail = userFindPasswordReq.getUserEmail();
		String userNickname = userFindPasswordReq.getUserNickname();
		User user = userRepositorySupport.findUserByUserNicknameAndUserEmail(userEmail, userNickname).orElse(null);
		return user;
	}

	@Override
	public boolean checkUserNickName(String userNickname) {
		System.out.println("닉네임 체크 함수 들어옴??>> "+ userNickname);
		return userRepositorySupport.findByUserNicknameEquals(userNickname);
	}

	@Override
	public User getUserByUserNickName(String userNickname) {
		// 디비에 유저 정보 조회 (userNickname 를 통한 조회).
		System.out.println(">>>>>>>>>>>>>>>>>>>>>>>> userNickname : " + userNickname);
		Optional<User> user = userRepositorySupport.findUserByUserNickname(userNickname);
		if(user.isPresent()) {
			System.out.println("data : " + user.get());
			return user.get();
		} else {
			return null;
		}
	}
	@Transactional
	@Override
	public User updateUserProfile(User user, MultipartFile imagePath) throws Exception {
		// 프로필 이미지 수정시 업로드
		if(imagePath != null) {
			String savingFileName = s3FileUploadService.upload(imagePath);
			// user 테이블 프로필 이미지 경로 수정
			user.updateProfileImage(savingFileName);
		}
		// 수정된 데이터 가져오기
		return getUserByUserEmail(user.getUserEmail());
	}

	@Transactional
	@Override
	public void updateUser(User user, UserUpdateReq updateUserDto) {
		// 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
		String password = passwordEncoder.encode(updateUserDto.getUserPassword());
		user.updateUser(updateUserDto.getUserNickname(), password);
	}
	@Transactional
	@Override
	public void updateUserLatAndLng(User user, UserUpdateLatAndLngReq updateUserLatAndLngDto) {
		user.updateUserLatAndLng(updateUserLatAndLngDto.getLat(), updateUserLatAndLngDto.getLng());
	}


	// 회원 탈퇴
	@Override
	public boolean deleteByUserEmail(User user) {
		userRepository.delete(user);
		return true;
	}

	@Override
	public boolean checkUserEmail(String userEmail) {
		System.out.println("이메일 체크 함수 들어옴??>> "+ userEmail);
		return userRepositorySupport.findByUserEmailEquals(userEmail);
	}

}
