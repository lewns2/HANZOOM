package com.cdp.hanzoom.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.ToString;

import java.util.List;

@Data
@ToString
@ApiModel("RecipeFindRes")
public class UserLikeListFindRes {
    @ApiModelProperty(name="UserLikeList likeNo")
    Long likeNo; // 찜 번호

    @ApiModelProperty(name="UserLikeList boardNo")
    Long boardNo; // 게시글 번호

    @ApiModelProperty(name="UserLikeList imagePath")
    String imagePath; // 해당 게시글의 이미지 경로
}
