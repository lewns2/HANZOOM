package com.cdp.hanzoom.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor /** Cannot construct instance of~ error를 해결해주었다.  파라미터가 없는 생성자 만들어줌* */
@ApiModel("UserUpdateRequest")
public class UserUpdateReq {
	@ApiModelProperty(name = "유저 Nickname")
	private String userNickname;

	@ApiModelProperty(name = "유저 Password")
	private String userPassword;
}
