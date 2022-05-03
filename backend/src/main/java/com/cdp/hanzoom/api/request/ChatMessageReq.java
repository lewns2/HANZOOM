package com.cdp.hanzoom.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;

@Setter
@Getter
@ApiModel("ChatMessageRequest")
public class ChatMessageReq {
    @ApiModelProperty(name = "메시지 전송 유저 닉네임", example = "하이")
    String sender;          // 메시지 전송 유저 닉네임

    @ApiModelProperty(name = "메시지가 속한 채팅방 Id", example = "")
    String roomId;      // 메시지가 속한 채팅방 아이디

    @ApiModelProperty(name = "전송 메시지 내용", example = "this is message content....")
    String message;         // 메시지 내용
}
