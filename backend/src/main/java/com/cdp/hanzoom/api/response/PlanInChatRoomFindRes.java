package com.cdp.hanzoom.api.response;

import com.cdp.hanzoom.db.entity.Plan;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * 채팅방 안에서의 일정 정보 조회 API ([GET] /api/plans/chatroom/find/{boardNo}) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("PlanInChatRoomFindResponse")
public class PlanInChatRoomFindRes {
	@ApiModelProperty(name="Schedule No")
	Long scheduleNo; // 시퀀스 일정 번호

	@ApiModelProperty(name="Schedule Datetime")
	LocalDateTime scheduleDatetime; // 일정 날짜 시간

	@ApiModelProperty(name="lat")
	Double lat;   // 최종 약속 장소 위도

	@ApiModelProperty(name="lng")
	Double lng;  // 최종 약속 장소 경도

	@ApiModelProperty(name="Opponent")
	String opponent; // 상대방 이메일 ( 나눔/ 교환 받는자)

	@ApiModelProperty(name="Board No")
	Long boardNo; // 게시글 번호

	@ApiModelProperty(name="User Email")
	String userEmail; // (나눔/ 교환) 하는자 이메일
	public static PlanInChatRoomFindRes of(Plan plan) {
		PlanInChatRoomFindRes res = new PlanInChatRoomFindRes();
		res.setScheduleNo(plan.getScheduleNo());
		res.setScheduleDatetime(plan.getScheduleDatetime());
		res.setLat(plan.getLat());
		res.setLng(plan.getLng());
		res.setOpponent(plan.getOpponent());
		res.setBoardNo(plan.getBoardNo());
		res.setUserEmail(plan.getUser().getUserEmail());
		return res;
	}
}
