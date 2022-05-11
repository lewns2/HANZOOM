package com.cdp.hanzoom.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@ApiModel("PendingIngredientResponse")
public class PendingIngredientRes {
    @ApiModelProperty(name = "요청 번호")
    Long requestNo;

    @ApiModelProperty(name = "요청자")
    String requestor;

    @ApiModelProperty(name = "식재료 명")
    String ingredientName;

    @ApiModelProperty(name="종류")
    String type;

    @ApiModelProperty(name="구매일")
    LocalDate purchaseDate;

    @ApiModelProperty(name="유통기한")
    LocalDate expirationDate;

    @ApiModelProperty(name="처리상태")
    String status;
}
