package com.cdp.hanzoom.api.request;

import com.cdp.hanzoom.db.entity.Board;
import com.cdp.hanzoom.db.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@ApiModel("BoardUpdateRequest")
public class BoardUpdateReq {

    @ApiModelProperty(name="게시판 번호")
    Long boardNo;
    @ApiModelProperty(name="게시판 제목", example="게시글 제목")
    String title;
    @ApiModelProperty(name="식재료 이미지 경로", required = false)
    String imagePath;
    @ApiModelProperty(name="게시판 거래 상태")
    String status;
    @ApiModelProperty(name="거래종류", example="나눔")
    String type;
    @ApiModelProperty(name="게시판 설명", example="오늘의 나눔 식재료는 바로...")
    String description;
    @ApiModelProperty(name = "사용자 이메일")
    @JsonIgnore
    String userEmail;
    List<String> ingredientList;

    public Board toEntity() {
        User user = new User();
        user.setUserEmail(userEmail);

        return Board.builder()
                .boardNo(boardNo)
                .title(title)
                .imagePath(imagePath)
                .status(status)
                .type(type)
                .description(description)
                .user(user)
                .build();
    }
}
