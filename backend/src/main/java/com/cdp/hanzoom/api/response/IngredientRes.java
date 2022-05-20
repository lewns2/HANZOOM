package com.cdp.hanzoom.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ApiModel("IngredientResponse")
public class IngredientRes {
    @ApiModelProperty(name="식재료 번호")
    Long ingredientNo;

    @ApiModelProperty(name="식재료 이름")
    String ingredientName;
}
