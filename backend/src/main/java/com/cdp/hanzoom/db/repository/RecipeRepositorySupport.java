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

    private BooleanBuilder builderIngredients(List<String> ingredients) {
        BooleanBuilder builder = new BooleanBuilder();
        for(int i=0; i<ingredients.size(); i++) {
            builder.and(qRecipe.ingredients.contains(ingredients.get(i)));
        }
        return builder;
    }

}
