package com.cdp.hanzoom.api.service;

import com.cdp.hanzoom.api.request.ChatMessageReq;

public interface ChatMessageService {
    /** 채팅 메시지를 생성하는 registerChatMessage 입니다. **/
    void registerChatMessage(ChatMessageReq chatMessageReq);
}
