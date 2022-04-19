package com.cdp.hanzoom.db.entity;

import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class UserIngredientId implements Serializable {

    @ManyToOne
    @JoinColumn(name="user_email")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User userEmail;

    @OneToOne
    @JoinColumn(name = "ingredient_no")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Ingredient ingredientNo;
}
