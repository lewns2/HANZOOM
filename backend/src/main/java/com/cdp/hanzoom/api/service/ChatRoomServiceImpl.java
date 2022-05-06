package com.cdp.hanzoom.api.service;

import com.cdp.hanzoom.api.request.ChatRoomReq;
import com.cdp.hanzoom.api.response.ChatMessageRes;
import com.cdp.hanzoom.api.response.ChatRoomInfoRes;
import com.cdp.hanzoom.api.response.ChatRoomRes;
import com.cdp.hanzoom.db.entity.ChatMessage;
import com.cdp.hanzoom.db.entity.ChatRoom;
import com.cdp.hanzoom.db.entity.User;
import com.cdp.hanzoom.db.repository.ChatRoomRepository;
import com.cdp.hanzoom.db.repository.UserRepositorySupport;
import org.springframework.aop.scope.ScopedProxyUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import org.springframework.data.mongodb.core.query.Query;

import java.util.ArrayList;
import java.util.List;

@Service("ChatRoomService")
public class ChatRoomServiceImpl implements ChatRoomService {
    @Autowired
    ChatRoomRepository chatRoomRepository;

    @Autowired
    UserRepositorySupport userRepositorySupport;

    @Autowired
    private MongoTemplate mongoTemplate;

    /** 채팅방을 생성 **/
    @Override
    public void registerChatRoom(ChatRoomReq chatRoomReq) {
        User user1 = userRepositorySupport.findUserByUserNickname(chatRoomReq.getUserNickname1()).orElse(null);
        User user2 = userRepositorySupport.findUserByUserNickname(chatRoomReq.getUserNickname2()).orElse(null);

        ChatRoom chatRoom = ChatRoom.create(user1.getUserEmail(), user2.getUserEmail(), chatRoomReq.getBoardNo());
        chatRoomRepository.save(chatRoom);
    }

    /** 유저가 속한 채팅방을 전체 조회 **/
    @Override
    public List<ChatRoomRes> findAllChatRoom(String userEmail) {

        Criteria criteria = new Criteria();
        criteria.orOperator(Criteria.where("userEmail1").is(userEmail), Criteria.where("userEmail2").is(userEmail));
        Query query = new Query(criteria);

        List<ChatRoom> chatRoomList = mongoTemplate.find(query, ChatRoom.class);

        List<ChatRoomRes> chatroomResList = new ArrayList<ChatRoomRes>();
        for(int i=0; i<chatRoomList.size(); i++) {
            ChatRoom chatRoom = chatRoomList.get(i);
            User user1 = userRepositorySupport.findUserByUserEmail(chatRoom.getUserEmail1()).orElse(null);
            User user2 = userRepositorySupport.findUserByUserEmail(chatRoom.getUserEmail2()).orElse(null);

//            List<ChatMessageRes> chatMessageResList = new ArrayList<ChatMessageRes>();
//            for(int j=0; j<chatRoom.getChatMessages().size(); j++) {
//                String userNickname = "";
//                String userImage = "";
//                if(chatRoom.getChatMessages().get(j).getSender().equals(user1.getUserEmail())) {
//                    userNickname = user1.getUserNickname();
//                    userImage = user1.getUserImage();
//                } else {
//                    userNickname = user2.getUserNickname();
//                    userImage = user2.getUserImage();
//
//                }
//                ChatMessageRes chatMessageRes = ChatMessageRes.builder()
//                        .id(chatRoom.getChatMessages().get(j).getId())
//                        .senderNickname(userNickname)
//                        .senderImage(userImage)
//                        .message(chatRoom.getChatMessages().get(j).getMessage())
//                        .createdAt(chatRoom.getChatMessages().get(j).getCreatedAt())
//                        .build();
//                chatMessageResList.add(chatMessageRes);
//            }

            int size = chatRoomList.get(i).getChatMessages().size();
            ChatMessage chatMessage = chatRoomList.get(i).getChatMessages().get(size-1);

            ChatRoomRes chatRoomRes=  ChatRoomRes.builder()
                    .id(chatRoomList.get(i).getId())
                    .userNickname1(user1.getUserNickname())
                    .userNickname2(user2.getUserNickname())
                    .boardNo(chatRoomList.get(i).getBoardNo())
//                    .chatMessages(chatMessageResList)
                    .chatMessages(chatMessage)
                    .build();
            chatroomResList.add(chatRoomRes);
        }
        return chatroomResList;
    }

    @Override
    public ChatRoomInfoRes findChatRoomInfoByRoomId(String roomId) {
        ChatRoom chatRoom = mongoTemplate.findOne(
                Query.query(Criteria.where("_id").is(roomId)),
                ChatRoom.class
        );

        List<ChatMessageRes> chatMessageResList = new ArrayList<ChatMessageRes>();
        for(int i=0; i<chatRoom.getChatMessages().size(); i++) {
            User user = userRepositorySupport.findUserByUserEmail(chatRoom.getChatMessages().get(i).getSender()).orElse(null);

            ChatMessageRes chatMessageRes = ChatMessageRes.builder()
                    .id(chatRoom.getChatMessages().get(i).getId())
                    .senderNickname(user.getUserNickname())
                    .senderImage(user.getUserImage())
                    .message(chatRoom.getChatMessages().get(i).getMessage())
                    .type(chatRoom.getChatMessages().get(i).getType())
                    .createdAt(chatRoom.getChatMessages().get(i).getCreatedAt())
                    .build();

            chatMessageResList.add(chatMessageRes);
        }

        ChatRoomInfoRes chatRoomInfoRes = ChatRoomInfoRes.builder()
                .id(chatRoom.getId())
                .userNickname1(chatRoom.getUserEmail1())
                .userNickname2(chatRoom.getUserEmail2())
                .boardNo(chatRoom.getBoardNo())
                .chatMessages(chatMessageResList)
                .build();

        return chatRoomInfoRes;
    }

    /** 유저1과 유저2의 채팅방이 존재하는지 확인 (true: 존재 O, false: 존재 X) **/
    @Override
    public Boolean findChatRoom(ChatRoomReq chatRoomReq) {
        User user1 = userRepositorySupport.findUserByUserNickname(chatRoomReq.getUserNickname1()).orElse(null);
        User user2 = userRepositorySupport.findUserByUserNickname(chatRoomReq.getUserNickname2()).orElse(null);

        Criteria criteria = new Criteria();
        criteria.orOperator(new Criteria().andOperator(Criteria.where("userEmail1").is(user1.getUserEmail()), Criteria.where("userEmail2").is(user2.getUserEmail()))
                            , new Criteria().andOperator(Criteria.where("userEmail1").is(user2.getUserEmail()), Criteria.where("userEmail2").is(user1.getUserEmail())));
        Query query = new Query(criteria);
        List<ChatRoom> chatRoomList = mongoTemplate.find(query, ChatRoom.class);

        if(chatRoomList.size()==0) return false;    // 유저1과 유저2가 속한 채팅방이 존재 X
        return true;    // 이미 유저1과 유저2가 속한 채팅방이 존재
    }

    @Override
    public void deleteUserInfo(String id, String userEmail) {
        ChatRoom chatRoom = mongoTemplate.findOne(Query.query(Criteria.where("_id").is(id)), ChatRoom.class);

        if(chatRoom.getUserEmail1().length()==0 || chatRoom.getUserEmail2().length()==0) { // 이미 다른 유저가 나간 경우, 채팅방을 바로 삭제
            mongoTemplate.remove(Query.query(Criteria.where("_id").is(id)), ChatRoom.class);
        } else {    // 아직 채팅방에 유저가 존재하는 경우, 현재 유저 정보만 채팅방에서 삭제
            if(chatRoom.getUserEmail1().equals(userEmail)) {
                mongoTemplate.updateFirst(
                        Query.query(Criteria.where("_id").is(id)),
                        Update.update("userEmail1", ""),
                        ChatRoom.class
                );
            } else {
                mongoTemplate.updateFirst(
                        Query.query(Criteria.where("_id").is(id)),
                        Update.update("userEmail2", ""),
                        ChatRoom.class
                );
            }
        }
    }
}
