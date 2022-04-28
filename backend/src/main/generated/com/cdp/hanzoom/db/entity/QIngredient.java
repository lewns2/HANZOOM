package com.cdp.hanzoom.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QIngredient is a Querydsl query type for Ingredient
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QIngredient extends EntityPathBase<Ingredient> {

    private static final long serialVersionUID = -1802953250L;

    public static final QIngredient ingredient = new QIngredient("ingredient");

    public final StringPath ingredientName = createString("ingredientName");

    public final NumberPath<Long> ingredientNo = createNumber("ingredientNo", Long.class);

    public QIngredient(String variable) {
        super(Ingredient.class, forVariable(variable));
    }

    public QIngredient(Path<? extends Ingredient> path) {
        super(path.getType(), path.getMetadata());
    }

    public QIngredient(PathMetadata metadata) {
        super(Ingredient.class, metadata);
    }

}

