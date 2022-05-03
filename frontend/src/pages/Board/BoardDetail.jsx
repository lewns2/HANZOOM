import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Axios } from '../../core/axios';
import { useParams } from 'react-router-dom';
import sample from '../../assets/images/Initimage.PNG';
import needSample from '../../assets/images/need.PNG';
import { useNavigate } from 'react-router-dom';
import './BoardDetail.scss';
import { BreakfastDiningRounded } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const BASE_IMG_URL = 'https://hanzoom-bucket.s3.ap-northeast-2.amazonaws.com/';
export const BoardDetail = () => {
  const user = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState([]);

  const navigate = useNavigate();

  const { id } = useParams();
  const [content, setContent] = useState(null);
  const token = sessionStorage.getItem('jwt-token');
  useEffect(() => {
    setUserInfo(user.userInfo);

    Axios.get(`board/find/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => (setContent(res.data), console.log(res.data)))
      .catch((err) => console.log(err));
  }, [user, id]);

  const clickLike = () => {
    Axios.post(`board/like/${id}`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const clickDelete = () => {
    swal({
      title: '해당 게시글을 삭제하시겠습니까?',
      buttons: {
        cancel: '취소',
        catch: {
          text: '삭제할래요',
          value: 'catch',
        },
      },
    }).then((value) => {
      switch (value) {
        case 'catch':
          Axios.delete(`board/remove/${id}`, null, {
            headers: { Authorization: `Bearer ${token}` },
          }).then(swal('게시글이 삭제되었습니다.').then(navigate(-1)));
          break;

        default:
          break;
      }
    });
  };

  return (
    <>
      {content && (
        <section className="container">
          <div className="detailFormWrap">
            <div className="detailHeader row">
              <div className="col-6 d-flex">
                <img
                  className="detailProfileImg"
                  // src="/img/basicProfile.png"
                  src={content.userImage ? `${content.userImage}` : '/img/basicProfile.png'}
                  alt="/img/basicProfile.png"></img>
                <p className="detailUserName">{content.userNickname}</p>
              </div>
              <div className="detailStatus col-6">{content.status}</div>
            </div>

            <div className="detailBody row">
              <div className="detailIngredientImgWrap col-6">
                {content.imagePath == 'need.jpg' ? (
                  <img className="detailIngredientImg" src={needSample}></img>
                ) : (
                  <img
                    className="detailIngredientImg"
                    src={`${BASE_IMG_URL}${content.imagePath}`}></img>
                )}
              </div>
              <div className="detailContent col-6">
                <div className="detailTitle">{content.title}</div>
                <div className="detailDescription">{content.description}</div>

                <div> 나와 떨어진 거리 : 약 {content.distance} KM</div>
                <div className="detailIcon">
                  <button id="detailLike" onClick={clickLike}>
                    <FavoriteIcon></FavoriteIcon>&nbsp; 찜 {content.likeCnt}
                  </button>
                  <button id="detailChat">연락하기</button>
                  <button id="detailReport">신고</button>
                </div>
              </div>
            </div>
            <div className="detailInfoWrap">
              {content.boardFindIngredientResList.map((ingre, index) => (
                <div className="detailInfo" key={index}>
                  <p className="detailTag">#{ingre.ingredientName}</p>
                  <p>구매일 : {ingre.purchaseDate}</p>
                  <p>유통기한 : {ingre.expirationDate}</p>
                </div>
              ))}
            </div>
            <div className="detailCounts">
              <p>조회 {content.viewCnt} ∙</p>
              &nbsp;
              <p>관심 {content.likeCnt}</p>
            </div>
            <div className="detailFooter">
              <button id="detailCancelBtn" onClick={() => navigate(-1)}>
                취소
              </button>
              <button
                id="detailModifyBtn"
                style={{
                  visibility: userInfo.userNickname == content.userNickname ? 'visible' : 'hidden',
                }}>
                수정
              </button>
              <button
                id="detailDeleteBtn"
                style={{
                  visibility: userInfo.userNickname == content.userNickname ? 'visible' : 'hidden',
                }}
                onClick={clickDelete}>
                삭제
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
