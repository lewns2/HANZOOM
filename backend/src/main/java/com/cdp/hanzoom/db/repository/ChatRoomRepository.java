package com.cdp.hanzoom.db.repository;

import com.cdp.hanzoom.db.entity.ChatRoom;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRoomRepository extends MongoRepository<ChatRoom, String> {

//    @Query("{$or : [{userEmail : ?0}, {userEmail : ?0}]}")
//    List<ChatRoom> findAllByUserEmail(String userEmail1, String userEmail2);
}
