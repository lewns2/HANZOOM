package com.cdp.hanzoom.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserIngredientId is a Querydsl query type for UserIngredientId
 */
@Generated("com.querydsl.codegen.EmbeddableSerializer")
public class QUserIngredientId extends BeanPath<UserIngredientId> {

    private static final long serialVersionUID = 714334340L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUserIngredientId userIngredientId = new QUserIngredientId("userIngredientId");

    public final QIngredient ingredientNo;

    public final QUser userEmail;

    public QUserIngredientId(String variable) {
        this(UserIngredientId.class, forVariable(variable), INITS);
    }

    public QUserIngredientId(Path<? extends UserIngredientId> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUserIngredientId(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUserIngredientId(PathMetadata metadata, PathInits inits) {
        this(UserIngredientId.class, metadata, inits);
    }

    public QUserIngredientId(Class<? extends UserIngredientId> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.ingredientNo = inits.isInitialized("ingredientNo") ? new QIngredient(forProperty("ingredientNo")) : null;
        this.userEmail = inits.isInitialized("userEmail") ? new QUser(forProperty("userEmail")) : null;
    }

}

