package com.cdp.hanzoom.api.response;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@ApiModel("MatchingFindRes")
public class MatchingFindRes {
    List<UserIngredientMatchingRes> userIngredientMatchingRes;
    Double totalDistance;
}
