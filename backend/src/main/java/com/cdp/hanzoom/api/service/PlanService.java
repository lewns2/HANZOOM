package com.cdp.hanzoom.api.service;

import com.cdp.hanzoom.api.request.*;
import com.cdp.hanzoom.api.response.PlanInChatRoomFindRes;
import com.cdp.hanzoom.api.response.UserLikeListFindRes;
import com.cdp.hanzoom.db.entity.Plan;
import com.cdp.hanzoom.db.entity.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 *	일정 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface PlanService {
	/** 일정 등록 **/
	Plan registerPlan(PlanRegisterReq planRegisterReq);

	/** 채팅방에서 일정 조회 **/
	Plan getPlanByBoardNo(Long boardNo);

	/** 일정 수정 **/
	void updatePlan(Plan plan, PlanUpdateReq planUpdateReq);

	/** 해당 user의 일정이 있는지 체크 **/
	Plan CheckPlanByBoardNoAndUserEmail(User user,Long boardNo);

	/** 해당 게시글 상태 거래완료로 수정 **/
	Boolean updateBoardStatus(User user,Long boardNo);

	/** 일정 삭제 **/
	boolean deleteByPlan(Plan plan);
	/** 나의 일정 목록 리스트 반환**/
	List<PlanInChatRoomFindRes> findByPlanList(String userEmail);
}