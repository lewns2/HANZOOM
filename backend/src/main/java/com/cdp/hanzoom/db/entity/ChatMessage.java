package com.cdp.hanzoom.db.entity;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Id;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@ToString
public class ChatMessage {
    private static final long serialVersionUID = 6494678977089006639L;

    private String id;              // 메시지 아이디
    private String sender;          // 메시지 전송 유저 이메일
    private String message;         // 메시지 내용
    @DateTimeFormat(pattern="YYYY-MM-DD HH:mm:ss")
    private LocalDateTime createdAt;    // 메시지 전송 시간
    private MessageType type;       // 메시지 타입

    public enum MessageType {
        ENTER, TALK, LEAVE
    }

    public static ChatMessage create(String sender, String message, LocalDateTime createdAt, MessageType type) {
        ChatMessage chatMessage = new ChatMessage();
        chatMessage.id = UUID.randomUUID().toString();
        chatMessage.sender = sender;
        chatMessage.message = message;
        chatMessage.createdAt = createdAt;
        chatMessage.type = type;
        return chatMessage;
    }
}