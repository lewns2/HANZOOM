package com.cdp.hanzoom.api.service;

import com.cdp.hanzoom.api.response.IngredientRes;
import com.cdp.hanzoom.db.entity.Ingredient;
import com.cdp.hanzoom.db.repository.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("ingredientService")
public class IngredientServiceImpl implements IngredientService {

    @Autowired
    IngredientRepository ingredientRepository;

    @Override
    public List<IngredientRes> findAllIngredient() {
        List<Ingredient> ingredientList = ingredientRepository.findAll();   // 전체 조회
        List<IngredientRes> ingredientResList = new ArrayList<IngredientRes>();

        for(int i=0; i<ingredientList.size(); i++) {
            IngredientRes ingredientRes = IngredientRes.builder()
                    .ingredientNo(ingredientList.get(i).getIngredientNo())
                    .ingredientName(ingredientList.get(i).getIngredientName())
                    .build();
            ingredientResList.add(ingredientRes);
        }

        return ingredientResList;
    }
}
