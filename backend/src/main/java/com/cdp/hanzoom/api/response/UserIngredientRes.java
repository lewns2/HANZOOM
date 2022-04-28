package com.cdp.hanzoom.api.response;

import com.cdp.hanzoom.db.entity.Ingredient;
import com.cdp.hanzoom.db.entity.User;
import com.cdp.hanzoom.db.entity.UserIngredient;
import com.cdp.hanzoom.db.entity.UserIngredientId;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@ApiModel("UserIngredientResponse")
public class UserIngredientRes {
    @ApiModelProperty(name="유저 식재료 번호")
    Long userIngredientNo;

    @ApiModelProperty(name="식재료 번호")
    Long ingredientNo;

    @ApiModelProperty(name="유저 이메일")
    String userEmail;

    @ApiModelProperty(name="종류")
    String type;

    @ApiModelProperty(name="구매일")
    LocalDate purchaseDate;

    @ApiModelProperty(name="유통기한")
    LocalDate expirationDate;

    @ApiModelProperty(name="게시글 번호")
    Long boardNo;

    public UserIngredient toEntity() {
        User user = new User();
        user.setUserEmail(userEmail);

        Ingredient ingredient = new Ingredient();
        ingredient.setIngredientNo(ingredientNo);

        return UserIngredient.builder()
                .userIngredientNo(userIngredientNo)
                .ingredient(ingredient)
                .user(user)
                .type(type)
                .expirationDate(expirationDate)
                .purchaseDate(purchaseDate)
                .boardNo(boardNo)
                .build();
    }
}
