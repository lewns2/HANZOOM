package com.cdp.hanzoom.db.repository;

import com.cdp.hanzoom.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface UserRepository extends JpaRepository<User, String> {
    // 아래와 같이, Query Method 인터페이스(반환값, 메소드명, 인자) 정의를 하면 자동으로 Query Method 구현됨.
    Optional<User> findUserByUserEmail(String userEmail);

    @Modifying
    @Transactional
    @Query(value = "update user\n" +
            "set reported_number = reported_number + 1\n" +
            "where user_email = :userEmail ", nativeQuery = true)
    void plusUserReportedNumber(@Param("userEmail") String userEmail);

    @Modifying
    @Transactional
    @Query(value = "update user\n" +
            "set reported_number = reported_number - 1\n" +
            "where user_email = :userEmail ", nativeQuery = true)
    void minusUserReportedNumber(@Param("userEmail") String userEmail);

}