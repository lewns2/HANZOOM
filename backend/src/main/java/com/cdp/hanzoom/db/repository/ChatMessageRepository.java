package com.cdp.hanzoom.db.repository;

import com.cdp.hanzoom.db.entity.ChatMessage;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ChatMessageRepository extends MongoRepository<ChatMessage, String> {
}
