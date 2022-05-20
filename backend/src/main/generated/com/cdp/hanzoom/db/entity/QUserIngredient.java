package com.cdp.hanzoom.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUserIngredient is a Querydsl query type for UserIngredient
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUserIngredient extends EntityPathBase<UserIngredient> {

    private static final long serialVersionUID = -553446007L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUserIngredient userIngredient = new QUserIngredient("userIngredient");

    public final NumberPath<Long> boardNo = createNumber("boardNo", Long.class);

    public final DatePath<java.time.LocalDate> expirationDate = createDate("expirationDate", java.time.LocalDate.class);

    public final DatePath<java.time.LocalDate> purchaseDate = createDate("purchaseDate", java.time.LocalDate.class);

    public final StringPath type = createString("type");

    public final QUserIngredientId userIngredientId;

    public QUserIngredient(String variable) {
        this(UserIngredient.class, forVariable(variable), INITS);
    }

    public QUserIngredient(Path<? extends UserIngredient> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUserIngredient(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUserIngredient(PathMetadata metadata, PathInits inits) {
        this(UserIngredient.class, metadata, inits);
    }

    public QUserIngredient(Class<? extends UserIngredient> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.userIngredientId = inits.isInitialized("userIngredientId") ? new QUserIngredientId(forProperty("userIngredientId"), inits.get("userIngredientId")) : null;
    }

}

