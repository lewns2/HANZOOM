package com.cdp.hanzoom.api.controller;

import com.cdp.hanzoom.api.response.IngredientRes;
import com.cdp.hanzoom.api.response.UserIngredientFindRes;
import com.cdp.hanzoom.api.service.IngredientService;
import com.cdp.hanzoom.db.entity.Ingredient;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

/**
 * 식재료 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "유저 식재료 API", tags = {"Ingredient"})
@RestController
@RequestMapping("/api/ingredient")
public class IngredientController {
    @Autowired
    IngredientService ingredientService;

    /**
     * 식재료 전체 조회
     **/
    @GetMapping("/findAll")
    @ApiOperation(value = "식재료 전체 조회", notes = "<strong>모든 식재료 정보</strong>를 조회한다.")
    @ApiResponses({@ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")})
    public ResponseEntity<List<IngredientRes>> findAllIngredient() {
        List<IngredientRes> ingredientResList = ingredientService.findAllIngredient();
        return new ResponseEntity<List<IngredientRes>>(ingredientResList, HttpStatus.OK);

    }
}