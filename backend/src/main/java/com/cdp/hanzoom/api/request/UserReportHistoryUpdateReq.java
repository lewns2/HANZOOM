package com.cdp.hanzoom.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 유저 신고 기록 수정 API ([POST]/api/admin/update/userReportHistory) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ToString
@ApiModel("UserReportHistoryUpdateRequest")
public class UserReportHistoryUpdateReq {
    @ApiModelProperty(name="신고 번호", example = "1")
    private Long reportNo;

    @ApiModelProperty(name="피신고자", example = "ssafy1@naver.com")
    private String reported;

    @ApiModelProperty(name="처리 상태", example = "승인")
    private String result;
}
