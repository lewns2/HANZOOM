package com.cdp.hanzoom.db.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Entity;
import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Board {
    @Id
    @Column(name = "board_no")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    Long boardNo;

    @Column(name = "title", length = 200)
    String title;

    @Column(name = "image_path", length = 300)
    String imagePath;

    @Column(name = "type", length = 20)
    String type;

    @Column(name = "description", length = 2000)
    String description;

    @Column(name = "status", length = 200)
    String status;

    @Column(name = "viewCnt", nullable = false)
    @ColumnDefault("0")
    Long viewCnt;

    @Column(name = "likeCnt", nullable = false)
    @ColumnDefault("0")
    Long likeCnt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_email")
    @OnDelete(action = OnDeleteAction.CASCADE)
    User user;

    public void increaseViewCnt() { this.viewCnt++; }
    public void increaseLikeCnt() { this.likeCnt++; }
    public void decreaseLikeCnt() { this.likeCnt--; }
}
