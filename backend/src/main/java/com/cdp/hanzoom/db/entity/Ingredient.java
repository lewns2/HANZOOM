package com.cdp.hanzoom.db.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;

/**
 * 식재료 모델 정의.
 */
@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Ingredient {
    @Id
    @Column(name = "ingredient_no")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    Long ingredientNo;

    @Column(name = "ingredient_name", length = 50)
    String ingredientName;
}
