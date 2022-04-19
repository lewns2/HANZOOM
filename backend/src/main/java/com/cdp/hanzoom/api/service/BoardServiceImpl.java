package com.cdp.hanzoom.api.service;

import com.cdp.hanzoom.api.request.BoardRegisterReq;
import com.cdp.hanzoom.api.response.BoardFindAllRes;
import com.cdp.hanzoom.api.response.BoardFindRes;
import com.cdp.hanzoom.db.entity.Board;
import com.cdp.hanzoom.db.entity.LikeList;
import com.cdp.hanzoom.db.repository.BoardRepository;
import com.cdp.hanzoom.db.repository.BoardRepositorySupport;
import com.cdp.hanzoom.db.repository.LikeListRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service("BoardService")
public class BoardServiceImpl implements BoardService{

    @Autowired
    S3FileUploadService s3FileUploadService;
    @Autowired
    BoardRepository boardRepository;
    @Autowired
    BoardRepositorySupport boardRepositorySupport;
    @Autowired
    LikeListRepositorySupport likeListRepositorySupport;

    @Override
    @Transactional
    public Board registerBoard(MultipartFile imagePath, BoardRegisterReq boardRegisterReq) throws Exception {
        // 이미지 업로드
        String savePath = s3FileUploadService.upload(imagePath);
        boardRegisterReq.setImagePath(savePath);

        // 게시판 테이블에 저장
        Board board  = boardRepository.save(boardRegisterReq.toEntity());

        // 식재료 테이블에 저장
        for (int i=0; i<boardRegisterReq.getIngredientList().size(); i++) {
            // board.getBoardNo()
        }

        return board;
    }

    @Override
    public Page<Board> findAllBoard(Pageable pageable) {
        Page<Board> boards = boardRepositorySupport.findAllBoard(pageable);
        return boards;
    }

    @Override
    public Page<BoardFindAllRes> findInfoFindAllBoard(Page<Board> boards, String userEmail) {
        List<BoardFindAllRes> boardFindAllResList = new ArrayList<>();
        Pageable pageable = boards.getPageable();
        long total = boards.getTotalElements();
        for (Board board : boards.getContent()) {
            BoardFindAllRes boardFindAllRes = new BoardFindAllRes();
            boardFindAllRes.setBoardNo(board.getBoardNo());
            boardFindAllRes.setDescription(board.getDescription());
            boardFindAllRes.setImagePath(board.getImagePath());
            boardFindAllRes.setStatus(board.getStatus());
            boardFindAllRes.setTitle(board.getTitle());
            boardFindAllRes.setViewCnt(board.getViewCnt());
            boardFindAllRes.setLikeCnt(board.getLikeCnt());
            boardFindAllRes.setUserNickname(board.getUser().getUserNickname());
            LikeList likeList = likeListRepositorySupport.findLikeListByUserEmailAndBoardNo(userEmail, board.getBoardNo()).orElse(null);
            boolean isLike;
            if(likeList == null) isLike = false;
            else isLike = true;
            boardFindAllRes.setLike(isLike);

            boardFindAllResList.add(boardFindAllRes);
        }

        Page<BoardFindAllRes> res = new PageImpl<BoardFindAllRes>(boardFindAllResList, pageable, total);
        return res;
    }

    @Override
    public BoardFindRes findBoardByBoardNo(Long boardNo, String userEmail) {
        Board board = boardRepositorySupport.findBoardByBoardNo(boardNo).orElse(null);
        board.increaseViewCnt();
        boardRepository.save(board);

        BoardFindRes res = new BoardFindRes();
        res.setBoardNo(board.getBoardNo());
        res.setDescription(board.getDescription());
        res.setImagePath(board.getImagePath());
        res.setStatus(board.getStatus());
        res.setTitle(board.getTitle());
        res.setViewCnt(board.getViewCnt());
        res.setLikeCnt(board.getLikeCnt());
        res.setUserNickname(board.getUser().getUserNickname());
        res.setUserImage(board.getUser().getUserImage());
        LikeList likeList = likeListRepositorySupport.findLikeListByUserEmailAndBoardNo(userEmail, boardNo).orElse(null);
        boolean isLike;
        if(likeList == null) isLike = false;
        else isLike = true;
        res.setLike(isLike);

        return res;
    }
}
