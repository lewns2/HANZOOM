package com.cdp.hanzoom.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor /** Cannot construct instance of~ error를 해결해주었다.  파라미터가 없는 생성자 만들어줌* */
@ApiModel("UserUpdateLatAndLngRequest")
public class UserUpdateLatAndLngReq {
	@ApiModelProperty(name = "유저 만날 장소 위도")
	private Double lat;

	@ApiModelProperty(name = "유저가 만날 장소 경도")
	private Double lng;
}
