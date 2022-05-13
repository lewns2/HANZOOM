import { useNavigate } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
const BASE_IMG_URL = 'https://hanzoom-bucket.s3.ap-northeast-2.amazonaws.com/';

export const ContentList = (props) => {
  const navigate = useNavigate();
  const moveToDetail = (num) => {
    navigate(`/board/${num}`);
  };
  return (
    <div
      className="contentCard"
      style={{ margin: '0 auto', marginBottom: '2px', marginTop: '2px' }}
      key={props.content.boardNo}
      onClick={() => moveToDetail(props.content.boardNo)}>
      {/*  이미지  */}
      <div className="cardImgWrap">
        <img src={`${BASE_IMG_URL}${props.content.imagePath}`} className="cardImg" alt="..." />
      </div>
      {/* 본문 */}

      <div className="card_body">
        {/* 제목, 거래 상태 */}
        <div className="d-flex" style={{ width: '100%' }}>
          <div className="cardTitle">
            <p className="card_Ptag">{props.content.title}</p>
          </div>
          <div className="state">
            <p className="status">{props.content.status}</p>
          </div>
        </div>

        {/* 설명 */}
        {/* <div className="contentDescription">{props.content.description}</div> */}

        {/* 나와의 거리 */}
        {props.content.distance ? <p>약 {props.content.distance.toFixed(2)}km</p> : null}

        {/* 식재료 명 */}
        <div className="boardIngredientResList">
          {props.content.boardFindIngredientResList.map((ingre, index) => (
            <span key={index}>#{ingre.ingredientName} </span>
          ))}
        </div>

        {/* 좋아요 표시 */}
        {props.content.like ? (
          <AiFillHeart className="detailLike" />
        ) : (
          <AiOutlineHeart className="detailUnLike" />
        )}
      </div>
    </div>
  );
};
