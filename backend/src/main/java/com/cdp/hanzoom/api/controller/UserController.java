package com.cdp.hanzoom.api.controller;

import com.cdp.hanzoom.api.request.UserRegisterReq;
import com.cdp.hanzoom.api.request.UserUpdateLatAndLngReq;
import com.cdp.hanzoom.api.request.UserUpdateReq;
import com.cdp.hanzoom.api.service.UserService;
import com.cdp.hanzoom.db.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.cdp.hanzoom.api.response.UserRes;
import com.cdp.hanzoom.common.auth.UserDetails;
import com.cdp.hanzoom.common.model.response.BaseResponseBody;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import springfox.documentation.annotations.ApiIgnore;

import java.util.NoSuchElementException;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "유저 API", tags = {"User"})
@RestController
@RequestMapping("/api/users")
public class UserController {
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	@Autowired
    UserService userService;

	// 회원 가입
	@PostMapping("/register/signup")
	@ApiOperation(value = "회원 가입", notes = "<strong>이메일과 패스워드</strong>를 통해 회원가입 한다." +
			"닉네임은 3~ 12자리 수 이다." +
			"비밀번호는 숫자, 문자, 특수기호를 조합하여 8 ~ 12 자리로 구성된다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<? extends BaseResponseBody> registerSignUp(
			@RequestBody @ApiParam(value="회원가입 정보", required = true) UserRegisterReq registerInfo) {
		//임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
		User user = userService.registerUser(registerInfo);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}
	
	@GetMapping("/find/me")
	@ApiOperation(value = "회원 본인 정보 조회", notes = "로그인한 회원 본인의 정보를 응답한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<UserRes> getUserInfo(@ApiIgnore Authentication authentication) {
		/**
		 * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
		 * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
		 */
		UserDetails userDetails = (UserDetails)authentication.getDetails();
		String userEmail = userDetails.getUsername();
		User user = userService.getUserByUserEmail(userEmail);
		
		return ResponseEntity.status(200).body(UserRes.of(user));
	}
	// 회원 정보 수정 (닉네임, 비밀번호 수정)
	@ApiOperation(value = "회원 정보 수정 (닉네임, 비밀번호 수정) (token)", notes = "회원 정보 수정 (닉네임, 비밀번호 수정)")
	@PutMapping("/update")
	public ResponseEntity<String> updateUser(@RequestBody UserUpdateReq updateUserDto, @ApiIgnore Authentication authentication) throws Exception {
		UserDetails userDetails = (UserDetails)authentication.getDetails();
		String userEmail = userDetails.getUsername();
		User user;
		try {
			user = userService.getUserByUserEmail(userEmail);
		}catch(NoSuchElementException E) {
			System.out.println("회원 수정 실패");
			return  ResponseEntity.status(500).body("해당 회원 정보가 없어서 회원 수정 실패");
		}
		userService.updateUser(user,updateUserDto);
		System.out.println("회원 정보 수정 성공");
		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
	}

	@ApiOperation(value = "회원 약속 장소의 위도 경도 수정 (token)", notes = "회원 약속 장소의 위도 경도 수정")
	@PutMapping("/update/latAndlng")
	public ResponseEntity<String> updateUserLatitudeAndLongitudeOfTheMeetingPlace (@RequestBody UserUpdateLatAndLngReq updateUserLatAndLngDto, @ApiIgnore Authentication authentication) throws Exception {
		UserDetails userDetails = (UserDetails)authentication.getDetails();
		String userEmail = userDetails.getUsername();
		User user;
		try {
			user = userService.getUserByUserEmail(userEmail);
		}catch(NoSuchElementException E) {
			System.out.println("회원 약속 장소의 위도 경도 수정 실패");
			return  ResponseEntity.status(500).body("해당 회원 정보가 없어서 회원 수정 실패");
		}
		userService.updateUserLatAndLng(user,updateUserLatAndLngDto);
		System.out.println("회원 약속 장소의 위도 경도 수정 성공");
		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
	}

//	회원탈퇴.
	@ApiOperation(value = "회원 탈퇴(token)", notes = "회원 탈퇴")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "해당 회원 없음")})
	@DeleteMapping("/remove")
	public ResponseEntity<String> deleteUser(@ApiIgnore Authentication authentication) throws Exception {
		UserDetails userDetails = (UserDetails)authentication.getDetails();
		String userEmail = userDetails.getUsername();
		boolean result;
		try {
			User user = userService.getUserByUserEmail(userEmail);
			result = userService.deleteByUserEmail(user);
		}catch(NoSuchElementException E) {
			return  ResponseEntity.status(500).body("해당 회원 없어서 회원 탈퇴 실패");
		}
		return ResponseEntity.status(200).body("회원 탈퇴 성공");
	}

//	아이디 중복 체크
	@GetMapping("/nicknameCheck/{userNickname}")
	@ApiOperation(value = "회원 닉네임 중복 체크", notes = "회원가입 시 회원 닉네임 중복 체크 검사 - <strong> true : 중복 없음 , false : 중복 있음<strong> ")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<Boolean> userNicknameCheck(@PathVariable("userNickname") String userNickname) {
		System.out.println(userService.checkUserNickName(userNickname));
		if (userService.checkUserNickName(userNickname) == true) {
			System.out.println("NickName 중복이 없다");
			return ResponseEntity.status(200).body(userService.checkUserNickName(userNickname));
		} else System.out.println("NickName 중복이 있다.");
		return ResponseEntity.status(200).body(userService.checkUserNickName(userNickname));
	}

//	이메일 중복 체크
	@GetMapping("/emailCheck/{userEmail}")
	@ApiOperation(value = "회원 이메일 중복 체크", notes = "회원가입 시 회원 이메일 중복 체크 검사. "
			+ "<strong>이메일이 중복: false, 이메일이 중복x : true 리턴시킴 <strong>")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<Boolean> userEmailCheck(@PathVariable("userEmail") String userEmail) {
		System.out.println(">>>>>>>>>>>>>>>>>>>>> emailCheck : " + userService.checkUserEmail(userEmail));
		if (userService.checkUserEmail(userEmail)==true) { // 이메일 중복이 없다면.
			return ResponseEntity.status(200).body(true);
		} else return ResponseEntity.status(200).body(false);
	}
}
