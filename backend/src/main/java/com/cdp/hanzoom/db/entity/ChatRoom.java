package com.cdp.hanzoom.db.entity;

import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.persistence.Id;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Slf4j
@ToString
@Document(collection = "chats")
public class ChatRoom {

    @Id
    private String id;                      // 채팅방 아이디
    private String userEmail1;              // 채팅 참가 유저1
    private String userEmail2;              // 채팅 참가 유저2
    private Long boardNo;                 // 게시글 번호
    private List<ChatMessage> chatMessages; // 해당 채팅방의 메시지들

    public static ChatRoom create(String userEmail1, String userEmail2, Long boardNo) {
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.userEmail1 = userEmail1;
        chatRoom.userEmail2 = userEmail2;
        chatRoom.boardNo = boardNo;
        chatRoom.chatMessages = new ArrayList<ChatMessage>();
        return chatRoom;
    }
}
