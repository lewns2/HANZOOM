package com.cdp.hanzoom.api.response;

import com.cdp.hanzoom.db.entity.ChatMessage;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@ApiModel("ChatMessageResponse")
public class ChatMessageRes {

    @ApiModelProperty(name = "메시지 전송 유저 닉네임", example = "하이")
    String sender;

    @ApiModelProperty(name = "메시지내용", example = "this is message content.....")
    String message;

    @ApiModelProperty(name = "메시지 전송 시간", example = "2022-05-03 23:54:21")
    LocalDateTime createdAt;
}
