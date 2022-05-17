package com.cdp.hanzoom.api.controller;

import com.cdp.hanzoom.api.request.PendingIngredientReq;
import com.cdp.hanzoom.api.request.UserReportHistoryUpdateReq;
import com.cdp.hanzoom.api.response.PendingIngredientRes;
import com.cdp.hanzoom.api.response.PendingIngredientTokenRes;
import com.cdp.hanzoom.api.response.UserReportHistoryFindAllRes;
import com.cdp.hanzoom.api.response.UserRes;
import com.cdp.hanzoom.api.service.UserIngredientService;
import com.cdp.hanzoom.api.service.UserReportHistoryService;
import com.cdp.hanzoom.api.service.UserService;
import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

/**
 * 관리자 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "관리자 API", tags = {"Admin"})
@RestController
@RequestMapping("/api/admin")
public class AdminController {
    public static final Logger logger = LoggerFactory.getLogger(UserIngredientController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    UserService userService;

    @Autowired
    UserReportHistoryService userReportHistoryService;

    @Autowired
    UserIngredientService userIngredientService;

    /** 유저 전체 조회 **/
    @GetMapping("/findAll/user")
    @ApiOperation(value ="유저 전체 조회", notes = "<strong>유저 정보</strong>를 전체 조회한다.")
    @ApiResponses({ @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류") })
    public ResponseEntity<List<UserRes>> findAllUser() {
        List<UserRes> userResList = userService.getAllUser();
        return new ResponseEntity<List<UserRes>>(userResList, HttpStatus.OK);
    }

    /** 유저 신고 관련 **/
    /** 유저 신고 내용 전체 조회 **/
    @GetMapping("/findAll/userReportHistory")
    @ApiOperation(value ="유저 신고 기록 전체 조회", notes = "<strong>유저 신고 기록</strong>을 전체 조회한다.")
    @ApiResponses({ @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류") })
    public ResponseEntity<List<UserReportHistoryFindAllRes>> findAllUserReportHistory() {
        List<UserReportHistoryFindAllRes> userReportHistoryFindAllResList = userReportHistoryService.findAllUserReportHistory();

        return new ResponseEntity<List<UserReportHistoryFindAllRes>>(userReportHistoryFindAllResList, HttpStatus.OK);
    }

    /** 유저 신고 상태 수정 **/
    @PutMapping("/update/userReportHistoryStatus")
    @ApiOperation(value = "유저 신고 상태 정보 수정", notes = "관리자가 <strong>유저 신고 상태 정보</strong>를 수정한다." +
            "관리자는 <strong>승인</strong> 또는 <strong>거절</strong>을 한다. 승인 시 피신고자의 신고 횟수는 1 증가하고, 거절 시 피신고자의 신고 횟수는 1 감소한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<String> updateUserReportHistoryStatus(@RequestBody @ApiParam(value = "유저 신고 상태 정보 수정", required = true) UserReportHistoryUpdateReq userReportHistoryUpdateReq) {

        try {
            userReportHistoryService.updateStatus(userReportHistoryUpdateReq);
        } catch(NoSuchElementException E) {
            return  ResponseEntity.status(500).body("해당 유저 신고 기록이 없어서 유저 신고 상태 정보 수정 실패");
        }
        return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
    }

    /** 식재료 등록 요청 관련 **/
    /** 식재료 등록 요청 전체 목록 **/
    @GetMapping("/findAll/pendingIngredient")
    @ApiOperation(value ="식재료 등록 요청 전체 조회", notes = "<strong>식재료 등록 요청 전체 목록</strong>을 조회한다.")
    @ApiResponses({ @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류") })
    public ResponseEntity<List<PendingIngredientTokenRes>> findAllPendingIngredient() {
        List<PendingIngredientTokenRes> pendingIngredientResList = userIngredientService.findAllPendingIngredient();
        return new ResponseEntity<List<PendingIngredientTokenRes>>(pendingIngredientResList, HttpStatus.OK);
    }

    /** 유저 식재료 등록 요청 상태 수정 **/
    @PutMapping("/update/userIngredientStatus")
    @ApiOperation(value = "유저 식재료 등록 요청 상태 수정", notes = "관리자가 <strong>유저 식재료 등록 요청 상태 정보</strong>를 수정한다." +
            "관리자는 <strong>승인</strong> 또는 <strong>거절</strong>을 한다. 승인 시 status는 일반으로 변경되며, 거절 시 해당 식재료 정보는 유저 식재료 목록에서 삭제된다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<String> updateUserIngredientStatus(@RequestBody @ApiParam(value = "유저 신고 상태 정보 수정", required = true) PendingIngredientReq pendingIngredientReq) {

        try {
            userIngredientService.updateUserIngredientStatus(pendingIngredientReq);
        } catch(NoSuchElementException E) {
            return  ResponseEntity.status(500).body("해당 유저 신고 기록이 없어서 유저 신고 상태 정보 수정 실패");
        }
        return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
    }
}
