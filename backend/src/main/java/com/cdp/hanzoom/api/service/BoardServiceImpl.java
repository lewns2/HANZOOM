package com.cdp.hanzoom.api.service;

import com.cdp.hanzoom.api.request.BoardRegisterReq;
import com.cdp.hanzoom.api.request.BoardUpdateReq;
import com.cdp.hanzoom.api.response.BoardFindAllRes;
import com.cdp.hanzoom.api.response.BoardFindIngredientRes;
import com.cdp.hanzoom.api.response.BoardFindRes;
import com.cdp.hanzoom.db.entity.*;
import com.cdp.hanzoom.db.repository.*;
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
    LikeListRepository likeListRepository;
    @Autowired
    UserRepositorySupport userRepositorySupport;
    @Autowired
    BoardRepositorySupport boardRepositorySupport;
    @Autowired
    LikeListRepositorySupport likeListRepositorySupport;
    @Autowired
    IngredientRepositorySupport ingredientRepositorySupport;
    @Autowired
    UserIngredientRepository userIngredientRepository;
    @Autowired
    UserIngredientRepositorySupport userIngredientRepositorySupport;

    @Override
    @Transactional
    public Board registerBoard(MultipartFile imagePath, BoardRegisterReq boardRegisterReq) throws Exception {
        // 이미지 업로드
        String savePath = s3FileUploadService.upload(imagePath);
        boardRegisterReq.setImagePath(savePath);

        // 게시판 테이블에 저장
        boardRegisterReq.setStatus("거래전");
        Board board  = boardRepository.save(boardRegisterReq.toEntity());

        // 식재료 테이블 게시판 번호 저장 + type 변경
        for (int i=0; i<boardRegisterReq.getIngredientList().size(); i++) {
            User user = userRepositorySupport.findUserByUserEmail(boardRegisterReq.getUserEmail()).orElse(null);
            Ingredient ingredient = ingredientRepositorySupport.findByIngredientName(boardRegisterReq.getIngredientList().get(i)).orElse(null);
            UserIngredient userIngredient = userIngredientRepositorySupport.findByIngredientNameAndUserEmail(ingredient,user).orElse(null);;
            userIngredient.setBoardNo(board.getBoardNo());
            userIngredient.setType(boardRegisterReq.getType());
            userIngredientRepository.save(userIngredient);
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

            User user = userRepositorySupport.findUserByUserEmail(userEmail).orElse(null);
            Double latUser = user.getLat();
            Double lngUser = user.getLng();
            Double latBoard = board.getUser().getLat();
            Double lngBoard = board.getUser().getLng();
            Double X = (Math.cos(latUser)*6400*2*3.14/360) * Math.abs(lngUser-lngBoard);
            Double Y = 111*Math.abs(latUser-latBoard);
            Double distance = Math.sqrt(Math.pow(X,2)+Math.pow(Y,2));
            boardFindAllRes.setDistance(distance);

            LikeList likeList = likeListRepositorySupport.findLikeListByUserEmailAndBoardNo(userEmail, board.getBoardNo()).orElse(null);
            boolean isLike;
            if(likeList == null) isLike = false;
            else isLike = true;
            boardFindAllRes.setLike(isLike);

            List<UserIngredient> userIngredients = userIngredientRepositorySupport.findByBoardNo(board.getBoardNo());
            List<BoardFindIngredientRes> boardFindIngredientResList = new ArrayList<>();
            for(int i=0; i<userIngredients.size(); i++) {
                String ingredientName = userIngredients.get(i).getUserIngredientId().getIngredientNo().getIngredientName();
                String expirationDate = String.valueOf(userIngredients.get(i).getExpirationDate());
                boardFindIngredientResList.add(new BoardFindIngredientRes(ingredientName,expirationDate));
            }
            boardFindAllRes.setBoardFindIngredientResList(boardFindIngredientResList);

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

        User user = userRepositorySupport.findUserByUserEmail(userEmail).orElse(null);
        Double latUser = user.getLat();
        Double lngUser = user.getLng();
        Double latBoard = board.getUser().getLat();
        Double lngBoard = board.getUser().getLng();
        Double X = (Math.cos(latUser)*6400*2*3.14/360) * Math.abs(lngUser-lngBoard);
        Double Y = 111*Math.abs(latUser-latBoard);
        Double distance = Math.sqrt(Math.pow(X,2)+Math.pow(Y,2));
        res.setDistance(distance);

        LikeList likeList = likeListRepositorySupport.findLikeListByUserEmailAndBoardNo(userEmail, boardNo).orElse(null);
        boolean isLike;
        if(likeList == null) isLike = false;
        else isLike = true;
        res.setLike(isLike);

        List<UserIngredient> userIngredients = userIngredientRepositorySupport.findByBoardNo(board.getBoardNo());
        List<BoardFindIngredientRes> boardFindIngredientResList = new ArrayList<>();
        for(int i=0; i<userIngredients.size(); i++) {
            String ingredientName = userIngredients.get(i).getUserIngredientId().getIngredientNo().getIngredientName();
            String expirationDate = String.valueOf(userIngredients.get(i).getExpirationDate());
            boardFindIngredientResList.add(new BoardFindIngredientRes(ingredientName,expirationDate));
        }
        res.setBoardFindIngredientResList(boardFindIngredientResList);

        return res;
    }

    @Override
    public void setLikeList(Long boardNo, String userEmail) {
        Board board = boardRepositorySupport.findBoardByBoardNo(boardNo).orElse(null);
        User user = new User();
        user.setUserEmail(userEmail);

        LikeList likeList = likeListRepositorySupport.findLikeListByUserEmailAndBoardNo(userEmail, boardNo).orElse(null);
        if(likeList==null) {
            likeList = LikeList.builder()
                        .board(board)
                        .user(user)
                        .build();
            likeListRepository.save(likeList);
            board.increaseLikeCnt();
            boardRepository.save(board);
        } else {
            likeListRepository.delete(likeList);
            board.decreaseLikeCnt();
            boardRepository.save(board);
        }
    }

    @Override
    @Transactional
    public BoardFindRes updateBoard(MultipartFile imagePath, BoardUpdateReq boardUpdateReq) throws Exception {
        // 이미지 업로드
        if(imagePath != null) {
            String savePath = s3FileUploadService.upload(imagePath);
            boardUpdateReq.setImagePath(savePath);
        }

        // 게시판 테이블에 수정
        Board board  = boardRepository.save(boardUpdateReq.toEntity());

        // 기존 게시판에 해당하는 식재료 일반으로 저장
        List<UserIngredient> userIngredients = userIngredientRepositorySupport.findByBoardNo(boardUpdateReq.getBoardNo());
        for(int i=0; i<userIngredients.size(); i++) {
            UserIngredient userIngredient = userIngredients.get(i);
            userIngredient.setBoardNo(null);
            userIngredient.setType("일반");
            userIngredientRepository.save(userIngredient);
        }

        // 식재료 테이블 게시판 번호 저장 + type 변경
        for (int i=0; i<boardUpdateReq.getIngredientList().size(); i++) {
            User user = userRepositorySupport.findUserByUserEmail(boardUpdateReq.getUserEmail()).orElse(null);
            Ingredient ingredient = ingredientRepositorySupport.findByIngredientName(boardUpdateReq.getIngredientList().get(i)).orElse(null);
            UserIngredient userIngredient = userIngredientRepositorySupport.findByIngredientNameAndUserEmail(ingredient,user).orElse(null);;
            userIngredient.setBoardNo(boardUpdateReq.getBoardNo());
            userIngredient.setType(boardUpdateReq.getType());
            userIngredientRepository.save(userIngredient);
        }

        BoardFindRes boardFindRes = findBoardByBoardNo(boardUpdateReq.getBoardNo(), boardUpdateReq.getUserEmail());
        return boardFindRes;
    }

    @Override
    public void deleteBoard(Long boardNo) {
        Board board = boardRepositorySupport.findBoardByBoardNo(boardNo).orElse(null);
        boardRepository.delete(board);
        List<UserIngredient> userIngredients = userIngredientRepositorySupport.findByBoardNo(boardNo);
        for(int i=0; i<userIngredients.size(); i++) {
            UserIngredient userIngredient = userIngredients.get(i);
            userIngredient.setBoardNo(null);
            userIngredient.setType("일반");
            userIngredientRepository.save(userIngredient);
        }
    }
}
