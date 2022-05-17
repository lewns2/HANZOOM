import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import swal from 'sweetalert';

const BASE_IMG_URL = 'https://hanzoom-bucket.s3.ap-northeast-2.amazonaws.com/';

export const ContentList = (props) => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const moveToDetail = (num) => {
    if (!user.userInfo.lng && !user.userInfo.lat) {
      swal('위치 정보를 설정해주세요.', '한줌 서비스를 이용하기 위해 위치 정보가 필요합니다');
      return;
    }

    navigate(`/board/${num}`);
  };
  return (
    <div
      className="contentCard"
      style={{ margin: '2px auto' }}
      key={props.content.boardNo}
      onClick={() => moveToDetail(props.content.boardNo)}>
      {/*  이미지  */}
      <div className="cardImgWrap">
        <img src={`${BASE_IMG_URL}${props.content.imagePath}`} className="cardImg" alt="..." />
        <span className="status">{props.content.status}</span>
      </div>
      {/* 본문 */}

      <div className="card_body">
        {/* 제목, 거래 상태 */}
        <div className="d-flex" style={{ width: '100%' }}>
          <div className="cardTitle">
            <p className="card_Ptag">{props.content.title}</p>
          </div>
          <div className="state">
            <p className="type">{props.content.type}</p>
          </div>
        </div>

        {/* 나와의 거리 */}
        {props.content.distance !== null ? (
          props.content.distance === 0 ? (
            <p>약 0km</p>
          ) : (
            <p>약 {props.content.distance.toFixed(2)}km</p>
          )
        ) : (
          <p>위치 정보 설정이 필요합니다</p>
        )}

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
