package com.cdp.hanzoom.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.Email;

/**
 * 유저 회원가입 API ([POST]/api/users) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ToString
@ApiModel("UserRegisterRequest")
public class UserRegisterReq {

	@ApiModelProperty(name="유저 NickName", example="컷텝")
	private String userNickname;

	@ApiModelProperty(name="유저 Email", example="ssafy@naver.com")
	private String userEmail;

	@ApiModelProperty(name="유저 Password", example="ssafy11!")
	private String userPassword;
}
