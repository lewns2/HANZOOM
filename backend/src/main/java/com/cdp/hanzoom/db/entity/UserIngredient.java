package com.cdp.hanzoom.db.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import java.time.LocalDate;

/**
 * MY식재료 모델 정의.
 */
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class UserIngredient {
    @EmbeddedId
    UserIngredientId userIngredientId;

    @Column(name = "type", length = 20)
    String type;

    @Column(name = "expiration_date")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(shape = JsonFormat.Shape.STRING, timezone = "Asia/Seoul")
    LocalDate expirationDate;

    @Column(name = "board_no")
    Long boardNo;

    public void registerBoardNo(Long boardNo) { this.boardNo=boardNo; }
    public void registerType(String type) { this.type=type; }
}
