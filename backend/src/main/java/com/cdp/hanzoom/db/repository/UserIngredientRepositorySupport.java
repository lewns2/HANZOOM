package com.cdp.hanzoom.db.repository;

import com.cdp.hanzoom.api.response.UserIngredientFindRes;
import com.cdp.hanzoom.api.response.UserIngredientMatchingRes;
import com.cdp.hanzoom.db.entity.*;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
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

    public List<UserIngredientMatchingRes> findMatchingList(User user, List<String> ingredients, Double distance) {
        List<UserIngredientMatchingRes> userIngredients = jpaQueryFactory
                .select(Projections.bean(UserIngredientMatchingRes.class,
                                            qUserIngredient.userIngredientNo,
                                            qUserIngredient.user.userEmail,
                                            qUserIngredient.user.userNickname,
                                            qUserIngredient.user.userImage,
                                            qUserIngredient.user.lat,
                                            qUserIngredient.user.lng,
                                            qUserIngredient.ingredient.ingredientNo,
                                            qUserIngredient.ingredient.ingredientName,
                                            qUserIngredient.type,
                                            qUserIngredient.purchaseDate,
                                            qUserIngredient.expirationDate,
                                            qUserIngredient.boardNo,
                                            Expressions.numberTemplate(
                                                Double.class
                                                ,"{4}*acos(cos(radians({2}))*cos(radians({0}))*cos(radians({1})-radians({3}))+sin(radians({2}))*sin(radians({0})))"
                                                ,Expressions.constant(user.getLat()),Expressions.constant(user.getLng()),qUserIngredient.user.lat,qUserIngredient.user.lng,Expressions.constant(6371)).as("distance")
                                            )
                )
                .from(qUserIngredient)
                .where(qUserIngredient.type.ne("일반")
                      .and(qUserIngredient.user.userEmail.ne(user.getUserEmail()))
                            .and(qUserIngredient.type.eq("나눔").or(qUserIngredient.type.eq("교환")))
                                .and(qUserIngredient.boardNo.isNotNull())
                                    .and(Expressions.numberTemplate(
                                                        Double.class
                                                        ,"{4}*acos(cos(radians({2}))*cos(radians({0}))*cos(radians({1})-radians({3}))+sin(radians({2}))*sin(radians({0})))"
                                                        ,Expressions.constant(user.getLat()),Expressions.constant(user.getLng()),qUserIngredient.user.lat,qUserIngredient.user.lng,Expressions.constant(6371))
                                                        .loe(distance)
                                        )
                                        .and(builderIngredients(ingredients))
                        )
                .orderBy(qUserIngredient.ingredient.ingredientName.desc())
                .fetch();

        if(userIngredients == null) return null;
        return userIngredients;
    }

    private BooleanBuilder builderIngredients(List<String> ingredients) {
        BooleanBuilder builder = new BooleanBuilder();
        for(int i=0; i<ingredients.size(); i++) {
            builder.or(qUserIngredient.ingredient.ingredientName.eq(ingredients.get(i)));
        }
        return builder;
    }

    public List<String> findNormalUserIngredientsByUserEmail(String userEmail) {
        List<String> normalUserIngredients = jpaQueryFactory.select(qUserIngredient.ingredient.ingredientName).from(qUserIngredient)
                .where(qUserIngredient.user.userEmail.eq(userEmail).and(qUserIngredient.type.eq("일반"))).fetch();
        if(normalUserIngredients == null) return null;
        return normalUserIngredients;
    }

    public List<UserIngredientFindRes> findAllPendingUserIngredient() {
        List<UserIngredientFindRes> userIngredientFindResList = jpaQueryFactory.select(
                Projections.bean(UserIngredientFindRes.class,
                qUserIngredient.userIngredientNo,
                qUserIngredient.ingredient.ingredientNo,
                qUserIngredient.ingredient.ingredientName,
                qUserIngredient.user.userEmail,
                qUserIngredient.type,
                qUserIngredient.purchaseDate,
                qUserIngredient.expirationDate,
                qUserIngredient.boardNo,
                qUserIngredient.status)).from(qUserIngredient).where(qUserIngredient.status.eq("대기")).fetch();

        if(userIngredientFindResList == null) return null;
        return userIngredientFindResList;
    }
}
