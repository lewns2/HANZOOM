package com.cdp.hanzoom.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.ToString;

import java.util.List;

@Data
@ToString
@ApiModel("RecipeFindRes")
public class RecipeFindRes {
    @ApiModelProperty(name="recipeNo")
    Long recipeNo;
    @ApiModelProperty(name="referenceNo")
    Long referenceNo;
    @ApiModelProperty(name="imagePath")
    String imagePath;
    @ApiModelProperty(name="recipeName")
    String recipeName;
    @ApiModelProperty(name="ingredients")
    List<RecipeIngredientsRes> ingredients;
    @ApiModelProperty(name="recipe")
    List<RecipeRecipeRes> recipe;
}
