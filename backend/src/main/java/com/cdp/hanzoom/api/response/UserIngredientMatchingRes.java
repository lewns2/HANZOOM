package com.cdp.hanzoom.api.response;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@Setter
@ToString
@NoArgsConstructor
@ApiModel("UserIngredientMatchingRes")
public class UserIngredientMatchingRes {
    Long userIngredientNo;
    String userEmail;
    String userNickname;
    Double lat;
    Double lng;
    Long ingredientNo;
    String ingredientName;
    String type;
    LocalDate purchaseDate;
    LocalDate expirationDate;
    Long boardNo;
    Double distance;
}
