package com.cdp.hanzoom.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

/**
 * 유저 식재료 API ([POST] /api/userIngredient) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@ApiModel("PendingIngredientRequest")
public class PendingIngredientReq {
    @ApiModelProperty(name = "요청 번호", example = "1")
    private Long requestNo;

    @ApiModelProperty(name = "처리 상태", example = "승인")
    private String result;
}
