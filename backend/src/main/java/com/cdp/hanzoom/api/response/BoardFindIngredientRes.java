package com.cdp.hanzoom.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@ApiModel("BoardFindIngredientRes")
public class BoardFindIngredientRes {
    @ApiModelProperty(name="ingredient_name")
    String ingredientName;
    @ApiModelProperty(name="expiration_date")
    String expirationDate;
    @ApiModelProperty(name="purchase_date")
    String purchaseDate;
}
