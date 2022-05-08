package com.cdp.hanzoom.api.response;

import com.cdp.hanzoom.db.entity.ChatMessage;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@ApiModel("ChatMessageResponse")
public class ChatMessageRes {
    @ApiModelProperty(name = "메시지 아이디", example = "62713ccfc7a1ef5b14c5fb15")
    String id;

    @ApiModelProperty(name = "메시지 전송 유저 닉네임", example = "하이")
    String senderNickname;

    @ApiModelProperty(name = "메시지 전송 유저 프로필 이미지", example = "하이")
    String senderImage;

    @ApiModelProperty(name = "메시지내용", example = "this is message content.....")
    String message;

    @ApiModelProperty(name = "메시지 타입", example =  "TALK")
    ChatMessage.MessageType type;

    @ApiModelProperty(name = "메시지 전송 시간", example = "2022-05-03 23:54:21")
    LocalDateTime createdAt;
}
