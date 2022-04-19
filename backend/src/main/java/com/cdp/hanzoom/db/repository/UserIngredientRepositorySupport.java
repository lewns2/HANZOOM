package com.cdp.hanzoom.db.repository;

import com.cdp.hanzoom.db.entity.*;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class UserIngredientRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QUserIngredient qUserIngredient = QUserIngredient.userIngredient;

    public List<UserIngredient> findAllByUserEmail(User user) {
        List<UserIngredient> userIngredientList = jpaQueryFactory.select(qUserIngredient).from(qUserIngredient)
                .where(qUserIngredient.userIngredientId.userEmail.eq(user)).fetch();
        if(userIngredientList == null) return null;
        return userIngredientList;
    }

    public Optional<UserIngredient> findByIngredientNameAndUserEmail(Ingredient ingredient, User user) {
        UserIngredient userIngredient = jpaQueryFactory.select(qUserIngredient).from(qUserIngredient)
                .where(qUserIngredient.userIngredientId.userEmail.eq(user).and(qUserIngredient.userIngredientId.ingredientNo.eq(ingredient))).fetchOne();
        if(userIngredient == null) return Optional.empty();
        return Optional.ofNullable(userIngredient);
    }
}
