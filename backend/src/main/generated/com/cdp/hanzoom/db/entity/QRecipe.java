package com.cdp.hanzoom.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QRecipe is a Querydsl query type for Recipe
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QRecipe extends EntityPathBase<Recipe> {

    private static final long serialVersionUID = 608636955L;

    public static final QRecipe recipe1 = new QRecipe("recipe1");

    public final StringPath imagePath = createString("imagePath");

    public final StringPath ingredients = createString("ingredients");

    public final StringPath recipe = createString("recipe");

    public final StringPath recipeName = createString("recipeName");

    public final NumberPath<Long> recipeNo = createNumber("recipeNo", Long.class);

    public final NumberPath<Long> referenceNo = createNumber("referenceNo", Long.class);

    public QRecipe(String variable) {
        super(Recipe.class, forVariable(variable));
    }

    public QRecipe(Path<? extends Recipe> path) {
        super(path.getType(), path.getMetadata());
    }

    public QRecipe(PathMetadata metadata) {
        super(Recipe.class, metadata);
    }

}

