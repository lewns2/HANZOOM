package com.cdp.hanzoom.api.controller;

import com.cdp.hanzoom.api.service.ChatService;
import com.cdp.hanzoom.db.entity.ChatMessage;
import com.cdp.hanzoom.db.repository.RedisChatRoomRepository;
import com.cdp.hanzoom.model.MessageDto;
import lombok.RequiredArgsConstructor;
import com.cdp.hanzoom.pubsub.RedisPublisher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@RequiredArgsConstructor
@Controller
public class MessageController {
    @Autowired
    RedisPublisher redisPublisher;
    @Autowired
    ChatService chatService;
    @Autowired
    RedisChatRoomRepository redisChatRoomRepository;

    /**
     * websocket "/pub/chat/message"로 들어오는 메시징을 처리한다.
     */
    @MessageMapping("/chat/message")
    public void message(ChatMessage message) {
        if (ChatMessage.MessageType.ENTER.equals(message.getType())) {
            chatService.enterChatRoom(message.getRoomId());
            message.setMessage("[알림]");
            message.setMessage(message.getSender() + "님이 입장하셨습니다.");
        } else if (ChatMessage.MessageType.LEAVE.equals(message.getType())) {
            message.setMessage("[알림]");
            message.setMessage(message.getSender() + "님이 퇴장하셨습니다.");
            chatService.deleteById(message.getRoomId());
        } else {
            chatService.save(message);  // mysql에 message 저장
            // redis 저장
            MessageDto messageDto = MessageDto.builder()
                    .messageId(message.getMessageId())
                    .type(message.getType())
                    .roomId(message.getRoomId())
                    .sender(message.getSender())
                    .message(message.getMessage())
                    .build();
            redisChatRoomRepository.save(messageDto);
        }

        // Websocket에 발행된 메시지를 redis로 발행한다(publish)
        redisPublisher.publish(chatService.getTopic(message.getRoomId()), message);
    }
}