package com.cdp.hanzoom.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.RedisHash;

import javax.persistence.Id;

@RedisHash(value = "ChatRoomDto", timeToLive = -1L)
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ChatRoomDto {

    @Id
    private String roomId;

    private String name;

    private String user1;

    private String user2;

}
