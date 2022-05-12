package com.cdp.hanzoom.api.service;

import com.cdp.hanzoom.api.request.UserReportHistoryRegisterReq;
import com.cdp.hanzoom.api.request.UserReportHistoryUpdateReq;
import com.cdp.hanzoom.api.response.UserReportHistoryFindAllRes;
import com.cdp.hanzoom.db.entity.UserReportHistory;
import com.cdp.hanzoom.db.repository.UserReportHistoryRepository;
import com.cdp.hanzoom.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("UserReportHistoryService")
public class UserReportHistoryServiceImpl implements UserReportHistoryService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserReportHistoryRepository userReportHistoryRepository;

    /** 유저 신고 내용 정보를 생성하는 registerUserReportHistory 입니다. **/
    @Override
    public void registerUserReportHistory(UserReportHistoryRegisterReq userReportHistoryRegisterReq, String userEmail) {
        // 신고 기록 저장
        userReportHistoryRepository.save(userReportHistoryRegisterReq.toEntity(userEmail));
    }

    /** 유저 신고 기록 정보를 모두 조회하는 UserReportHistoryFindAllRes 입니다. **/
    @Override
    public List<UserReportHistoryFindAllRes> findAllUserReportHistory() {
//        List<UserReportHistory> userReportHistoryList = userReportHistoryRepository.findAll();

        List<UserReportHistoryFindAllRes> userReportHistoryFindAllResList = userReportHistoryRepository.findAllUserReportHistory();
//        for(int i=0; i<userReportHistoryList.size(); i++) {
//            UserReportHistoryFindAllRes userReportHistoryFindAllRes = new UserReportHistoryFindAllRes();
//            userReportHistoryFindAllRes.setReportNo(userReportHistoryList.get(i).getReportNo());
//            userReportHistoryFindAllRes.setReporter(userReportHistoryList.get(i).getUser().getUserEmail());
//            userReportHistoryFindAllRes.setReported(userReportHistoryList.get(i).getReported());
//            userReportHistoryFindAllRes.setContent(userReportHistoryList.get(i).getContent());
//            userReportHistoryFindAllRes.setCreatedAt(userReportHistoryList.get(i).getCreatedAt());
//            userReportHistoryFindAllResList.add(userReportHistoryFindAllRes);
//        }

        return userReportHistoryFindAllResList;
    }

    /** 신고 번호를 이용하여 유저 신고 기록 정보를 삭제하는 deleteUserReportHistory 입니다. **/
    @Override
    public void deleteUserReportHistory(UserReportHistory userReportHistory) {
        // 해당 신고 내역 삭제
        userReportHistoryRepository.delete(userReportHistory);
    }

    /** 유저 신고 처리 상태를 변경하는 updateStatus 입니다. **/
    @Override
    public void updateStatus(UserReportHistoryUpdateReq userReportHistoryUpdateReq) {
        String result = userReportHistoryUpdateReq.getResult();
        userReportHistoryRepository.updateState(userReportHistoryUpdateReq.getReportNo(), result);

        if(result.equals("승인")) {
            userRepository.plusUserReportedNumber(userReportHistoryUpdateReq.getReported());
        }
    }
}
