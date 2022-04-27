export const ContentList = (props) => {
  return (
    <>
      <div
        className="contentCard mx-2 mb-3"
        key={props.content.boardNo}
        onClick={() => moveToDetail(props.content.boardNo)}>
        {/*  이미지  */}
        <img src={props.content.imagePath} className="card-img-top" alt="..." />

        {/* 본문 */}
        <div className="card-body">
          {/* 제목, 거래 상태 */}
          <div className="row">
            <div className="col-8">
              <p className="card-title">{props.content.title}</p>
            </div>
            <div className="col-4">
              <p className="status">{props.content.status}</p>
            </div>
          </div>

          {/* 설명 */}
          <p>{props.content.description}</p>

          {/* 나와의 거리 */}
          <p>{props.content.distance}</p>

          {/* 식재료 명 */}
          <p>#식재료명이 없어</p>

          {/* 좋아요 표시 */}
          <div
            className="likeBtn"
            style={{ visibility: props.content.like ? 'visible' : 'hidden' }}>
            좋아요 버튼
          </div>
        </div>
      </div>
    </>
  );
};
