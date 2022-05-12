package com.cdp.hanzoom.db.repository;

import com.cdp.hanzoom.db.entity.QUser;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.cdp.hanzoom.db.entity.User;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 구현 정의.
 */
@Repository
public class UserRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QUser qUser = QUser.user;

    public Optional<User> findUserByUserEmail(String userEmail) {
        User user = jpaQueryFactory.select(qUser).from(qUser)
                .where(qUser.userEmail.eq(userEmail)).fetchOne();
        if(user == null) return Optional.empty();
        return Optional.ofNullable(user);
    }

    public Optional<User> findUserByUserNicknameAndUserEmail(String userEmail, String userNickname) {
        User user = jpaQueryFactory
                .select(qUser)
                .from(qUser)
                .where(qUser.userEmail.eq(userEmail).and(qUser.userNickname.eq(userNickname)))
                .fetchOne();
        if(user == null) return Optional.empty();
        return Optional.ofNullable(user);
    }
//     닉네임 중복체크 함수
    public boolean findByUserNicknameEquals(String userNickname) {
        User user = jpaQueryFactory.select(qUser).from(qUser)
                .where(qUser.userNickname.eq(userNickname)).fetchOne();
        if(user == null) return true;
        return false;
    }
    // 이메일 중복체크 함수
    public boolean  findByUserEmailEquals(String userEmail) {
        User user = jpaQueryFactory.select(qUser).from(qUser)
                .where(qUser.userEmail.eq(userEmail)).fetchOne();
        if(user == null) return true;
        return false; // 중복이 있다면 false
    }

    public Optional<User> findUserByUserNickname(String userNickname) {
        User user = jpaQueryFactory.select(qUser).from(qUser)
                .where(qUser.userNickname.eq(userNickname)).fetchOne();
        if(user == null) return Optional.empty();
        return Optional.ofNullable(user);
    }

    public int findReportedNumber(String userEmail) {
        int reportedNumber = jpaQueryFactory.select(qUser.reportedNumber).from(qUser)
                .where(qUser.userEmail.eq(userEmail)).fetchOne();

        return reportedNumber;
    }
}
