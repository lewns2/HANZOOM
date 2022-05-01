package com.cdp.hanzoom.db.repository;

import com.cdp.hanzoom.model.MessageDto;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

//@EnableRedisRepositories
public interface RedisChatRoomRepository extends CrudRepository<MessageDto, String> {
    List<MessageDto> findAll();
}
