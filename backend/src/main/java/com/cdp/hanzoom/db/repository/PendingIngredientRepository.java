package com.cdp.hanzoom.db.repository;

import com.cdp.hanzoom.db.entity.PendingIngredient;
import com.cdp.hanzoom.db.entity.UserIngredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.time.LocalDate;

/**
 * 등록 요청 식재료 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface PendingIngredientRepository extends JpaRepository<PendingIngredient, Long> {
}