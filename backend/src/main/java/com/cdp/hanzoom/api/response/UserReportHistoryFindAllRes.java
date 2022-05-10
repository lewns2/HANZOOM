package com.cdp.hanzoom.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@ApiModel("UserReportHistoryFindAllResponse")
public interface UserReportHistoryFindAllRes {
    @ApiModelProperty(name="신고 번호")
    Long getReportNo();

    @ApiModelProperty(name="신고자 이메일")
    String getReporter();

    @ApiModelProperty(name="피신고자 이메일")
    String getReported();

    @ApiModelProperty(name="신고 내용")
    String getContent();

    @ApiModelProperty(name="피신고자 총 신고 당한 횟수")
    Integer getReportedNumber();

    @ApiModelProperty(name="처리 상태")
    String getStatus();

    @ApiModelProperty(name="신고 시간")
    LocalDateTime getCreatedAt();
}
