package com.cdp.hanzoom.api.controller;

import com.cdp.hanzoom.api.request.KaKaoUserRegisterReq;
import com.cdp.hanzoom.api.request.UserLoginReq;
import com.cdp.hanzoom.api.request.UserRegisterReq;
import com.cdp.hanzoom.api.service.KaKaoService;
import com.cdp.hanzoom.api.service.UserService;
import com.cdp.hanzoom.db.entity.User;
import com.cdp.hanzoom.db.entity.UserReportHistory;
import com.cdp.hanzoom.db.repository.UserRepository;
import com.cdp.hanzoom.db.repository.UserRepositorySupport;
import org.joda.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.cdp.hanzoom.api.response.UserLoginRes;
import com.cdp.hanzoom.common.model.response.BaseResponseBody;
import com.cdp.hanzoom.common.util.JwtTokenUtil;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.ApiResponse;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.StringTokenizer;


/**
 * 인증 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "인증 API", tags = {"Auth."})
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    UserService userService;
    @Autowired
    KaKaoService kaKaoService;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    UserRepository userRepository;
    @Autowired
    UserRepositorySupport userRepositorySupport;

    @PostMapping("/login")
    @ApiOperation(value = "로그인", notes = "<strong>아이디와 패스워드</strong>를 통해 로그인 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = UserLoginRes.class),
            @ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
            @ApiResponse(code = 406, message = "허용되지 않음", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<UserLoginRes> login(@RequestBody @ApiParam(value="로그인 정보", required = true) UserLoginReq loginInfo) {
        String userEmail = loginInfo.getUserEmail();
        String userPassword = loginInfo.getUserPassword();

        User user = userService.getUserByUserEmail(userEmail);

        // 브라우저 토큰 저장
        if(loginInfo.getBrowserToken() != null) {
            user.updateBrowserToken(loginInfo.getBrowserToken());
            userRepository.save(user);
        }

        // 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
        if(passwordEncoder.matches(userPassword, user.getUserPassword())) {
            // 해당 유저의 신고 누적횟수가 3회 이상이면, 이용 제한
            if(userRepositorySupport.findReportedNumber(user.getUserEmail()) > 2) {
                return ResponseEntity.status(403).body(UserLoginRes.of(403, "Banned User", null));
            }
            // 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
            return ResponseEntity.ok(UserLoginRes.of(200, "Success", JwtTokenUtil.getToken(userEmail)));
        }

        // 유효하지 않는 패스워드인 경우, 로그인 실패로 응답.
        return ResponseEntity.status(401).body(UserLoginRes.of(401, "Invalid Password", null));
    }
    
    @PostMapping(value="/kakao/{code}")
    @ApiOperation(value = "카카오 로그인", notes = "<strong> Access 토큰 받기 요청에 필요한 인가 코드(code)를 입력 받아 온 뒤, 카카오 정보를 가져와 회원 가입 및 로그인 시켜 준다.</strong>.")
    public Object login(@PathVariable("code") String code) {
        System.out.println("code>>>>>>>>>>>>>"+ code);
        String access_Token = kaKaoService.getAccessToken(code);
        System.out.println("debug>>>>>>>>>>>>"+access_Token);
        HashMap<String, Object> userInfo = kaKaoService.getUserInfo(access_Token);
        String userEmail = (String) userInfo.get("email");
        String nickname = (String) userInfo.get("nickname");
        String profile = (String) userInfo.get("profile");
        System.out.println("debug>>>>>>>>>>>>"+userEmail);
        System.out.println("debug>>>>>>>>>>>>>>"+nickname);
        System.out.println("debug>>>>>>>>>>>>>>"+profile);
        User user = userService.getUserByUserEmail(userEmail);

        // 카카오 정보로 회원 가입이 안 되어 있다면
        if(user ==null) {
             // 회원 가입 로직
            KaKaoUserRegisterReq registerInfo = new KaKaoUserRegisterReq();
            registerInfo.setUserEmail(userEmail);
            registerInfo.setUserNickname(nickname);

            String input = LocalTime.now().toString().toString(); // ex) 11:49:47.176
            StringTokenizer st = new StringTokenizer(input, ":|.");
            StringBuilder sb = new StringBuilder();
            while (st.hasMoreTokens()) {sb.append(st.nextToken());}
            registerInfo.setUserPassword(sb.toString());
            registerInfo.setUserImage(profile);
            //임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
            user = kaKaoService.registerUser(registerInfo);
        }

        if(userRepositorySupport.findReportedNumber(user.getUserEmail()) > 2) {
            return ResponseEntity.status(403).body(UserLoginRes.of(403, "Banned User", null));
        }

        // 회원 가입이 되어 있다면, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
        return ResponseEntity.ok(UserLoginRes.of(200, "Success", JwtTokenUtil.getToken(user.getUserEmail())));
    }
}
