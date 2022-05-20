package com.cdp.hanzoom.api.service;

import com.cdp.hanzoom.api.request.*;
import com.cdp.hanzoom.api.response.PlanInChatRoomFindRes;
import com.cdp.hanzoom.db.entity.Board;
import com.cdp.hanzoom.db.entity.Plan;
import com.cdp.hanzoom.db.entity.User;
import com.cdp.hanzoom.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

/**
 *	일정 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("planService")
public class PlanServiceImpl implements PlanService {
	@Autowired
	PlanRepository planRepository;
	@Autowired
	BoardRepository boardRepository;
	@Autowired
    PlanRepositorySupport planRepositorySupport;

	@Transactional
	@Override
	public Plan registerPlan(PlanRegisterReq planRegisterReq) {
		Board board = boardRepository.findById(planRegisterReq.getBoardNo()).get();

		Plan plan = planRepository.save(planRegisterReq.toEntity());
		// 해당 게시글의 상태는 -> '거래중'으로 변경하기
		board.updateState("거래중");
		return plan;
	}

	@Transactional
	@Override
	public Plan getPlanByBoardNo(Long boardNo) {
		// 디비에 일정 정보 조회 (Plan 테이블에 boardNo 를 통한 조회).
		return planRepositorySupport.findPlanByBoardNo(boardNo).orElse(null);
	}

	@Transactional
	@Override
	public void updatePlan(Plan plan, PlanUpdateReq planUpdateReq) {
		// 최종 약속 장소, 약속 시간 둘다 변경이 들어올 때
		if(planUpdateReq.getLat() != null && planUpdateReq.getLng() != null
				&& planUpdateReq.getScheduleDatetime() != null)
		{
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
			LocalDateTime time = LocalDateTime.parse(planUpdateReq.getScheduleDatetime(), formatter);
			plan.updatePlan(planUpdateReq.getLat(),planUpdateReq.getLng(),time);
		}
		if(planUpdateReq.getScheduleDatetime() != null && planUpdateReq.getLat() == null
				&& planUpdateReq.getLng() == null)
		{ // 시간만 변경했을 때

			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
			LocalDateTime time = LocalDateTime.parse(planUpdateReq.getScheduleDatetime(), formatter);
			plan.updatePlanScheduleDatetime(time);
		}

		// 약속 장소만 변경했을 때
		if(planUpdateReq.getLat() != null && planUpdateReq.getLng() != null
				&& planUpdateReq.getScheduleDatetime() == null ){ //약속 장소만 변경 했을 때
			plan.updatePlanLatAndLng(planUpdateReq.getLat(),planUpdateReq.getLng());
		}
	}

	@Transactional
	@Override
	public Plan CheckPlanByBoardNoAndUserEmail(User user, Long boardNo) {
		Plan plan ;
		plan = planRepositorySupport.CheckPlanByBoardNoAndUserEmail(boardNo, user.getUserEmail()).orElse(null);
		if(plan != null) return plan;
		else {
			plan = planRepositorySupport.CheckPlanByBoardNoAndOpponentEmail(boardNo, user.getUserEmail()).orElse(null);
			return plan;
		}
	}

	@Transactional
	@Override
	public Boolean updateBoardStatus(User user, Long boardNo) {
		Plan plan= CheckPlanByBoardNoAndUserEmail(user, boardNo);
		if(plan != null){
			Board board = boardRepository.findById(boardNo).get();
			// 해당 게시글의 상태는 -> '거래완료'로 변경하기
			board.updateState("거래완료");
			return true;
		} else return false;
	}

	@Transactional
	@Override
	public boolean deleteByPlan(Plan plan) {
		// 해당 일정 삭제후 -> 해당 게시글 상태 거래전으로 변경.
		planRepository.delete(plan);
		Board board = boardRepository.findById(plan.getBoardNo()).get();
		board.updateState("거래전");
		return true;
	}

	@Transactional
	@Override
	public List<PlanInChatRoomFindRes> findByPlanList(String userEmail) {
		List<Plan> plans = planRepositorySupport.findPlanByMyEmailOrOpponentEmail(userEmail);
		List<PlanInChatRoomFindRes> userPlanlist = new ArrayList<PlanInChatRoomFindRes>();
		for(int i = 0 ; i< plans.size() ; i++){
			PlanInChatRoomFindRes planInChatRoomFindRes = new PlanInChatRoomFindRes();
			planInChatRoomFindRes.setScheduleNo(plans.get(i).getScheduleNo());
			planInChatRoomFindRes.setScheduleDatetime(plans.get(i).getScheduleDatetime());
			planInChatRoomFindRes.setLat(plans.get(i).getLat());
			planInChatRoomFindRes.setLng(plans.get(i).getLng());
			planInChatRoomFindRes.setOpponent(plans.get(i).getOpponent());
			planInChatRoomFindRes.setBoardNo(plans.get(i).getBoardNo());
			planInChatRoomFindRes.setUserEmail(plans.get(i).getUser().getUserEmail());

			userPlanlist.add(planInChatRoomFindRes); // 일정을 담은 객체를 리스트에 추가.
		}
		return userPlanlist; 
	}
}
