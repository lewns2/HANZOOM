package com.cdp.hanzoom.api.request;

import com.cdp.hanzoom.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.Column;

/**
 * 카카오 유저 회원가입 API ([POST]/api/users) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ToString
@ApiModel("KaKaoUserRegisterRequest")
public class KaKaoUserRegisterReq {

	@ApiModelProperty(name="유저 NickName", example="컷텝")
	private String userNickname;

	@ApiModelProperty(name="유저 Email", example="ssafy@naver.com")
	private String userEmail;

	@ApiModelProperty(name="유저 Password", example="ssafy11!")
	private String userPassword;

	@ApiModelProperty(name="유저 이미지 경로")
	private String userImage; // 프로필 이미지 경로

	@ApiModelProperty(name="유저 신고 누적 횟수")
	private Integer reportedNumber;
}
