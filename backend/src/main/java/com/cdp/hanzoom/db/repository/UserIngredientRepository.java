package com.cdp.hanzoom.db.repository;

import com.cdp.hanzoom.db.entity.UserIngredient;
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
public interface UserIngredientRepository extends JpaRepository<UserIngredient, Long> {
    @Transactional
    @Modifying
    @Query(value = "update user_ingredient \t\n" +
            "set type = :type, purchase_date = :purchaseDate, expiration_date = :expirationDate, ingredient_no = :ingredientNo \t\n" +
            "where user_ingredient_no = :userIngredientNo ", nativeQuery = true)
    void updateUserIngredient(@Param("userIngredientNo") Long userIngredientNo, @Param("ingredientNo") Long ingredientNo
            , @Param("type") String type, @Param("purchaseDate") LocalDate purchaseDate, @Param("expirationDate") LocalDate expirationDate);

    @Transactional
    @Modifying
    @Query(value = "update user_ingredient \t\n" +
            "set status = '일반' \t\n" +
            "where user_ingredient_no = :userIngredientNo ", nativeQuery = true)
    void updateUserIngredientStatus(@Param("userIngredientNo") Long userIngredientNo);

}