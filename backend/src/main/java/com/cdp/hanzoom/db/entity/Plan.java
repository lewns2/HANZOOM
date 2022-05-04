package com.cdp.hanzoom.db.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * 일정 모델 정의.
 */

@Setter
@Getter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Plan {
    @Id
    @Column(name = "schedule_no")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    Long scheduleNo; // 시퀀스 일정 번호

    @Column(columnDefinition = "TIMESTAMP")
    @JsonFormat(shape = JsonFormat.Shape.STRING, timezone = "Asia/Seoul")
    @CreationTimestamp
    LocalDateTime scheduleDatetime; // 일정 날짜 시간

    @Column(name = "lat")
    Double lat;   // 최종 약속 장소 위도

    @Column(name = "lng")
    Double lng;  // 최종 약속 장소 경도

    @Column(name = "opponent", length = 100)
    String opponent; // 상대방 이메일 ( 나눔/ 교환 받는자)

    @Column(name = "board_no")
    Long boardNo; // 게시글 번호

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_email")
    @OnDelete(action = OnDeleteAction.CASCADE)
    User user;

    public void updateUserLatAndLng(Double lat, Double lng) {
        this.lat = lat;
        this.lng = lng;
    }
}
