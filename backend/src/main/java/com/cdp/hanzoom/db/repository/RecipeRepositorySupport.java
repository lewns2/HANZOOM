package com.cdp.hanzoom.db.repository;

import com.cdp.hanzoom.db.entity.QRecipe;
import com.cdp.hanzoom.db.entity.Recipe;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import java.util.List;

@Repository
public class RecipeRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QRecipe qRecipe = QRecipe.recipe1;

    public List<Recipe> findRecipeByIngredients(List<String> ingredients) {
        List<Recipe> recipes = jpaQueryFactory
                .select(qRecipe)
                .from(qRecipe)
                .where(builderIngredients(ingredients))
                .fetch();
        if(recipes == null) return null;
        return recipes;
    }
    // 동적 sql
    private BooleanBuilder builderIngredients(List<String> ingredients) {
        BooleanBuilder builder = new BooleanBuilder();
        for(int i=0; i<ingredients.size(); i++) {
            builder.and(qRecipe.ingredients.contains(ingredients.get(i)));
            // 아래 방법도 사용가능
//          builder.and(qRecipe.ingredients.like("%"+ingredients.get(i)+"%"));
        }
        return builder;
    }

    public String findRecipeByRecipeNo(Long recipeNo) {
        String ingredients = jpaQueryFactory
                .select(qRecipe.ingredients)
                .from(qRecipe)
                .where(qRecipe.recipeNo.eq(recipeNo))
                .fetchOne();
        return ingredients;
    }
}
