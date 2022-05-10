package com.cdp.hanzoom.api.response;

import com.cdp.hanzoom.db.entity.Board;
import io.swagger.annotations.ApiModel;
import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@AllArgsConstructor
@ApiModel("UserIngredientBoardRes")
public class UserIngredientBoardRes {
    Board board;
    List<String> ingredients;
}
