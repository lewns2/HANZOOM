package com.cdp.hanzoom.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBoard is a Querydsl query type for Board
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QBoard extends EntityPathBase<Board> {

    private static final long serialVersionUID = -964677959L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QBoard board = new QBoard("board");

    public final NumberPath<Long> boardNo = createNumber("boardNo", Long.class);

    public final StringPath description = createString("description");

    public final StringPath imagePath = createString("imagePath");

    public final NumberPath<Long> likeCnt = createNumber("likeCnt", Long.class);

    public final StringPath status = createString("status");

    public final StringPath title = createString("title");

    public final StringPath type = createString("type");

    public final QUser user;

    public final NumberPath<Long> viewCnt = createNumber("viewCnt", Long.class);

    public QBoard(String variable) {
        this(Board.class, forVariable(variable), INITS);
    }

    public QBoard(Path<? extends Board> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QBoard(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QBoard(PathMetadata metadata, PathInits inits) {
        this(Board.class, metadata, inits);
    }

    public QBoard(Class<? extends Board> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user")) : null;
    }

}

