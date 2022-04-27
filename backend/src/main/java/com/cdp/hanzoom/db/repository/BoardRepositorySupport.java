package com.cdp.hanzoom.db.repository;

import com.cdp.hanzoom.db.entity.Board;
import com.cdp.hanzoom.db.entity.QBoard;
import com.cdp.hanzoom.db.entity.QUserIngredient;
import com.querydsl.core.QueryResults;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class BoardRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QBoard qBoard = QBoard.board;
    QUserIngredient qUserIngredient = QUserIngredient.userIngredient;

    public Page<Board> findAllBoard(Pageable pageable) {
        QueryResults<Board> boards = jpaQueryFactory
                .select(qBoard)
                .from(qBoard)
                .orderBy(orderCondition(pageable))
                .limit(pageable.getPageSize())
                .offset(pageable.getOffset())
                .fetchResults();
        if(boards == null) return Page.empty();
        return new PageImpl<Board>(boards.getResults(), pageable, boards.getTotal());
    }
    private OrderSpecifier[] orderCondition(Pageable pageable) {
        PathBuilder<Board> entityPath = new PathBuilder<>(Board.class, "board");
        if(pageable.getSort().stream().findFirst().get().getProperty().equals("distance")) {
            return new OrderSpecifier[]{new OrderSpecifier(Order.valueOf("DESC"), entityPath.get("boardNo"))};
        }
        else {
            return pageable.getSort() // (2) pageable 안에 있는 sort 라는 정보를 가져옴.
                    .stream() // (3)
                    .map(order -> new OrderSpecifier(Order.valueOf(order.getDirection().name()), entityPath.get(order.getProperty()))) // (4)
                    .toArray(OrderSpecifier[]::new); // (5)
            }
    }

    public Optional<Board> findBoardByBoardNo(Long boardNo) {
        Board board = jpaQueryFactory
                .select(qBoard)
                .from(qBoard)
                .where(qBoard.boardNo.eq(boardNo))
                .fetchOne();
        if(board == null) return Optional.empty();
        return Optional.ofNullable(board);
    }

    public Page<Board> findBoardByIngredient(Pageable pageable, String ingredient) {
        QueryResults<Board> boards = jpaQueryFactory
                .select(qBoard)
                .from(qBoard)
                .where(qBoard.boardNo.in(
                        JPAExpressions
                                .select(qUserIngredient.boardNo)
                                .from(qUserIngredient)
                                .where(qUserIngredient.userIngredientId.ingredientNo.ingredientName.contains(ingredient))
                ))
                .orderBy(orderCondition(pageable))
                .limit(pageable.getPageSize())
                .offset(pageable.getOffset())
                .fetchResults();
        if(boards == null) return Page.empty();
        return new PageImpl<Board>(boards.getResults(), pageable, boards.getTotal());
    }
}
