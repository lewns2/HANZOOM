package com.cdp.hanzoom.db.repository;

import com.cdp.hanzoom.db.entity.LikeList;
import com.cdp.hanzoom.db.entity.QLikeList;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class LikeListRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QLikeList qLikeList = QLikeList.likeList;

    public Optional<LikeList> findLikeListByUserEmailAndBoardNo(String userEmail, Long boardNo) {
        LikeList likeList = jpaQueryFactory
                .select(qLikeList)
                .from(qLikeList)
                .where(qLikeList.user.userEmail.eq(userEmail).and(qLikeList.board.boardNo.eq(boardNo)))
                .fetchOne();
        if(likeList == null) return Optional.empty();
        return Optional.ofNullable(likeList);
    }
}
