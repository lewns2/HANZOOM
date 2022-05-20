package com.cdp.hanzoom.api.service;

import com.cdp.hanzoom.api.response.IngredientRes;

import java.util.List;

/**
 *	식재료 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface IngredientService {
    /** 식재료 전체 조회를 위한 findAllIngredient 입니다. **/
    List<IngredientRes> findAllIngredient();
}
