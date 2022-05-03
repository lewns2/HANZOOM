package com.cdp.hanzoom.db.entity;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Id;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class ChatMessage {
    @Id
    private String sender;          // 메시지 전송 유저 닉네임
    private String message;         // 메시지 내용
    @DateTimeFormat(pattern="YYYY-MM-DD HH:mm:ss")
    private LocalDateTime createdAt;    // 메시지 전송 시간

    public static ChatMessage create(String sender, String message, LocalDateTime createdAt) {
        ChatMessage chatMessage = new ChatMessage();
        chatMessage.sender = sender;
        chatMessage.message = message;
        chatMessage.createdAt = createdAt;
        return chatMessage;
    }
}