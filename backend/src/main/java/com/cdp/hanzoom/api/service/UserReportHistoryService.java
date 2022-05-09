package com.cdp.hanzoom.api.service;

import com.cdp.hanzoom.api.request.UserReportHistoryRegisterReq;
import com.cdp.hanzoom.api.response.UserReportHistoryFindAllRes;
import com.cdp.hanzoom.db.entity.UserReportHistory;

import java.util.List;

/**
 *	유저 신고 기록 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserReportHistoryService {
    /** 유저 신고 내용 정보를 생성하는 registerUserReportHistory 입니다. **/
    void registerUserReportHistory(UserReportHistoryRegisterReq userReportHistoryRegisterReq, String userEmail);
    /** 유저 신고 기록 정보를 모두 조회하는 UserReportHistoryFindAllRes 입니다. **/
    List<UserReportHistoryFindAllRes> findAllUserReportHistory();
    /** 신고 번호를 이용하여 유저 신고 기록 정보를 삭제하는 deleteUserReportHistory 입니다. **/
    void deleteUserReportHistory(UserReportHistory userReportHistory);
}
