package com.cdp.hanzoom.api.response;

import com.cdp.hanzoom.db.entity.User;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import java.time.LocalDateTime;

/**
 * 회원 본인 정보 조회 API ([GET] /api/users/me) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("UserResponse")
public class UserRes{
	@ApiModelProperty(name="User Email")
	String userEmail;

	@ApiModelProperty(name="User Nickname")
	String userNickname;

	@ApiModelProperty(name="User Image")
	String userImage; // 프로필 이미지 경로

	@ApiModelProperty(name="lat")
	Double lat;   // 위도

	@ApiModelProperty(name="lng")
	Double lng;  // 경도

	@ApiModelProperty(name="User JoinDate")
	LocalDateTime joinDate; // 가입일

	@ApiModelProperty(name="Reported Number")
	Integer reportedNumber;	// 신고당한 횟수

	public static UserRes of(User user) {
		UserRes res = new UserRes();
		res.setUserEmail(user.getUserEmail());
		res.setUserNickname(user.getUserNickname());
		res.setUserImage(user.getUserImage());
		res.setLat(user.getLat());
		res.setLng(user.getLng());
		res.setJoinDate(user.getJoinDate());
		res.setReportedNumber(user.getReportedNumber());
		return res;
	}
}
