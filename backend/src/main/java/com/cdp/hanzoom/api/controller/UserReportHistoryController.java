package com.cdp.hanzoom.api.controller;

import com.cdp.hanzoom.api.request.UserReportHistoryRegisterReq;
import com.cdp.hanzoom.api.response.UserIngredientFindRes;
import com.cdp.hanzoom.api.response.UserReportHistoryFindAllRes;
import com.cdp.hanzoom.api.service.UserReportHistoryService;
import com.cdp.hanzoom.common.auth.HanZoomUserDetails;
import com.cdp.hanzoom.common.model.response.BaseResponseBody;
import com.cdp.hanzoom.db.entity.UserIngredient;
import com.cdp.hanzoom.db.entity.UserReportHistory;
import com.cdp.hanzoom.db.repository.UserReportHistoryRepository;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

/**
 * 유저 신고 기록 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "유저 식재료 API", tags = {"UserReportHistory"})
@RestController
@RequestMapping("/api/userReportHistory")
public class UserReportHistoryController {

    @Autowired
    UserReportHistoryService userReportHistoryService;

    @Autowired
    UserReportHistoryRepository userReportHistoryRepository;

    /** 유저 신고 내용 등록 **/
    @PostMapping("/register")
    @ApiOperation(value = "유저 신고 내용 등록(token)", notes = "<strong>유저가 다른 유저를 신고한 내용</strong>을 등록한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> registerUserReportHistory(@RequestBody @ApiParam(value="유저 신고 정보", required = true) UserReportHistoryRegisterReq userReportHistoryRegisterReq, @ApiIgnore Authentication authentication) {
        HanZoomUserDetails userDetails = (HanZoomUserDetails) authentication.getDetails();
        String userEmail = userDetails.getUsername();

        UserReportHistory userReportHistory;
        try {
            userReportHistoryService.registerUserReportHistory(userReportHistoryRegisterReq, userEmail);
        } catch (Exception e) {
            e.printStackTrace();
            ResponseEntity.status(400).body(BaseResponseBody.of(500, "DB Transaction Failed"));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    /** 유저 신고 내용 전체 조회 **/
    @GetMapping("/findAll")
    @ApiOperation(value ="유저 신고 기록 전체 조회", notes = "<strong>유저 신고 기록</strong>을 전체 조회한다.")
    @ApiResponses({ @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류") })
    public ResponseEntity<List<UserReportHistoryFindAllRes>> findAllUserReportHistory() {
        List<UserReportHistoryFindAllRes> userReportHistoryFindAllResList = userReportHistoryService.findAllUserReportHistory();

        return new ResponseEntity<List<UserReportHistoryFindAllRes>>(userReportHistoryFindAllResList, HttpStatus.OK);
    }

    /** 유저 신고 내용 삭제 **/
    @DeleteMapping("/remove/{reportNo}")
    @ApiOperation(value = "유저 신고 내용 삭제", notes = "<strong>유저 신고 번호(reportNo)</strong>를 통해 유저 신고 내용을 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<String> deleteUserReportHistory(@PathVariable("reportNo") Long reportNo) {

        UserReportHistory userReportHistory;
        try {
            userReportHistory = userReportHistoryRepository.findById(reportNo).orElse(null);
            userReportHistoryService.deleteUserReportHistory(userReportHistory);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body("Bad Request");
        }
        return ResponseEntity.status(200).body("Success");
    }




}
