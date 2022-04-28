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

    public List<UserIngredient> findAllByUserEmail(String userEmail) {
        List<UserIngredient> userIngredientList = jpaQueryFactory.select(qUserIngredient).from(qUserIngredient)
                .where(qUserIngredient.user.userEmail.eq(userEmail)).fetch();
        if(userIngredientList == null) return null;
        return userIngredientList;
    }

    public Optional<UserIngredient> findByUserIngredientNo(Long userIngredientNo) {
        UserIngredient userIngredient = jpaQueryFactory.select(qUserIngredient).from(qUserIngredient)
                .where(qUserIngredient.userIngredientNo.eq(userIngredientNo)).fetchOne();
        if(userIngredient == null) return Optional.empty();
        return Optional.ofNullable(userIngredient);
    }

    public Optional<UserIngredient> findByIngredientNoAndUserEmail(Long ingredientNo, String userEmail) {
        UserIngredient userIngredient = jpaQueryFactory.select(qUserIngredient).from(qUserIngredient)
                .where(qUserIngredient.user.userEmail.eq(userEmail).and(qUserIngredient.ingredient.ingredientNo.eq(ingredientNo))).fetchOne();
        if(userIngredient == null) return Optional.empty();
        return Optional.ofNullable(userIngredient);
    }

    public List<UserIngredient> findByBoardNo(Long boardNo) {
        List<UserIngredient> userIngredients = jpaQueryFactory
                .select(qUserIngredient)
                .from(qUserIngredient)
                .where(qUserIngredient.boardNo.eq(boardNo))
                .fetch();
        if(userIngredients == null) return null;
        return userIngredients;
    }
}
