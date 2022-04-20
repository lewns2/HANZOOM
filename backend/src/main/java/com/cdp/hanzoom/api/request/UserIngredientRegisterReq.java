package com.cdp.hanzoom.api.request;

import com.cdp.hanzoom.db.entity.UserIngredient;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import java.time.LocalDate;

/**
 * 유저 식재료 API ([POST] /api/userIngredient) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@ApiModel("UserIngredientRegisterRequest")
public class UserIngredientRegisterReq {
    @ApiModelProperty(name="식재료 Name", example="고구마")
    String ingredientName;

    @ApiModelProperty(name="식재료 유통기한", example="2022-01-01")
    String expirationDate;

}