package com.cdp.hanzoom.db.repository;

import com.cdp.hanzoom.db.entity.Plan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * 일정 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface PlanRepository extends JpaRepository<Plan, Long> {

}
