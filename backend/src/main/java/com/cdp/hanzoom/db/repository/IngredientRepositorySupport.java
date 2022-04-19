package com.cdp.hanzoom.db.repository;

import com.cdp.hanzoom.db.entity.Ingredient;
import com.cdp.hanzoom.db.entity.QIngredient;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class IngredientRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QIngredient qIngredient = QIngredient.ingredient;

    public Optional<Ingredient> findByIngredientName(String ingredientName) {
        Ingredient ingredient = jpaQueryFactory.select(qIngredient).from(qIngredient)
                .where(qIngredient.ingredientName.eq(ingredientName)).fetchOne();
        if(ingredient == null) return Optional.empty();
        return Optional.ofNullable(ingredient);
    }

    public Optional<Ingredient> findByIngredientNo(Long ingredientNo) {
        Ingredient ingredient = jpaQueryFactory.select(qIngredient).from(qIngredient)
                .where(qIngredient.ingredientNo.eq(ingredientNo)).fetchOne();
        if(ingredient == null) return Optional.empty();
        return Optional.ofNullable(ingredient);
    }

}
