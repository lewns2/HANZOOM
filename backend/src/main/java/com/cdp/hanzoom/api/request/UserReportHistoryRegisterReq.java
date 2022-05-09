package com.cdp.hanzoom.api.request;

import com.cdp.hanzoom.db.entity.User;
import com.cdp.hanzoom.db.entity.UserReportHistory;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 유저 신고 기록 생성 API ([POST]/api/userReportHistory/register) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ToString
@ApiModel("UserReportHistoryRegisterRequest")
public class UserReportHistoryRegisterReq {
    @ApiModelProperty(name="피신고자 이메일", example="ssafy3@naver.com")
    private String reported;

    @ApiModelProperty(name="", example="이 사람 나쁜 사람")
    private String content;

    public UserReportHistory toEntity(String userEmail) {
        User user = new User();
        user.setUserEmail(userEmail);

        return UserReportHistory.builder()
                .user(user)
                .reported(reported)
                .content(content)
                .build();
    }
}
