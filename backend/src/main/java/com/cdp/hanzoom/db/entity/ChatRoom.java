package com.cdp.hanzoom.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
@Entity
@ToString
@NoArgsConstructor
public class ChatRoom implements Serializable {

    private static final long serialVersionUID = 6494678977089006639L;

    @Id
    @Column(name = "chatroom_id")
    String chatroomId;

    @Column(name = "name")
    String name;

    @Column(name = "user1")
    String user1;

    @Column(name = "user2")
    String user2;

    public static ChatRoom create(String name, String userEmail, String otherUserEmail) {
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.chatroomId = UUID.randomUUID().toString();
        chatRoom.name = name;
        chatRoom.user1 = userEmail;
        chatRoom.user2 = otherUserEmail;
        return chatRoom;
    }
}