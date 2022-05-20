package com.cdp.hanzoom.api.service;

import com.cdp.hanzoom.api.request.KaKaoUserRegisterReq;
import com.cdp.hanzoom.api.request.UserRegisterReq;
import com.cdp.hanzoom.db.entity.User;

import java.util.HashMap;

public interface KaKaoService {
    public String getAccessToken (String authorize_code);
    public HashMap<String, Object> getUserInfo(String access_Token);
    User registerUser(KaKaoUserRegisterReq kaKaoUserRegisterReq); // 회원 가입
}
