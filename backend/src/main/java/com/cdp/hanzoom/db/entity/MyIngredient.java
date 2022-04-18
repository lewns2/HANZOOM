package com.cdp.hanzoom.db.entity;

import org.hibernate.annotations.ColumnDefault;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

/**
 * MY식재료 모델 정의.
 */
@Entity
public class MyIngredient {
    @EmbeddedId
    MyIngredientId myIngredientId;

    @Column(name = "status")
    @ColumnDefault("1")
    int status;
}
