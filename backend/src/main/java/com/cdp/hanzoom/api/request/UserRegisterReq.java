package com.cdp.hanzoom.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 회원가입 API ([POST]/api/users) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("UserRegisterRequest")
public class UserRegisterReq {
	@ApiModelProperty(name="유저 Email", example="ssafy_web")
	String userEmail;
	@ApiModelProperty(name="유저 Password", example="your_password")
	String userPassword;
}
