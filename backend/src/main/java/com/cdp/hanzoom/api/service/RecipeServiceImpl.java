package com.cdp.hanzoom.api.service;

import com.cdp.hanzoom.api.response.RecipeFindRes;
import com.cdp.hanzoom.api.response.RecipeIngredientsRes;
import com.cdp.hanzoom.api.response.RecipeRecipeRes;
import com.cdp.hanzoom.db.entity.Recipe;
import com.cdp.hanzoom.db.repository.RecipeRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service("recipeService")
public class RecipeServiceImpl implements RecipeService{

    @Autowired
    RecipeRepositorySupport recipeRepositorySupport;

    @Override
    public List<Recipe> findRecipeByIngredients(List<String> ingredients) {
        List<Recipe> recipes = recipeRepositorySupport.findRecipeByIngredients(ingredients);
        return recipes;
    }

    @Override
    public List<RecipeFindRes> findInfoRecipeByIngredient(List<Recipe> recipeList) {
        // 사용자 MY 식재료에서 일반 식재료 중 선택한 식재료가 포함된 추천 레시피 담을 리스트 초기화
        List<RecipeFindRes> recipeFindResList = new ArrayList<RecipeFindRes>(); 
        for(Recipe recipe : recipeList) {
            RecipeFindRes res = new RecipeFindRes();
            res.setRecipeNo(recipe.getRecipeNo()); // 레시피 번호
            res.setReferenceNo(recipe.getReferenceNo()); // 참고사이트 번호
            res.setImagePath(recipe.getImagePath().substring(1,recipe.getImagePath().length()-1)); // 대표 이미지 URL
            res.setRecipeName(recipe.getRecipeName().substring(1,recipe.getRecipeName().length()-1)); // 레시피명 
            // '\\' 두개를 공백으로 치환 등 데이터와, 기타 리스트 형태 감싸져 있는 부분 제거.
            String ingredients = recipe.getIngredients().replace("[","").replace("]","").replace("'","").replace("\\\\ufeff","");
            ingredients = ingredients.substring(1,ingredients.length()-1);
            String ingredient[] = ingredients.split(",");
            List<RecipeIngredientsRes> recipeIngredients = new ArrayList<RecipeIngredientsRes>();
            // name, 무게 리스트에 저장해 두는 부분
            for(int i=0; i< ingredient.length; i+=2) {
                recipeIngredients.add(new RecipeIngredientsRes(ingredient[i], ingredient[i+1]));
            }
            res.setIngredients(recipeIngredients);
            String recipeSet[] = recipe.getRecipe().substring(1,recipe.getRecipe().length()-1).replace("\\\\ufeff","").split("\\], \\[");
            // 추천 레시피 이미지 경로 와, 해당 이미지에 대한 설명을 담을 RecipeRecipeRes 타입 리스트 초기화.
            List<RecipeRecipeRes> recipeRecipes = new ArrayList<RecipeRecipeRes>();
            for(int i=0; i<recipeSet.length; i++) {
                String recipeSetReplace[] = recipeSet[i].replace("[","").replace("]","").replace("'","").split(",");
                System.out.println(Arrays.toString(recipeSetReplace));
                String description = "";
                for(int j=0; j< recipeSetReplace.length-1; j++) {
                    description += recipeSetReplace[j];
                }
                recipeRecipes.add(new RecipeRecipeRes(description,recipeSetReplace[recipeSetReplace.length-1]));
            }
            res.setRecipe(recipeRecipes);

            recipeFindResList.add(res);
        }
        return recipeFindResList;
    }

}
