package com.cdp.hanzoom.api.service;

import com.cdp.hanzoom.api.response.RecipeFindRes;
import com.cdp.hanzoom.db.entity.Recipe;

import java.util.List;

public interface RecipeService {
    List<Recipe> findRecipeByIngredients(List<String> ingredients);
    List<RecipeFindRes> findInfoRecipeByIngredient(List<Recipe> recipeList);
}
