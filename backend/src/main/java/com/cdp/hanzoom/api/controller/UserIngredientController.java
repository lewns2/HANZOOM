package com.cdp.hanzoom.api.controller;

import com.cdp.hanzoom.api.request.UserIngredientRegisterReq;
import com.cdp.hanzoom.api.request.UserIngredientTypeUpdateReq;
import com.cdp.hanzoom.api.response.MatchingRes;
import com.cdp.hanzoom.api.response.RecipeFindRes;
import com.cdp.hanzoom.api.response.UserIngredientBoardRes;
import com.cdp.hanzoom.api.response.UserIngredientFindRes;
import com.cdp.hanzoom.api.service.MatchingService;
import com.cdp.hanzoom.api.service.RecipeService;
import com.cdp.hanzoom.api.service.UserIngredientService;
import com.cdp.hanzoom.common.auth.HanZoomUserDetails;
import com.cdp.hanzoom.common.model.response.BaseResponseBody;
import com.cdp.hanzoom.db.entity.Recipe;
import com.cdp.hanzoom.db.entity.UserIngredient;
import com.cdp.hanzoom.db.repository.UserIngredientRepositorySupport;
import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    @Autowired
    RecipeService recipeService;
    @Autowired
    MatchingService matchingService;

    @Autowired
    UserIngredientRepositorySupport userIngredientRepositorySupport;

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
    @GetMapping("/find/{userIngredientNo}")
    @ApiOperation(value ="유저 식재료 상세정보 조회", notes = "<strong>유저 식재료 번호(userIngredientNo)과 유저 이메일</strong>을 이용하여 유저 식재료 상세 정보를 조회한다.")
    @ApiResponses({ @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류") })
    public ResponseEntity<UserIngredientFindRes> findByIngredientNameAndUserEmail(@PathVariable("userIngredientNo") Long userIngredientNo) {
        UserIngredientFindRes userIngredientFindRes = userIngredientService.findByUserIngredientNo(userIngredientNo);
        return new ResponseEntity<UserIngredientFindRes>(userIngredientFindRes, HttpStatus.OK);
    }

    /** 유저 식재료 수정 **/
    @PutMapping("/update")
    @ApiOperation(value = "유저 식재료 정보 수정", notes = "<strong>유저 식재료 정보</strong>를 수정한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<String> updateUserIngredient(@RequestBody @ApiParam(value="유저 식재료 수정 정보", required = true) UserIngredientTypeUpdateReq userIngredientTypeUpdateReq) {

        UserIngredient userIngredient;
        try {
//            userIngredient = userIngredientService.findByUserIngredientNo(userIngredientTypeUpdateReq.getUserIngredientNo());
            userIngredientService.updateUserIngredient(userIngredientTypeUpdateReq);
        } catch(NoSuchElementException E) {
            return  ResponseEntity.status(500).body("해당 유저 식재료 정보가 없어서 유저 식재료 정보 수정 실패");
        }
        return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
    }

//    /** 유저 식재료 등록 상태(status) 수정 **/
//    @PutMapping("/update/{userIngredientNo}")
//    @ApiOperation(value = "유저 식재료 등록 상태(status) 수정", notes = "<strong>유저 식재료 등록 상태 정보</strong>를 수정한다.")
//    @ApiResponses({
//            @ApiResponse(code = 200, message = "성공"),
//            @ApiResponse(code = 401, message = "인증 실패"),
//            @ApiResponse(code = 404, message = "사용자 없음"),
//            @ApiResponse(code = 500, message = "서버 오류")
//    })
//    public ResponseEntity<String> updateUserIngredientStatus(@PathVariable("userIngredientNo") Long userIngredientNo) {
//        try {
//            userIngredientService.updateUserIngredientStatus(userIngredientNo);
//        } catch(NoSuchElementException E) {
//            return  ResponseEntity.status(500).body("해당 유저 식재료 정보가 없어서 유저 식재료 정보 수정 실패");
//        }
//        return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
//    }

    /** 유저 식재료 삭제 **/
    @DeleteMapping("/remove/{userIngredientNo}")
    @ApiOperation(value = "유저 식재료 정보 삭제", notes = "<strong>유저 식재료 번호</strong>를 통해 유저 식재료 정보를 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<String> deleteUserIngredient(@PathVariable("userIngredientNo") Long userIngredientNo) {

        UserIngredient userIngredient;
        try {
            userIngredient = userIngredientRepositorySupport.findByUserIngredientNo(userIngredientNo).orElse(null);
            userIngredientService.deleteUserIngredient(userIngredient);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body("Bad Request");
        }
        return ResponseEntity.status(200).body("Success");
    }

    /** MY식재료 바탕으로 레시피 추천 **/
    @GetMapping("/recipe")
    @ApiOperation(value = "레시피 추천", notes = "<strong>레시피 추천</strong>한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<RecipeFindRes>> findRecipe(@RequestParam(value="ingredients", required = true) List<String> ingredients) {
        List<Recipe> recipeList = recipeService.findRecipeByIngredients(ingredients);
        List<RecipeFindRes> recipeFindResList = recipeService.findInfoRecipeByIngredient(recipeList);
        return new ResponseEntity<List<RecipeFindRes>>(recipeFindResList, HttpStatus.OK);
    }

    // 제한 거리 입력받아서
    /** 매칭 알고리즘 **/
    // 선택 매칭
    @GetMapping("/matching")
    @ApiOperation(value = "선택 매칭{token}", notes = "<strong>입력받은 거리와 식재료를 바탕으로 매칭된 결과를 조회</strong>한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<MatchingRes> matchingAlgorithm(
            @RequestParam(value="ingredients", required = true) List<String> ingredients
            , @RequestParam(value="distance", required = false) Double distance
            , @ApiIgnore Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getDetails();
        String userEmail = userDetails.getUsername();
        if(distance == null) distance = Double.valueOf(10);
        MatchingRes matchingList = matchingService.findMatchingList(userEmail, ingredients, distance);
        return new ResponseEntity<MatchingRes>(matchingList, HttpStatus.OK);
    }

    // 추천 레시피 바탕 자동 매칭
    @GetMapping("/recipe/matching")
    @ApiOperation(value = "자동 매칭{token}", notes = "<strong>입력받은 거리와 레시피 번호를 바탕으로 매칭된 결과를 조회</strong>한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<MatchingRes> recipeMatchingAlgorithm(
            @RequestParam(value="recipeNo", required = true) Long recipeNo
            , @RequestParam(value="distance", required = false) Double distance
            , @ApiIgnore Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getDetails();
        String userEmail = userDetails.getUsername();
        if(distance == null) distance = Double.valueOf(10);
        MatchingRes matchingList = matchingService.findRecipeMatchingList(userEmail, recipeNo, distance);
        return new ResponseEntity<MatchingRes>(matchingList, HttpStatus.OK);
    }

    /** 게시글 올라간 유저 식재료 정돈해서 보내기 **/
    @GetMapping("/board")
    @ApiOperation(value = "게시글 등록된 식재료{token}", notes = "<strong>게시글 등록된 식재료를 게시글 번호로 정리해 출력</strong>한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<UserIngredientBoardRes>> findUserIngredientSortingBoardNo (
            @ApiIgnore Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getDetails();
        String userEmail = userDetails.getUsername();
        List<UserIngredientBoardRes> userIngredientBoardResList = userIngredientService.findUserIngredientSortingBoardNo(userEmail);
        return new ResponseEntity<List<UserIngredientBoardRes>>(userIngredientBoardResList, HttpStatus.OK);
    }
}
