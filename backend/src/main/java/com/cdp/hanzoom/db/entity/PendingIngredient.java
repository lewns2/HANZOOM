package com.cdp.hanzoom.db.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * 등록 요청 식재료 모델 정의.
 */
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class PendingIngredient {
    @Id
    @Column(name = "request_no")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    Long requestNo;

    @Column(name = "requestor", length = 100)
    String requestor;

    @Column(name = "ingredient_name", length = 50)
    String ingredientName;

    @Column(name = "type", length = 20)
    String type;

    @Column(name = "purchase_date")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(shape = JsonFormat.Shape.STRING, timezone = "Asia/Seoul")
    LocalDate purchaseDate;

    @Column(name = "expiration_date")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(shape = JsonFormat.Shape.STRING, timezone = "Asia/Seoul")
    LocalDate expirationDate;

    @Column(name = "status", length = 20)
    String status;

    @Column(name = "created_at")
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(shape = JsonFormat.Shape.STRING, timezone = "Asia/Seoul")
    @CreationTimestamp
    LocalDateTime createdAt;
}
