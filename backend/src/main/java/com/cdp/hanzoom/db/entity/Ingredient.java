package com.cdp.hanzoom.db.entity;

import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;
import javax.validation.constraints.Email;

/**
 * 식재료 모델 정의.
 */
@Builder
@Getter
@Entity
public class Ingredient {
    @Id
    @Column(name = "ingredient_no")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    Long ingredientNo;

    @Column(name = "ingredient_name")
    String ingredientName;
}
