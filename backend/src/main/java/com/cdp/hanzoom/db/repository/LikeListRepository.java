package com.cdp.hanzoom.db.repository;

import com.cdp.hanzoom.db.entity.LikeList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeListRepository extends JpaRepository<LikeList, Long> {
}
