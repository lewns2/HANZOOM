package com.cdp.hanzoom.api.controller;

import com.cdp.hanzoom.api.service.ChatService;
import com.cdp.hanzoom.db.entity.ChatRoom;
import com.cdp.hanzoom.db.repository.ChatRoomRepository;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/chat")
public class ChatRoomController {
    @Autowired
    ChatService chatService;
    @Autowired
    ChatRoomRepository chatRoomRepository;

    // 채팅 리스트 화면
    @GetMapping("/room")
    public String rooms(Model model) {
        return "/chat/room";
    }

    // 모든 채팅방 목록 반환
    @GetMapping("/rooms")
    @ApiOperation(value = "모든 채팅방 목록 조회", notes = "<strong>모든 채팅방 목록</strong>을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<ChatRoom>> findAllChatRoom() {
        String userEmail = "ssafy";
        List<ChatRoom> chatRoomList = chatService.findAllRoom(userEmail);
        return ResponseEntity.status(200).body(chatRoomList);
    }

    // 채팅방 등록
    @ApiOperation(value = "채팅방 등록", notes = "<strong>새로운 채팅방</strong>을 생성한다.")
    @PostMapping("/room")
//    public ChatRoomDto createRoom(@RequestParam String otherUserEmail, @ApiIgnore Authentication authentication) {
    public ChatRoom createRoom(@RequestParam String otherUserEmail) {
//        return chatService.createRoom(name);
//        UserDetails userDetails = (UserDetails) authentication.getDetails();
//        String userEmail = userDetails.getUsername();
        String userEmail = "ssafy";
        System.out.println(">>>>>>>>>>>>>>> " + userEmail + " " + otherUserEmail);

        return chatService.createChatRoom(userEmail, otherUserEmail);
    }

    // 채팅방 입장 화면
    @GetMapping("/room/enter/{roomId}")
    public String roomDetail(Model model, @PathVariable String roomId) {
        model.addAttribute("roomId", roomId);
        return "chat/roomdetail";
    }

    // 특정 채팅방 조회
    @GetMapping("/room/{roomId}")
    @ResponseBody
    public ChatRoom roomInfo(@PathVariable String roomId) {
        return chatService.findRoomById(roomId);
    }
}