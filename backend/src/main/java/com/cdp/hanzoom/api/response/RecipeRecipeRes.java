package com.cdp.hanzoom.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@ApiModel("RecipeRecipeRes")
public class RecipeRecipeRes {
    @ApiModelProperty(name="description")
    String description;
    @ApiModelProperty(name="imagePath")
    String imagePath;
}
