package com.cdp.hanzoom.db.repository;

import com.cdp.hanzoom.db.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage,Long> {
    List<ChatMessage> getChatMessagesByRoomId(String roomId);
}

