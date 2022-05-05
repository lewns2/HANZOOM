package com.cdp.hanzoom.api.controller;

import com.cdp.hanzoom.api.request.ChatMessageReq;
import com.cdp.hanzoom.api.service.ChatMessageService;
import com.cdp.hanzoom.common.auth.HanZoomUserDetails;
import com.cdp.hanzoom.common.model.response.BaseResponseBody;
import com.cdp.hanzoom.db.entity.ChatMessage;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import springfox.documentation.annotations.ApiIgnore;

@RequiredArgsConstructor
@Controller
//@Api(value = "채팅 메시지 API", tags = {"ChatMessage"})
//@RequestMapping("/api/message")
public class MessageController {

    @Autowired
    ChatMessageService chatMessageService;

    private final SimpMessageSendingOperations messagingTemplate;

    /** 메시지 생성 **/
//    @PostMapping("/send")
    @MessageMapping("/chat/message")
    @ApiOperation(value = "메시지 등록(token)", notes = "<strong>채팅 메시지 정보</strong>를 생성한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> sendChatMessage(
            @RequestBody @ApiParam(value="채팅 메시지 정보", required = true) ChatMessageReq chatMessageReq, @ApiIgnore Authentication authentication) {
        HanZoomUserDetails userDetails = (HanZoomUserDetails) authentication.getDetails();
        String userEmail = userDetails.getUsername();

//        System.out.println(userEmail);
//        System.out.println(chatMessageReq.getRoomId() + " "  + chatMessageReq.getMessage());
//        System.out.println("=================> " + chatMessageReq.getType());
        if(ChatMessage.MessageType.ENTER.equals(chatMessageReq.getType())) {
            chatMessageReq.setMessage(userEmail + "님이 입장하셨습니다.");
        } else if (ChatMessage.MessageType.LEAVE.equals(chatMessageReq.getType())) {
            chatMessageReq.setMessage(userEmail + "님이 퇴장하셨습니다.");
        } else {
            try {
                chatMessageService.registerChatMessage(chatMessageReq, userEmail);  // 메시지 저장
            } catch (Exception E) {
                E.printStackTrace();
                ResponseEntity.status(400).body(BaseResponseBody.of(500, "DB Transaction Failed"));
            }
        }

        messagingTemplate.convertAndSend("/sub/chat/room/" + chatMessageReq.getRoomId(), chatMessageReq);   // 원하는 채팅방에 메시지 정보 전송
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "SUCCESS"));
    }
}
