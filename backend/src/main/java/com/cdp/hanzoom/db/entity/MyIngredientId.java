package com.cdp.hanzoom.db.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class MyIngredientId implements Serializable {

    @ManyToOne
    @JoinColumn(name="user_email")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User userEmail;

    @OneToOne
    @JoinColumn(name = "ingredient_no")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Ingredient ingredientNo;
}
