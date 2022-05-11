package com.cdp.hanzoom.api.controller;

import com.cdp.hanzoom.api.request.*;
import com.cdp.hanzoom.api.response.PlanInChatRoomFindRes;
import com.cdp.hanzoom.api.response.UserRes;
import com.cdp.hanzoom.api.service.PlanService;
import com.cdp.hanzoom.api.service.UserService;
import com.cdp.hanzoom.common.auth.HanZoomUserDetails;
import com.cdp.hanzoom.common.model.response.BaseResponseBody;
import com.cdp.hanzoom.db.entity.Plan;

import com.cdp.hanzoom.db.entity.User;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;
import java.util.NoSuchElementException;

/**
 * 일정 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "일정 API", tags = {"Plan"})
@RestController
@RequestMapping("/api/plans")
public class PlanController {
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	@Autowired
	PlanService planService;

	@Autowired
	UserService userService;

	// 일정 등록
	@PostMapping("/register")
	@ApiOperation(value = "일정 등록(token)", notes = "<strong>나눔/교환 하는 user와 받는 사람의</strong> 최종 약속장소, 날짜 시간, 상대방 이메일, 게시글 번호를 입력받아 일정을 등록 한다." )

	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<? extends BaseResponseBody> registerPlan(@ApiIgnore Authentication authentication,
			@RequestBody @ApiParam(value="회원가입 정보", required = true) PlanRegisterReq planRegisterReq) {
		HanZoomUserDetails userDetails = (HanZoomUserDetails)authentication.getDetails();
		String userEmail = userDetails.getUsername();
		planRegisterReq.setUserEmail(userEmail);
		Plan user = planService.registerPlan(planRegisterReq);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}

	// 채팅방에서 일정 조회시 상대방 위도 경도 조회
	@GetMapping("/chatroom/find/opponentLatAndLng")
	@ApiOperation(value = "채팅방에서 일정 조회시 상대방 위도 경도 조회", notes = "채팅방에서 일정 조회시 상대방 위도 경도 조회를 한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<UserRes> getChatRoomInOpponentLatAndLng(@RequestParam(value = "opponentEmail", required = false) String opponentEmail) {
		User user = userService.getUserByUserEmail(opponentEmail);
		return ResponseEntity.status(200).body(UserRes.of(user));
	}
	
	// 채팅방에서 일정 확인 조회
	@GetMapping("/chatroom/find/{boardNo}")
	@ApiOperation(value = "채팅방에서 [일정 확인] 버튼으로 조회", notes = "채팅방에서 일정 확인을 조회한다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<PlanInChatRoomFindRes> getChatRoomInPlan(@PathVariable Long boardNo) {
		Plan plan = planService.getPlanByBoardNo(boardNo);
		return ResponseEntity.status(200).body(PlanInChatRoomFindRes.of(plan));
	}

	// 채팅방에서 일정이 잡혔는지 안 잡혔는지 체크
	@GetMapping("/chatroom/checkPlan/{boardNo}")
	@ApiOperation(value = "채팅방에서 일정이 잡혔는지 안 잡혔는지 체크", notes = "채팅방에서 일정이 잡혔는지 안 잡혔는지 체크 <br/>"+
			"<strong> 잡혔으면 true 안 잡혔으면 false </strong>")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<Boolean> checkUserPlan(@PathVariable Long boardNo) {
		Plan plan = planService.getPlanByBoardNo(boardNo);
		if(plan !=null) return ResponseEntity.status(200).body(true);
		return ResponseEntity.status(200).body(false);
	}
	// 마이 페이지에서 일정 조회
	@GetMapping("/mypage/find")
	@ApiOperation(value = "마이 페이지에서 일정 조회(token)", notes = "<strong>마이 페이지에 일정 <strong>목록 조회를 약속 잡은 시간 내림차순으로 조회</strong> 한다.</strong>한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<List<PlanInChatRoomFindRes>> getUserPlanList(@ApiIgnore Authentication authentication) {
		UserDetails userDetails = (UserDetails) authentication.getDetails();
		String userEmail = userDetails.getUsername();
		List<PlanInChatRoomFindRes> userPlanFindRes = planService.findByPlanList(userEmail);

		return new ResponseEntity<List<PlanInChatRoomFindRes>>(userPlanFindRes, HttpStatus.OK);
	}

	// 일정 정보 수정
	@ApiOperation(value = "일정 정보 수정 (약속 장소(위도, 경도), 약속 날짜 시간) (token)", notes = "일정 정보 수정 (약속 장소(위도, 경도), 약속 날짜 시간)<br/>"
			+"<strong> 위도, 경도만 수정하고 싶으면 약속 날짜 시간 = null 로 담아 요청</strong><br/>"+
			"<strong> 약속 날짜 시간만 수정하고 싶으면 (위도= null,경도 = null) 로 담아 요청</strong> ")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "해당 회원 없음")})
	@PutMapping("/update")
	public ResponseEntity<String> updatePlan(@RequestBody PlanUpdateReq planUpdateReq, @ApiIgnore Authentication authentication) throws Exception {
		User user = null;
		HanZoomUserDetails userDetails = (HanZoomUserDetails)authentication.getDetails();
		String userEmail = userDetails.getUsername();
		Plan plan ;
		try {
			plan = planService.getPlanByBoardNo(planUpdateReq.getBoardNo());
		}catch(NoSuchElementException E) {
			System.out.println("일정 수정 실패");
			return  ResponseEntity.status(500).body("해당 하는 정보가 없어서 일정 수정 실패");
		}
		planService.updatePlan(plan, planUpdateReq);
		System.out.println("일정 정보 수정 성공");
		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
	}

	// 거래 완료 버튼 클릭시 -> 해당 게시글 상태 거래 완료로 변경.
	@ApiOperation(value = "거래 완료 버튼 클릭 시 해당 게시글 상태 '거래 완료'로 변경", notes = "<strong> 채팅방 안의 일정 확인 버튼을 누른 뒤 <br/>" +
			" '거래 완료 버튼'을 클릭 시 해당 게시글 상태 '거래 완료'로 변경.</strong> ")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "해당 회원 없음")})
	@PutMapping("/update/boardStatus/{boardNo}")
	public ResponseEntity<String> updateBoardStatus(@PathVariable Long boardNo, @ApiIgnore Authentication authentication) throws Exception {
		User user = null;
		HanZoomUserDetails userDetails = (HanZoomUserDetails)authentication.getDetails();
		String userEmail = userDetails.getUsername();
		try {
			user = userService.getUserByUserEmail(userEmail); // user 정보를 조회 token 가지고
		} catch(Exception e) {
			return new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
		}
		boolean state = planService.updateBoardStatus(user, boardNo);
		if(state == true ){
			System.out.println("해당 게시글 상태 '거래 완료로' 수정 성공");
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		}
		return new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
	}
	

//	일정 취소(삭제) 기능
	@ApiOperation(value = "일정 취소(token)", notes = "일정 취소(삭제) 기능")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "해당 회원 없음")})
	@DeleteMapping("/remove/{boardNo}")
	public ResponseEntity<String> deletePlan(@PathVariable Long boardNo, @ApiIgnore Authentication authentication) throws Exception {
		User user = null;
		boolean result;
		HanZoomUserDetails userDetails = (HanZoomUserDetails)authentication.getDetails();
		String userEmail = userDetails.getUsername();
		try {
			user = userService.getUserByUserEmail(userEmail); // user 정보를 조회 token 가지고
			Plan plan = planService.CheckPlanByBoardNoAndUserEmail(user, boardNo);
			result = planService.deleteByPlan(plan);
		}catch(Exception E) {
			return  ResponseEntity.status(500).body("일정을 잡은 사람이 아닌 경우 또는 해당 일정 없어서 일정 삭제 실패");
		}
		return ResponseEntity.status(200).body("일정 삭제 성공");
	}
}
