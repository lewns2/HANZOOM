package com.cdp.hanzoom.db.repository;

import com.cdp.hanzoom.api.request.PendingIngredientReq;
import com.cdp.hanzoom.api.response.PendingIngredientRes;
import com.cdp.hanzoom.db.entity.QPendingIngredient;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PendingIngredientRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QPendingIngredient qPendingIngredient = QPendingIngredient.pendingIngredient;

    public List<PendingIngredientRes> findAllPendingIngredient() {
        List<PendingIngredientRes> pendingIngredientResList = jpaQueryFactory.select(
                        Projections.bean(PendingIngredientRes.class,
                                qPendingIngredient.requestNo,
                                qPendingIngredient.requestor,
                                qPendingIngredient.ingredientName,
                                qPendingIngredient.type,
                                qPendingIngredient.purchaseDate,
                                qPendingIngredient.expirationDate,
                                qPendingIngredient.status,
                                qPendingIngredient.createdAt))
                .from(qPendingIngredient)
                .fetch();

        if (pendingIngredientResList == null) return null;
        else return pendingIngredientResList;
    }
}
