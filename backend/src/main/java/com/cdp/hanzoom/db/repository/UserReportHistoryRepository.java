package com.cdp.hanzoom.db.repository;

import com.cdp.hanzoom.api.response.UserReportHistoryFindAllRes;
import com.cdp.hanzoom.db.entity.UserReportHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

/**
 * 유저 신고 기록 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface UserReportHistoryRepository extends JpaRepository<UserReportHistory, Long> {

    @Query(value = "select report_no as reportNo, content, created_at as createdAt, reported, reporter, reported_number as reportedNumber, status \t\n" +
            "from user_report_history h join user u \t\n" +
            "on u.user_email = h.reported ", nativeQuery = true)
    List<UserReportHistoryFindAllRes> findAllUserReportHistory();

    @Transactional
    @Modifying
    @Query(value = "update user_report_history \t\n" +
            "set status = :status \t\n" +
            "where report_no = :reportNo ", nativeQuery = true)
    void updateState(@Param("reportNo") Long reportNo, @Param("status") String status);
}