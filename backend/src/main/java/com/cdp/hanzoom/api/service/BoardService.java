package com.cdp.hanzoom.api.service;

import com.cdp.hanzoom.api.request.BoardRegisterReq;
import com.cdp.hanzoom.api.request.BoardUpdateReq;
import com.cdp.hanzoom.api.response.BoardFindAllRes;
import com.cdp.hanzoom.api.response.BoardFindRes;
import com.cdp.hanzoom.db.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

public interface BoardService {
    // 게시글 등록
    Board registerBoard(MultipartFile imagePath, BoardRegisterReq boardRegisterReq) throws Exception;
    // 게시글 전체조회
    Page<Board> findAllBoard(Pageable pageable);
    Page<BoardFindAllRes> findInfoFindAllBoard(Page<Board> boards, String userEmail);
    // 게시글 상세조회
    BoardFindRes findBoardByBoardNo(Long boardNo, String userEmail);
    // 게시글 찜하기
    void setLikeList(Long boardNo, String userEmail);
    // 게시글 수정
    BoardFindRes updateBoard(MultipartFile imagePath, BoardUpdateReq boardUpdateReq) throws Exception;
    // 게시글 삭제
    void deleteBoard(Long boardNo);
}
