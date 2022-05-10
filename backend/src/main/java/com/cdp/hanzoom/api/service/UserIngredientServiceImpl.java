package com.cdp.hanzoom.api.service;

import com.cdp.hanzoom.api.request.UserIngredientRegisterReq;
import com.cdp.hanzoom.api.request.UserIngredientStatusUpdateReq;
import com.cdp.hanzoom.api.request.UserIngredientTypeUpdateReq;
import com.cdp.hanzoom.api.response.UserIngredientBoardRes;
import com.cdp.hanzoom.api.response.UserIngredientFindRes;
import com.cdp.hanzoom.db.entity.Board;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("userIngredientService")
public class UserIngredientServiceImpl implements UserIngredientService {

    @Autowired
    UserRepositorySupport userRepositorySupport;

    @Autowired
    UserIngredientRepository userIngredientRepository;

    @Autowired
    UserIngredientRepositorySupport userIngredientRepositorySupport;

    @Autowired
    IngredientRepositorySupport ingredientRepositorySupport;

    @Autowired
    BoardRepositorySupport boardRepositorySupport;

    /** 유저 식재료 정보를 생성하는 registerUserIngredient 입니다. **/
    @Override
    public void registerUserIngredient(UserIngredientRegisterReq userIngredientRegisterReq, String userEmail) {

        LocalDate purchaseDate = null;
        LocalDate expirationDate = null;

        if(userIngredientRegisterReq.getPurchaseDate().length() != 0) {
            purchaseDate = LocalDate.parse(userIngredientRegisterReq.getPurchaseDate().substring(0,10), DateTimeFormatter.ISO_DATE);
        }

        if(userIngredientRegisterReq.getExpirationDate().length() != 0) {
            expirationDate = LocalDate.parse(userIngredientRegisterReq.getExpirationDate().substring(0,10), DateTimeFormatter.ISO_DATE);
        }

        Ingredient ingredient = ingredientRepositorySupport.findByIngredientName(userIngredientRegisterReq.getIngredientName()).orElse(null);

        User user = userRepositorySupport.findUserByUserEmail(userEmail).orElse(null);
        UserIngredient userIngredient = new UserIngredient();
        userIngredient.setUser(user);
        if(ingredient == null) {
            userIngredient.setIngredient(null);
            userIngredient.setStatus("대기");
        } else {
            userIngredient.setIngredient(ingredient);
            userIngredient.setStatus("일반");
        }
        userIngredient.setType(userIngredientRegisterReq.getType());
        userIngredient.setPurchaseDate(purchaseDate);
        userIngredient.setExpirationDate(expirationDate);

        userIngredientRepository.save(userIngredient);
    }

    /** 유저 식재료 정보를 전체 조회하는 findAllUserIngredient 입니다. **/
    @Override
    public List<UserIngredientFindRes> findAllUserIngredient(String userEmail) {
        User user = userRepositorySupport.findUserByUserEmail(userEmail).orElse(null);
        List<UserIngredient> userIngredientList = userIngredientRepositorySupport.findAllByUserEmail(user.getUserEmail());

        List<UserIngredientFindRes> userIngredientFindResList = new ArrayList<UserIngredientFindRes>();
        for(int i=0; i<userIngredientList.size(); i++) {
            UserIngredientFindRes userIngredientFindRes = new UserIngredientFindRes();
            userIngredientFindRes.setUserIngredientNo(userIngredientList.get(i).getUserIngredientNo());
            if(userIngredientList.get(i).getIngredient() == null) {
                userIngredientFindRes.setIngredientNo(null);
                userIngredientFindRes.setIngredientName(null);
            } else {
                userIngredientFindRes.setIngredientNo(userIngredientList.get(i).getIngredient().getIngredientNo());
                userIngredientFindRes.setIngredientName(userIngredientList.get(i).getIngredient().getIngredientName());
            }
            userIngredientFindRes.setUserEmail(userIngredientList.get(i).getUser().getUserEmail());
            userIngredientFindRes.setType(userIngredientList.get(i).getType());
            userIngredientFindRes.setPurchaseDate(userIngredientList.get(i).getPurchaseDate());
            userIngredientFindRes.setExpirationDate(userIngredientList.get(i).getExpirationDate());
            userIngredientFindRes.setBoardNo(userIngredientList.get(i).getBoardNo());
            userIngredientFindRes.setStatus(userIngredientList.get(i).getStatus());
            userIngredientFindResList.add(userIngredientFindRes);
        }
        return userIngredientFindResList;
    }

    /** ingredientNo을 이용하여 유저 식재료 디테일 조회하는 findUserIngredientByIngredientName 입니다. **/
    @Override
    public UserIngredientFindRes findByUserIngredientNo(Long userIngredientNo) {
        // 해당 식재료 찾기
        UserIngredient userIngredient = userIngredientRepositorySupport.findByUserIngredientNo(userIngredientNo).orElse(null);
        Ingredient ingredient = ingredientRepositorySupport.findByIngredientNo(userIngredient.getIngredient().getIngredientNo()).orElse(null);

        UserIngredientFindRes userIngredientFindRes = new UserIngredientFindRes();
        userIngredientFindRes.setUserIngredientNo(userIngredient.getUserIngredientNo());
        userIngredientFindRes.setIngredientNo(userIngredient.getIngredient().getIngredientNo());
        userIngredientFindRes.setIngredientName(ingredient.getIngredientName());
        userIngredientFindRes.setUserEmail(userIngredient.getUser().getUserEmail());
        userIngredientFindRes.setType(userIngredient.getType());
        userIngredientFindRes.setPurchaseDate(userIngredient.getPurchaseDate());
        userIngredientFindRes.setExpirationDate(userIngredient.getExpirationDate());
        userIngredientFindRes.setBoardNo(userIngredient.getBoardNo());
        userIngredientFindRes.setStatus(userIngredient.getStatus());

        return userIngredientFindRes;
    }

    /** ingredientName과 userEmail을 이용하여 유저 식재료 정보를 조회하는 findUserIngredientByIngredientName 입니다. **/
    @Override
    public UserIngredient findUserIngredientByUserIngredientNoAndUserEmail(Long ingredientNo, String userEmail) {
        User user = userRepositorySupport.findUserByUserEmail(userEmail).orElse(null);
        Ingredient ingredient = ingredientRepositorySupport.findByIngredientNo(ingredientNo).orElse(null);

        return userIngredientRepositorySupport.findByIngredientNoAndUserEmail(ingredient.getIngredientNo(), user.getUserEmail()).orElse(null);
    }

    /** 유저 식재료 정보를 수정하는 updateUserIngredient 입니다. **/
    @Transactional
    @Override
    public void updateUserIngredient(UserIngredientTypeUpdateReq userIngredientTypeUpdateReq) {
//        Long ingredientNo = userIngredient.getIngredient().getIngredientNo();
        Ingredient ingredient = ingredientRepositorySupport.findByIngredientName(userIngredientTypeUpdateReq.getIngredientName()).orElse(null);

        Long userIngredientNo = userIngredientTypeUpdateReq.getUserIngredientNo();
        Long ingredientNo = ingredient.getIngredientNo();
        String type = userIngredientTypeUpdateReq.getType();

        LocalDate purchaseDate = null;
        LocalDate expirationDate = null;

        if(userIngredientTypeUpdateReq.getPurchaseDate().length() != 0) {
            purchaseDate = LocalDate.parse(userIngredientTypeUpdateReq.getPurchaseDate().substring(0,10), DateTimeFormatter.ISO_DATE);
        }

        if(userIngredientTypeUpdateReq.getExpirationDate().length() != 0) {
            expirationDate = LocalDate.parse(userIngredientTypeUpdateReq.getExpirationDate().substring(0,10), DateTimeFormatter.ISO_DATE);
        }

        userIngredientRepository.updateUserIngredient(userIngredientNo, ingredientNo, type, purchaseDate, expirationDate);
    }

    /** 유저 식재료 등록상태(status) 정보를 수정하는 updateUserIngredientStatus 입니다. **/
    @Override
    public void updateUserIngredientStatus(UserIngredientStatusUpdateReq userIngredientStatusUpdateReq) {
        if(userIngredientStatusUpdateReq.getResult().equals("승인")) {
            userIngredientRepository.updateUserIngredientStatus(userIngredientStatusUpdateReq.getUserIngredientNo());
        } else if(userIngredientStatusUpdateReq.getResult().equals("거절")) {
            UserIngredient userIngredient = userIngredientRepositorySupport.findByUserIngredientNo(userIngredientStatusUpdateReq.getUserIngredientNo()).orElse(null);
            userIngredientRepository.delete(userIngredient);
        }
    }

    /** 유저 식재료 정보를 삭제하는 deleteUserIngredient 입니다. **/
    @Override
    public void deleteUserIngredient(UserIngredient userIngredient) {
        userIngredientRepository.delete(userIngredient);
    }

    /** 식재료 등록 요청한 정보들을 전체 조회하는 findAllPendingUserIngredient 입니다. **/
    @Override
    public List<UserIngredientFindRes> findAllPendingUserIngredient() {
        List<UserIngredientFindRes> userIngredientFindResList = userIngredientRepositorySupport.findAllPendingUserIngredient();
        return userIngredientFindResList;
    }

    @Override
    public List<UserIngredientBoardRes> findUserIngredientSortingBoardNo(String userEmail) {
        List<UserIngredient> userIngredients = userIngredientRepositorySupport.findAllByUserEmail(userEmail);
        HashMap<Long, List<String>> groupByBoardNo = new HashMap<Long, List<String>>();
        for(int i=0; i< userIngredients.size(); i++) {
            if(userIngredients.get(i).getBoardNo() == null) continue;
            if(groupByBoardNo.containsKey(userIngredients.get(i).getBoardNo())) {
                List<String> temp = groupByBoardNo.get(userIngredients.get(i).getBoardNo());
                temp.add(userIngredients.get(i).getIngredient().getIngredientName());
                groupByBoardNo.put(userIngredients.get(i).getBoardNo(), temp);
            } else {
                List<String> temp = new ArrayList<String>();
                temp.add(userIngredients.get(i).getIngredient().getIngredientName());
                groupByBoardNo.put(userIngredients.get(i).getBoardNo(), temp);
            }
        }

        List<UserIngredientBoardRes> userIngredientBoardResList = new ArrayList<>();
        for(Map.Entry<Long, List<String>> entrySet : groupByBoardNo.entrySet()) {
            UserIngredientBoardRes userIngredientBoardRes = new UserIngredientBoardRes();

            Long boardNo = entrySet.getKey();
            Board board = boardRepositorySupport.findBoardByBoardNo(boardNo).orElse(null);
            if(board == null) continue;
            userIngredientBoardRes.setBoard(board);
            userIngredientBoardRes.setIngredients(entrySet.getValue());

            userIngredientBoardResList.add(userIngredientBoardRes);
        }

        return userIngredientBoardResList;
    }
}
