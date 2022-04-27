package com.cdp.hanzoom.api.controller;

import com.cdp.hanzoom.api.request.UserIngredientRegisterReq;
import com.cdp.hanzoom.api.request.UserIngredientUpdateReq;
import com.cdp.hanzoom.api.response.UserIngredientFindRes;
import com.cdp.hanzoom.api.service.UserIngredientService;
import com.cdp.hanzoom.common.auth.HanZoomUserDetails;
import com.cdp.hanzoom.common.model.response.BaseResponseBody;
import com.cdp.hanzoom.db.entity.UserIngredient;
import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;
import java.util.NoSuchElementException;

/**
 * 유저 식재료 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "유저 식재료 API", tags = {"UserIngredient"})
@RestController
@RequestMapping("/api/userIngredient")
public class UserIngredientController {
    public static final Logger logger = LoggerFactory.getLogger(UserIngredientController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    UserIngredientService userIngredientService;

    /** 유저 식재료 등록 **/
    @PostMapping("/register")
    @ApiOperation(value = "유저 식재료 등록(token)", notes = "<strong>유저 식재료</strong>를 등록한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> registerIngredient(@RequestBody @ApiParam(value="유저 식재료 정보", required = true) UserIngredientRegisterReq userIngredientRegisterReq, @ApiIgnore Authentication authentication) {
        HanZoomUserDetails userDetails = (HanZoomUserDetails) authentication.getDetails();
        String userEmail = userDetails.getUsername();

        UserIngredient userIngredient;
        try {
            userIngredientService.registerUserIngredient(userIngredientRegisterReq, userEmail);
        } catch (Exception e) {
            e.printStackTrace();
            ResponseEntity.status(400).body(BaseResponseBody.of(500, "DB Transaction Failed"));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    /** 유저 식재료 전체 조회 **/
    @GetMapping("/findAll")
    @ApiOperation(value ="유저 식재료 전체 조회(token)", notes = "유저의 <strong>식재료 정보</strong>를 전체 조회한다.")
    @ApiResponses({ @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류") })
    public ResponseEntity<List<UserIngredientFindRes>> findUserIngredient(@ApiIgnore Authentication authentication) {
        HanZoomUserDetails userDetails = (HanZoomUserDetails) authentication.getDetails();
        String userEmail = userDetails.getUsername();

        List<UserIngredientFindRes> userIngredientFindResList = userIngredientService.findAllUserIngredient(userEmail);
        return new ResponseEntity<List<UserIngredientFindRes>>(userIngredientFindResList, HttpStatus.OK);
    }

    /** ingredientNo과 userEmail에 따른 유저 식재료 조회 **/
    @GetMapping("/find/{ingredientName}")
    @ApiOperation(value ="유저 식재료 정보 조회(token)", notes = "<strong>식재료 번호(ingredientNo)과 유저 이메일</strong>을 이용하여 유저 식재료 정보를 조회한다.")
    @ApiResponses({ @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류") })
    public ResponseEntity<UserIngredientFindRes> findByIngredientNameAndUserEmail(@PathVariable("ingredientNo") String ingredientNo, @ApiIgnore Authentication authentication) {
        HanZoomUserDetails userDetails = (HanZoomUserDetails) authentication.getDetails();
        String userEmail = userDetails.getUsername();

        UserIngredientFindRes userIngredientFindRes = userIngredientService.findByIngredientNameAndUserEmail(ingredientNo, userEmail);
        return new ResponseEntity<UserIngredientFindRes>(userIngredientFindRes, HttpStatus.OK);
    }

    /** 유저 식재료 수정 **/
    @PutMapping("/update")
    @ApiOperation(value = "유저 식재료 정보 수정(token)", notes = "<strong>유저 식재료 정보</strong>를 수정한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<String> updateUserIngredient(@RequestBody @ApiParam(value="유저 식재료 수정 정보", required = true) UserIngredientUpdateReq userIngredientUpdateReq, @ApiIgnore Authentication authentication) {
        HanZoomUserDetails userDetails = (HanZoomUserDetails) authentication.getDetails();
        String userEmail = userDetails.getUsername();

        UserIngredient userIngredient;
        try {
            userIngredient = userIngredientService.findUserIngredientByIngredientNoAndUserEmail(userIngredientUpdateReq.getIngredientNo(), userEmail);
            userIngredientService.updateUserIngredient(userIngredientUpdateReq, userIngredient);
        } catch(NoSuchElementException E) {
            return  ResponseEntity.status(500).body("해당 유저 식재료 정보가 없어서 유저 식재료 정보 수정 실패");
        }
        return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
    }

    /** 유저 식재료 삭제 **/
    @DeleteMapping("/remove/{ingredientNo}")
    @ApiOperation(value = "유저 식재료 정보 삭제(token)", notes = "<strong>식재료 번호</strong>를 통해 유저 식재료 정보를 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<String> deleteUserIngredient(@PathVariable("ingredientNo") Long ingredientNo, @ApiIgnore Authentication authentication) {
        HanZoomUserDetails userDetails = (HanZoomUserDetails) authentication.getDetails();
        String userEmail = userDetails.getUsername();

        UserIngredient userIngredient;
        try {
            userIngredient = userIngredientService.findUserIngredientByIngredientNoAndUserEmail(ingredientNo, userEmail);
            userIngredientService.deleteUserIngredient(userIngredient);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body("Bad Request");
        }
        return ResponseEntity.status(200).body("Success");
    }
}
