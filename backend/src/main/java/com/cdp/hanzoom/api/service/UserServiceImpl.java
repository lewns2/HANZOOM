package com.cdp.hanzoom.api.service;

import com.cdp.hanzoom.db.entity.User;
import com.cdp.hanzoom.db.repository.UserRepository;
import com.cdp.hanzoom.db.repository.UserRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cdp.hanzoom.api.request.UserRegisterReq;

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
	PasswordEncoder passwordEncoder;
	
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
}
