package com.cdp.hanzoom.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@ApiModel("UserIngredientFindAllResponse")
public class UserIngredientFindRes {
    @ApiModelProperty(name="식재료 번호")
    Long ingredientNo;

    @ApiModelProperty(name="식재료 이름")
    String ingredientName;

    @ApiModelProperty(name="유저 이메일")
    String userEmail;

    @ApiModelProperty(name="종류")
    String type;

    @ApiModelProperty(name="구매일")
    LocalDate purchaseDate;

    @ApiModelProperty(name="유통기한")
    LocalDate expirationDate;

    @ApiModelProperty(name="게시글 번호")
    Long boardNo;
}
