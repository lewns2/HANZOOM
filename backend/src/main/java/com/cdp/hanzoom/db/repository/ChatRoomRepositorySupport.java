package com.cdp.hanzoom.db.repository;

import com.cdp.hanzoom.db.entity.ChatRoom;
import com.cdp.hanzoom.db.entity.QChatRoom;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ChatRoomRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QChatRoom qChatRoom = QChatRoom.chatRoom;

    public List<ChatRoom> findAllByUserEmail(String userEmail) {
        List<ChatRoom> chatroomList = jpaQueryFactory.select(qChatRoom).from(qChatRoom)
                .where(qChatRoom.user1.eq(userEmail).or(qChatRoom.user2.eq(userEmail))).fetch();
        if (chatroomList == null) return null;
        return chatroomList;
    }
}
