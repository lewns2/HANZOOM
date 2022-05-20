package com.cdp.hanzoom.api.service;

import com.cdp.hanzoom.api.request.ChatMessageReq;
import com.cdp.hanzoom.db.entity.ChatMessage;

public interface ChatMessageService {
    /** 채팅 메시지를 생성하는 registerChatMessage 입니다. **/
    ChatMessage registerChatMessage(ChatMessageReq chatMessageReq, String userEmail);
}
