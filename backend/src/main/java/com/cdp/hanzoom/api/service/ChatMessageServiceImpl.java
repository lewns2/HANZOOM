package com.cdp.hanzoom.api.service;

import com.cdp.hanzoom.api.request.ChatMessageReq;
import com.cdp.hanzoom.db.entity.ChatMessage;
import com.cdp.hanzoom.db.entity.ChatRoom;
import com.cdp.hanzoom.db.entity.User;
import com.cdp.hanzoom.db.repository.ChatMessageRepository;
import com.cdp.hanzoom.db.repository.ChatRoomRepository;
import com.cdp.hanzoom.db.repository.UserRepositorySupport;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service("ChatMessageService")
public class ChatMessageServiceImpl implements ChatMessageService {

    @Autowired
    private ChatRoomRepository chatRoomRepository;

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    @Autowired
    private UserRepositorySupport userRepositorySupport;

    @Autowired
    private MongoTemplate mongoTemplate;

    /** 채팅 메시지 생성 **/
    @Override
    public void registerChatMessage(ChatMessageReq chatMessageReq) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatMessageReq.getRoomId()).orElse(null);
        User user = userRepositorySupport.findUserByUserNickname(chatMessageReq.getSender()).orElse(null);

        LocalDateTime localDateTime = LocalDateTime.now();

        ChatMessage chatMessage = ChatMessage.create(
                user.getUserEmail(),
                chatMessageReq.getMessage(),
                localDateTime);

        Update update = new Update();
        update.push("chatMessages", chatMessage);
        Criteria criteria = Criteria.where("_id").is(chatMessageReq.getRoomId());
        mongoTemplate.updateFirst(Query.query(criteria), update, "chats");

    }
}