package com.cdp.hanzoom.api.request;

import com.cdp.hanzoom.db.entity.Plan;
import com.cdp.hanzoom.db.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


@Getter
@Setter
@ToString
@ApiModel("PlanRegisterRequest")
public class PlanRegisterReq {

    @ApiModelProperty(name="일정 날짜 시간", example="2022-05-02 01:35:00")
    String scheduleDatetime;
    @ApiModelProperty(name = "최종 유저 만날 장소 위도")
    private Double lat;

    @ApiModelProperty(name = "최종 유저가 만날 장소 경도")
    private Double lng;

    @ApiModelProperty(name="상대방 이메일", example="ssafy@naver.com")
    String opponent;

    @ApiModelProperty(name="게시글 번호")
    Long boardNo;

    @ApiModelProperty(name = "사용자 이메일")
    @JsonIgnore
    String userEmail;

    public Plan toEntity() {
        User user = new User();
        user.setUserEmail(userEmail);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime time = LocalDateTime.parse(scheduleDatetime, formatter);

        return Plan.builder()
                .scheduleDatetime(time)
                .lat(lat)
                .lng(lng)
                .opponent(opponent)
                .boardNo(boardNo)
                .user(user) // 유저 이메일
                .build();
    }
}
