package com.cdp.hanzoom.db.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

/**
 * 유저 모델 정의.
 */
@Table(
        // 속성에 UNIQUE 제약조건 설정
        uniqueConstraints = {
                @UniqueConstraint(
                        columnNames = {"user_email"}
                )
        }
)
@Setter
@Getter
@Entity
public class User {
    @Id
    @Column(name = "user_nickname", length= 60,  nullable = false)
    String userNickname;

    @Email
    @Column(name = "user_email",length = 100, nullable = false)
    String userEmail;

    @Column(name = "user_password", length= 200, nullable = false)
    String userPassword;

    @Column(name = "user_image", length = 300)
    String userImage; // 프로필 이미지 경로

    @Column(name = "lat")
    double lat;   // 위도

    @Column(name = "lng")
    double lng;  // 경도

    @Column(columnDefinition = "TIMESTAMP")
    @JsonFormat(shape = JsonFormat.Shape.STRING, timezone = "Asia/Seoul")
    @CreationTimestamp
    LocalDateTime joinDate; // 가입일
}
