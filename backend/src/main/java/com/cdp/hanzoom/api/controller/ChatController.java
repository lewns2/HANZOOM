package com.cdp.hanzoom.api.controller;

import com.cdp.hanzoom.api.request.ChatMessageReq;
import com.cdp.hanzoom.api.request.ChatRoomReq;
import com.cdp.hanzoom.api.response.ChatRoomRes;
import com.cdp.hanzoom.api.service.ChatMessageService;
import com.cdp.hanzoom.api.service.ChatRoomService;
import com.cdp.hanzoom.common.auth.HanZoomUserDetails;
import com.cdp.hanzoom.common.model.response.BaseResponseBody;
import com.cdp.hanzoom.db.entity.ChatRoom;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import retrofit2.http.Path;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@Api(value = "채팅 API", tags = {"Chat"})
@RestController
@RequestMapping("/api/chat")
public class ChatController {
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @Autowired
    ChatRoomService chatRoomService;

    @Autowired
    ChatMessageService chatMessageService;

    // 채팅 리스트 화면
//    @GetMapping("/room")
//    public String rooms(Model model) {
//        return "/chat/room";
//    }

    /** 채팅룸 생성 **/
    @PostMapping("/register")
    @ApiOperation(value = "채팅룸 등록", notes = "<strong>채팅 룸 정보</strong>를 생성한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> registerChatRoom(
            @RequestBody @ApiParam(value="채팅룸 정보", required = true) ChatRoomReq chatRoomReq) {

        try {
            if(!chatRoomService.findChatRoom(chatRoomReq)) {    // (true: 존재 O, false: 존재 X)
                chatRoomService.registerChatRoom(chatRoomReq);
            }
        } catch (Exception E) {
            E.printStackTrace();
            ResponseEntity.status(400).body(BaseResponseBody.of(500, "DB Transaction Failed"));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "SUCCESS"));
    }

    /** (유저의) 채팅방 전체 조회 **/
    @GetMapping("/findAll")
    @ApiOperation(value ="채팅방 전체 조회(token)", notes = "<strong>유저가 속한 모든 채팅방</strong>을 조회한다.")
    @ApiResponses({ @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류") })
    public ResponseEntity<List<ChatRoomRes>> findAllChatRoom(@ApiIgnore Authentication authentication) {
        HanZoomUserDetails userDetails = (HanZoomUserDetails) authentication.getDetails();
        String userEmail = userDetails.getUsername();

        List<ChatRoomRes> chatRoomResList = chatRoomService.findAllChatRoom(userEmail);
        return new ResponseEntity<List<ChatRoomRes>>(chatRoomResList, HttpStatus.OK);
    }

    /** 채팅방 삭제 **/
    @DeleteMapping("/remove")
    @ApiOperation(value = "채팅방에서 유저 정보 삭제(token)", notes = "<strong>채팅방의 해당 유저의 참가 정보</strong>를 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<String> deleteUserIngredient(@RequestParam("id") String id, @ApiIgnore Authentication authentication) {
        HanZoomUserDetails userDetails = (HanZoomUserDetails) authentication.getDetails();
        String userEmail = userDetails.getUsername();

        try {
            chatRoomService.deleteUserInfo(id, userEmail);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body("Bad Request");
        }
        return ResponseEntity.status(200).body("Success");
    }
}
