import { useState, useEffect } from 'react';
import { Axios } from '../../core/axios';
import { useParams } from 'react-router-dom';
import sample from '../../assets/images/Initimage.PNG';
import './BoardDetail.scss';

const BASE_IMG_URL = 'https://hanzoom-bucket.s3.ap-northeast-2.amazonaws.com/';
export const BoardDetail = () => {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const token = localStorage.getItem('jwt-token');
  useEffect(() => {
    Axios.get(`board/find/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => (setContent(res.data), console.log(res.data)))
      .catch((err) => console.log(err));
  }, []);

  const clickLike = () => {
    Axios.post(`board/like/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
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
              <div className="detailIngredientImg col-5">
                <img src={`${BASE_IMG_URL}${content.imagePath}`}></img>
              </div>
              <div className="detailContent col-7">
                <div className="detailTitle">{content.title}</div>

                <div className="detailInfo">
                  {content.boardFindIngredientResList.map((ingre, index) => (
                    <div key={index}>
                      <p>#{ingre.ingredientName}</p>
                      <p>구매일 : {ingre.purchaseDate}</p>
                      <p>유통기한 : {ingre.expirationDate}</p>
                    </div>
                  ))}
                </div>
                <div> 약 {content.distance} KM</div>
                <div className="detailDescription">{content.description}</div>
                <div>조회수 : {content.viewCnt}</div>
                <div>좋아요 여부 : {content.like}</div>
                <div>좋아요 수 : {content.likeCnt}</div>
                <div className="detailIcon">
                  <button>댓글</button>
                  <button onClick={clickLike}>좋아요</button>
                  <button>신고</button>
                </div>
              </div>
            </div>
            <div className="detailFooter">
              <button id="detailCancelBtn">취소</button>
              <button id="detailActiveBtn">채팅하기</button>
              <button id="detailActiveBtn">수정</button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
