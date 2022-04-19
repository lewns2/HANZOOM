package com.cdp.hanzoom.db.repository;

import com.cdp.hanzoom.db.entity.Ingredient;
import com.cdp.hanzoom.db.entity.UserIngredient;
import com.cdp.hanzoom.db.entity.UserIngredientId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.time.LocalDate;

/**
 * 유저 식재료 모델 관련 디비 쿼리 생성을 위한 JPA Query Method 인터페이스 정의.
 */
@Repository
public interface UserIngredientRepository extends JpaRepository<UserIngredient, UserIngredientId> {
    @Transactional
    @Modifying
    @Query(value = "update user_ingredient \t\n" +
            "set type = :type, expiration_date = :expirationDate \t\n" +
            "where ingredient_no = :ingredientNo and user_email = :userEmail ", nativeQuery = true)
    void updateUserIngredient(@Param("ingredientNo") Long ingredientNo, @Param("userEmail") String userEmail, @Param("type") String type, @Param("expirationDate") LocalDate expirationDate);
}