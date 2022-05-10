package com.cdp.hanzoom.db.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
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
    @Id
    @Column(name = "user_ingredient_no")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    Long userIngredientNo;

    @ManyToOne
    @JoinColumn(name="user_email")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @OneToOne
    @JoinColumn(name = "ingredient_no")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Ingredient ingredient;

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

    @Column(name = "board_no")
    Long boardNo;

    @Column(name = "status", length = 20)
    String status;
}
