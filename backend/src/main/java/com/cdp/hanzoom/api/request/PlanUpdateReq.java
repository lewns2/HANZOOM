package com.cdp.hanzoom.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@ApiModel("PlanUpdateRequest")
public class PlanUpdateReq {
	@ApiModelProperty(name="일정 날짜 시간", example="2022-05-02 01:35:00")
	String scheduleDatetime;

	@ApiModelProperty(name = "최종 유저 만날 장소 위도")
	private Double lat;

	@ApiModelProperty(name = "최종 유저가 만날 장소 경도")
	private Double lng;

	@ApiModelProperty(name="게시글 번호")
	Long boardNo;
}
