import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Axios } from '../../core/axios';
import { useParams } from 'react-router-dom';
import sample from '../../assets/images/Initimage.PNG';
import needSample from '../../assets/images/need.PNG';
import { useNavigate } from 'react-router-dom';
import './BoardDetail.scss';
import { BreakfastDiningRounded } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { changeShow, setRoomId, getChatMessageInfo } from '../../Reducer/chatSlice';

const BASE_IMG_URL = 'https://hanzoom-bucket.s3.ap-northeast-2.amazonaws.com/';
export const BoardDetail = () => {
  const user = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState([]);
  var [likeStatus, setLikeStatus] = useState();
  var [likeCnt, setLikeCnt] = useState();

  const navigate = useNavigate();

  const { id } = useParams();
  const [content, setContent] = useState(null);

  const token = sessionStorage.getItem('jwt-token');

  const dispatch = useDispatch();

  useEffect(() => {
    setUserInfo(user.userInfo);
    Axios.get(`board/find/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(
        (res) => (
          setContent(res.data),
          setLikeStatus(res.data.like),
          setLikeCnt(res.data.likeCnt),
          console.log(res.data)
        ),
      )
      .catch((err) => console.log(err));
  }, [user, id]);

  const clickLike = () => {
    setLikeStatus((likeStatus ^= 1));
    if (likeStatus) setLikeCnt(likeCnt + 1);
    else setLikeCnt(likeCnt - 1);
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

  // 채팅방 등록
  const registerChat = async () => {
    await Axios.post('/chat/register', {
      boardNo: content.boardNo,
      userNickname1: user.userInfo.userNickname,
      userNickname2: content.userNickname,
    })
      .then((res) => {
        startChat(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 채팅 시작
  const startChat = (roomId) => {
    dispatch(setRoomId(roomId)); // store에 선택한 roomId 세팅
    dispatch(getChatMessageInfo()); // store에 저장된 roomId에 해당하는 채팅방 메시지 정보 가져오기
    dispatch(changeShow(true)); // 채팅 모달 show
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
                  src={
                    content.userImage
                      ? `${BASE_IMG_URL}${content.userImage}`
                      : '/img/basicProfile.png'
                  }
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

                {content.distance == null ? (
                  <h6>나와 떨어진 거리 확인을 위해선 위치 정보 설정이 필요합니다.</h6>
                ) : (
                  <div> 나와 떨어진 거리 : 약 {content.distance.toFixed(1)} KM</div>
                )}
                <div
                  className="detailMyContent"
                  style={{
                    display: userInfo.userNickname == content.userNickname ? '' : 'none',
                  }}>
                  <p>내가 작성한 게시글입니다.</p>
                </div>
                <div
                  className="detailIcon"
                  style={{
                    visibility:
                      userInfo.userNickname == content.userNickname ? 'hidden' : 'visible',
                  }}>
                  {likeStatus ? (
                    <button id="detailLike" onClick={clickLike}>
                      <FavoriteIcon style={{ color: 'red' }} />
                      &nbsp; 찜 {likeCnt}
                    </button>
                  ) : (
                    <button id="detailUnLike" onClick={clickLike}>
                      <FavoriteIcon />
                      &nbsp; 찜 {likeCnt}
                    </button>
                  )}
                  <button id="detailChat" onClick={registerChat}>
                    채팅
                  </button>
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
              <p>관심 {likeCnt}</p>
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
