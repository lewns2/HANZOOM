package com.cdp.hanzoom.db.repository;

import com.cdp.hanzoom.db.entity.*;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class PlanRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QPlan qPlan = QPlan.plan;

    // 게시글 번호를 가지고 일정을 조회.
    public Optional<Plan> findPlanByBoardNo(Long boardNo) {
        Plan plan = jpaQueryFactory
                .select(qPlan)
                .from(qPlan)
                .where(qPlan.boardNo.eq(boardNo))
                .fetchOne();
        if(plan == null) return Optional.empty();
        return Optional.ofNullable(plan);
    }

    // 본인 이메일로 일정 목록 조회
    public List<Plan> findPlanByMyEmailOrOpponentEmail(String userEmail) {
        List<Plan> planLists = jpaQueryFactory
                .select(qPlan)
                .from(qPlan)
                .where(qPlan.user.userEmail.eq(userEmail).or(qPlan.opponent.eq(userEmail)))
                .orderBy(qPlan.scheduleDatetime.desc())
                .fetch();
        if(planLists == null) return null;
        return planLists;
    }
}
