package com.cdp.hanzoom.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
@ApiModel("BoardFindIngredientRes")
public class BoardFindIngredientRes {
    @ApiModelProperty(name="ingredient_name")
    String ingredientName;
    @ApiModelProperty(name="expiration_date")
    String expirationDate;
}
