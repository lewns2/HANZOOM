package com.cdp.hanzoom.db.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.time.LocalDateTime;

/**
 * 유저 모델 정의.
 */
@Table(
        // 속성에 UNIQUE 제약조건 설정
        uniqueConstraints = {
                @UniqueConstraint(
                        columnNames = {"user_nickname"}
                )
        }
)
@Setter
@Getter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {
    @Id
    @Email
    @Column(name = "user_email",length = 100, nullable = false)
    String userEmail;

    @Column(name = "user_nickname", length= 60,  nullable = false)
    String userNickname;


    @Column(name = "user_password", length= 200, nullable = false)
    String userPassword;

    @Column(name = "user_image", length = 300)
    String userImage; // 프로필 이미지 경로

    @Column(name = "lat")
    Double lat;   // 위도

    @Column(name = "lng")
    Double lng;  // 경도

    @Column(name = "reported_number")
    @ColumnDefault("0")
    Integer reportedNumber;

    @Column(columnDefinition = "TIMESTAMP")
    @JsonFormat(shape = JsonFormat.Shape.STRING, timezone = "Asia/Seoul")
    @CreationTimestamp
    LocalDateTime joinDate; // 가입일

    @Column(name = "browser_token", length = 2000)
    String browserToken;

    public void updateUser(String userNickname, String userPassword) {
        this.userNickname = userNickname;
        this.userPassword = userPassword;
    }
    public void updateUserLatAndLng(Double lat, Double lng) {
        this.lat = lat;
        this.lng = lng;
    }

    public void updateProfileImage(String savingFileName) {
        this.userImage = savingFileName;
    }

    public void updateBrowserToken(String browserToken) { this.browserToken = browserToken;}
}
