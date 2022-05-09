package com.cdp.hanzoom.db.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * 유저 신고 기록 모델 정의.
 */
@Entity
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserReportHistory {
    @Id
    @Column(name = "report_no")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    Long reportNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="reporter")
    User user;

    @Email
    @Column(name="reported", length = 100, nullable = false)
    String reported;

    @Column(name="content", length = 600)
    String content;

    @Column(name = "created_at")
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(shape = JsonFormat.Shape.STRING, timezone = "Asia/Seoul")
    @CreationTimestamp
    LocalDateTime createdAt;

}
