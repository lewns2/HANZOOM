package com.cdp.hanzoom.db.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Entity;
import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Board {
    @Id
    @Column(name = "board_no")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    Long boardNo;

    @Column(name = "title", length = 200)
    String title;

    @Column(name = "image_path", length = 300)
    String imagePath;

    @Column(name = "food_name", length = 200)
    String foodName;

    @Column(name = "expiration_date")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(shape = JsonFormat.Shape.STRING, timezone = "Asia/Seoul")
    LocalDate expirationDate;

    @Column(name = "type", length = 200)
    String type;

    @Column(name = "description", length = 2000)
    String description;

    @Column(name = "status", length = 200)
    String status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_email")
    @OnDelete(action = OnDeleteAction.CASCADE)
    User user;
}
