package com.cdp.hanzoom.db.repository;

import com.cdp.hanzoom.db.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom,String> {
    @Query(value = "select c from ChatRoomDto c where c.chatroom_id=:id", nativeQuery = true)
    Optional<ChatRoom> findById(@Param("id") String id);

    @Query(value = "select c from ChatRoomDto c where c.user1=:userEmail", nativeQuery = true)
    List<ChatRoom> findChatRoomByUser(@Param("userEmail") String userEmail);

}