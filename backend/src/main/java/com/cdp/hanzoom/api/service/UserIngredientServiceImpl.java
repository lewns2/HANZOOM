package com.cdp.hanzoom.api.service;

import com.cdp.hanzoom.api.request.UserIngredientRegisterReq;
import com.cdp.hanzoom.api.request.UserIngredientUpdateReq;
import com.cdp.hanzoom.api.response.UserIngredientFindRes;
import com.cdp.hanzoom.api.response.UserIngredientRes;
import com.cdp.hanzoom.db.entity.Ingredient;
import com.cdp.hanzoom.db.entity.User;
import com.cdp.hanzoom.db.entity.UserIngredient;
import com.cdp.hanzoom.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service("userIngredientService")
public class UserIngredientServiceImpl implements UserIngredientService {

    @Autowired
    UserRepositorySupport userRepositorySupport;

    @Autowired
    UserIngredientRepository userIngredientRepository;

    @Autowired
    UserIngredientRepositorySupport userIngredientRepositorySupport;

    @Autowired
    IngredientRepository ingredientRepository;

    @Autowired
    IngredientRepositorySupport ingredientRepositorySupport;

    /** 유저 식재료 정보를 생성하는 registerUserIngredient 입니다. **/
    @Override
    public UserIngredient registerUserIngredient(UserIngredientRegisterReq userIngredientRegisterReq, String userEmail) {

        LocalDate expirationDate = LocalDate.parse(userIngredientRegisterReq.getExpirationDate().substring(0,10), DateTimeFormatter.ISO_DATE);

        Ingredient ingredient = ingredientRepositorySupport.findByIngredientName(userIngredientRegisterReq.getIngredientName()).orElse(null);

        UserIngredientRes userIngredientRes = new UserIngredientRes();
        userIngredientRes.setUserEmail(userEmail);
        userIngredientRes.setIngredientNo(ingredient.getIngredientNo());
        userIngredientRes.setType("일반");
        userIngredientRes.setExpirationDate(expirationDate);

        userIngredientRepository.save(userIngredientRes.toEntity());

        return null;
    }

    /** 유저 식재료 정보를 전체 조회하는 findAllUserIngredient 입니다. **/
    @Override
    public List<UserIngredientFindRes> findAllUserIngredient(String userEmail) {
        User user = userRepositorySupport.findUserByUserEmail(userEmail).orElse(null);
        List<UserIngredient> userIngredientList = userIngredientRepositorySupport.findAllByUserEmail(user);

        List<UserIngredientFindRes> userIngredientFindResList = new ArrayList<UserIngredientFindRes>();
        for(int i=0; i<userIngredientList.size(); i++) {
            UserIngredientFindRes userIngredientFindRes = new UserIngredientFindRes();
            userIngredientFindRes.setIngredientNo(userIngredientList.get(i).getUserIngredientId().getIngredientNo().getIngredientNo());
            userIngredientFindRes.setIngredientName(userIngredientList.get(i).getUserIngredientId().getIngredientNo().getIngredientName());
            userIngredientFindRes.setUserEmail(userIngredientList.get(i).getUserIngredientId().getUserEmail().getUserEmail());
            userIngredientFindRes.setType(userIngredientList.get(i).getType());
            userIngredientFindRes.setExpirationDate(userIngredientList.get(i).getExpirationDate());
            userIngredientFindRes.setBoardNo(userIngredientList.get(i).getBoardNo());
            userIngredientFindResList.add(userIngredientFindRes);
        }
        return userIngredientFindResList;
    }

    /** ingredientName과 userEmail을 이용하여 유저 식재료 디테일 조회하는 findUserIngredientByIngredientName 입니다. **/
    @Override
    public UserIngredientFindRes findByIngredientNameAndUserEmail(String ingredientName, String userEmail) {
        User user = userRepositorySupport.findUserByUserEmail(userEmail).orElse(null);
        Ingredient ingredient = ingredientRepositorySupport.findByIngredientName(ingredientName).orElse(null);
        // 해당 식재료 찾기
        UserIngredient userIngredient = userIngredientRepositorySupport.findByIngredientNameAndUserEmail(ingredient, user).orElse(null);

        UserIngredientFindRes userIngredientFindRes = new UserIngredientFindRes();
        userIngredientFindRes.setIngredientNo(userIngredient.getUserIngredientId().getIngredientNo().getIngredientNo());
        userIngredientFindRes.setIngredientName(ingredient.getIngredientName());
        userIngredientFindRes.setUserEmail(userIngredient.getUserIngredientId().getUserEmail().getUserEmail());
        userIngredientFindRes.setType(userIngredient.getType());
        userIngredientFindRes.setExpirationDate(userIngredient.getExpirationDate());
        userIngredientFindRes.setBoardNo(userIngredient.getBoardNo());

        return userIngredientFindRes;
    }

    /** ingredientName과 userEmail을 이용하여 유저 식재료 정보를 조회하는 findUserIngredientByIngredientName 입니다. **/
    @Override
    public UserIngredient findUserIngredientByIngredientNoAndUserEmail(Long ingredientNo, String userEmail) {
        User user = userRepositorySupport.findUserByUserEmail(userEmail).orElse(null);
        Ingredient ingredient = ingredientRepositorySupport.findByIngredientNo(ingredientNo).orElse(null);

        return userIngredientRepositorySupport.findByIngredientNameAndUserEmail(ingredient, user).orElse(null);
    }

    /** 유저 식재료 정보를 수정하는 updateUserIngredient 입니다. **/
    @Transactional
    @Override
    public void updateUserIngredient(UserIngredientUpdateReq userIngredientUpdateReq, UserIngredient userIngredient) {
        Long ingredientNo = userIngredient.getUserIngredientId().getIngredientNo().getIngredientNo();
        String userEmail = userIngredient.getUserIngredientId().getUserEmail().getUserEmail();
        String type = userIngredientUpdateReq.getType();
        LocalDate expirationDate = LocalDate.parse(userIngredientUpdateReq.getExpirationDate().substring(0,10), DateTimeFormatter.ISO_DATE);
        userIngredientRepository.updateUserIngredient(ingredientNo, userEmail, type, expirationDate);
    }

    /** 유저 식재료 정보를 삭제하는 deleteUserIngredient 입니다. **/
    @Override
    public void deleteUserIngredient(UserIngredient userIngredient) {
        userIngredientRepository.delete(userIngredient);
    }
}