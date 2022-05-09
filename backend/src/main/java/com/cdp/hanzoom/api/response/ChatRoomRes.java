package com.cdp.hanzoom.api.response;

import com.cdp.hanzoom.db.entity.ChatMessage;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
@ApiModel("ChatRoomResponse")
public class ChatRoomRes {
    @ApiModelProperty(name = "채팅방 아이디", example = "62713ccfc7a1ef5b14c5fb15")
    String id;

    @ApiModelProperty(name = "유저 1 닉네임", example = "하이")
    String userNickname1;

    @ApiModelProperty(name = "유저 2 닉네임", example = "폴리롤리")
    String userNickname2;

    @ApiModelProperty(name = "게시글 번호", example = "1")
    Long boardNo;

//    @ApiModelProperty(name = "채팅 메시지")
//    List<ChatMessageRes> chatMessages;

    @ApiModelProperty(name = "최근 메시지")
    ChatMessage chatMessages;

    @ApiModelProperty(name = "식재료 목록")
    List<String> ingredientList;
}
