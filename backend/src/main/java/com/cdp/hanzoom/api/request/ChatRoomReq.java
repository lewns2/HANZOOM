package com.cdp.hanzoom.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@ApiModel("ChatRoomRequest")
public class ChatRoomReq {
    @ApiModelProperty(name = "유저 1 닉네임", example = "하이")
    String userNickname1;

    @ApiModelProperty(name = "유저 2 닉네임", example = "폴리롤리")
    String userNickname2;

    @ApiModelProperty(name = "게시글 번호", example = "1")
    Long boardNo;
}
