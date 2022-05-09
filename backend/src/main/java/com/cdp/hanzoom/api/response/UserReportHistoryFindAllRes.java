package com.cdp.hanzoom.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@ApiModel("UserReportHistoryFindAllResponse")
public class UserReportHistoryFindAllRes {
    @ApiModelProperty(name="신고 번호")
    Long reportNo;

    @ApiModelProperty(name="신고자 이메일")
    String reporter;

    @ApiModelProperty(name="피신고자 이메일")
    String reported;

    @ApiModelProperty(name="신고 내용")
    String content;

    @ApiModelProperty(name="신고 시간")
    LocalDateTime createdAt;
}
