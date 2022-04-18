package com.cdp.hanzoom.db.entity;

import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class LikeList {
    @Id
    @Column(name = "like_no")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    Long likeNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_nickname")
    @OnDelete(action = OnDeleteAction.CASCADE)
    User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="board_no")
    @OnDelete(action = OnDeleteAction.CASCADE)
    Board board;
}
