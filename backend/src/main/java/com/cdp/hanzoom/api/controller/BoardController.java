package com.cdp.hanzoom.api.controller;

import com.cdp.hanzoom.api.request.BoardRegisterReq;
import com.cdp.hanzoom.api.request.BoardUpdateReq;
import com.cdp.hanzoom.api.response.BoardFindAllRes;
import com.cdp.hanzoom.api.response.BoardFindRes;
import com.cdp.hanzoom.api.service.BoardService;
import com.cdp.hanzoom.common.model.response.BaseResponseBody;
import com.cdp.hanzoom.db.entity.Board;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "게시판 API", tags = {"Board"})
@RestController
@RequestMapping("/api/board")
public class BoardController {

    @Autowired
    BoardService boardService;

    // 게시글 등록
    @PostMapping("/register")
    @ApiOperation(value = "게시글 등록", notes = "<strong>게시글 등록</strong>한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> registerBoard(
            @RequestPart(value="key") BoardRegisterReq boardRegisterReq
            , @RequestPart(value="file") MultipartFile imagePath
            , @ApiIgnore Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getDetails();
        String userEmail = userDetails.getUsername();
        try {
            boardRegisterReq.setUserEmail(userEmail);
            Board board = boardService.registerBoard(imagePath, boardRegisterReq);
        } catch (Exception E) {
            E.printStackTrace();
            ResponseEntity.status(400).body(BaseResponseBody.of(500, "DB Transaction Failed"));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "SUCCESS"));
    }

    // 게시글 전체 조회
    /**
     * pagination
     * page랑 size랑 sort는 url에 담아서 넘겨줘야 함.
     * PageableDefault 에 page 는 기본 0이 처음 페이지 시작 / 인자로 받는 page는 1이 맨 처음 페이지 이다.
     */
    @GetMapping("/findAll")
    @ApiOperation(value = "게시글 전체 조회", notes = "<strong>게시글 조회(페이지네이션 이용)</strong>한다. 페이지수, 페이지 사이즈, 정렬방법은 url에 담아주면 된다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<Page<BoardFindAllRes>> findAllBoard(
            @PageableDefault(page = 0, size = 8, sort = "boardNo", direction = Sort.Direction.DESC) Pageable pageable
            , @ApiIgnore Authentication authentication
    ) {
        UserDetails userDetails = (UserDetails) authentication.getDetails();
        String userEmail = userDetails.getUsername();
        Page<Board> boards = boardService.findAllBoard(pageable);
        Page<BoardFindAllRes> boardFindAllRes = boardService.findInfoFindAllBoard(boards, userEmail);
        return ResponseEntity.status(200).body(boardFindAllRes);
    }

    // 게시글 상세 조회
    @GetMapping("/find/{boardNo}")
    @ApiOperation(value = "게시글 상세 조회", notes = "<strong>게시글 조회</strong>한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BoardFindRes> findBoard(
            @PathVariable Long boardNo
            , @ApiIgnore Authentication authentication
    ) {
        UserDetails userDetails = (UserDetails) authentication.getDetails();
        String userEmail = userDetails.getUsername();
        BoardFindRes boardFindRes = boardService.findBoardByBoardNo(boardNo, userEmail);
        return ResponseEntity.status(200).body(boardFindRes);
    }

    // 게시글 찜하기
    @PostMapping("/like/{boardNo}")
    @ApiOperation(value = "게시글 찜하기", notes = "<strong>게시글 찜</strong>한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> boardLike(@PathVariable Long boardNo, @ApiIgnore Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getDetails();
        String userEmail = userDetails.getUsername();
        boardService.setLikeList(boardNo, userEmail);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "SUCCESS"));
    }

    // 게시글 수정
    @PutMapping("/update")
    @ApiOperation(value = "게시글 수정", notes = "<strong>게시글 수정</strong>한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BoardFindRes> updateBoard(
            @RequestPart(value="key") BoardUpdateReq boardUpdateReq
            , @RequestPart(value="file", required = false) MultipartFile imagePath
            , @ApiIgnore Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getDetails();
        String userEmail = userDetails.getUsername();
        BoardFindRes boardFindRes = new BoardFindRes();
        try {
            boardUpdateReq.setUserEmail(userEmail);
            boardFindRes = boardService.updateBoard(imagePath, boardUpdateReq);
        } catch (Exception E) {
            E.printStackTrace();
            ResponseEntity.status(400).body(BaseResponseBody.of(500, "DB Transaction Failed"));
        }
        return ResponseEntity.status(200).body(boardFindRes);
    }

    // 게시글 삭제
    @DeleteMapping("/remove/{boardNo}")
    @ApiOperation(value = "게시글 삭제", notes = "<strong>게시글 삭제</strong>한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> deleteBoard(@PathVariable Long boardNo) {
        boardService.deleteBoard(boardNo);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "SUCCESS"));
    }

}
