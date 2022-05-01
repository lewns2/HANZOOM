package com.cdp.hanzoom.db.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long messageId;

    @Column(name = "message_type")
    MessageType type;

    @Column(name = "room_id")
    String roomId;  // 채팅방 ID

    @Column(name = "sender")
    String sender;  // 메시지 보내는 사람

    @Column(name = "message")
    String message; // 메시지 내용

    public enum MessageType {
        ENTER, TALK, LEAVE  // 메시지 타입 : 입장, 채팅, 퇴장
    }

    public static ChatMessage createChatMessage(String roomId, String sender, String message, MessageType type) {
        ChatMessage chatMessage = ChatMessage.builder()
                .roomId(roomId)
                .sender(sender)
                .message(message)
                .type(type)
                .build();
        return chatMessage;
    }
}
