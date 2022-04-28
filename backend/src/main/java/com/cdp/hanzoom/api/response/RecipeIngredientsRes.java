package com.cdp.hanzoom.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@AllArgsConstructor
@ApiModel("RecipeIngredientsRes")
public class RecipeIngredientsRes {
    @ApiModelProperty(name="ingredient_name")
    String name;
    @ApiModelProperty(name="ingredient_weight")
    String weight;
}
