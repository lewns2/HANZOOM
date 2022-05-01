package com.cdp.hanzoom.model;

import com.cdp.hanzoom.db.entity.ChatMessage;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash(value = "MessageDto", timeToLive = -1L)
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class MessageDto {
    @Id
    Long messageId;

    ChatMessage.MessageType type;

    String roomId;  // 채팅방 ID

    String sender;  // 메시지 보내는 사람

    String message; // 메시지 내용

    public enum MessageType {
        ENTER, TALK, LEAVE  // 메시지 타입 : 입장, 채팅, 퇴장
    }

}
