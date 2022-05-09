package com.cdp.hanzoom.db.repository;

import com.cdp.hanzoom.db.entity.UserReportHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * 유저 신고 기록 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface UserReportHistoryRepository extends JpaRepository<UserReportHistory, Long> {

}