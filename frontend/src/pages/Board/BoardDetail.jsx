import { useState, useEffect } from 'react';
import { Axios } from '../../core/axios';
import { useParams } from 'react-router-dom';
import sample from '../../assets/images/Initimage.PNG';
import './BoardDetail.scss';

export const BoardDetail = () => {
  const { id } = useParams();
  const token = localStorage.getItem('jwt-token');
  useEffect(() => {
    Axios.get(`board/find/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <section className="container">
        <div className="detailFormWrap">
          <div className="detailHeader row">
            <div className="col-6 d-flex">
              <img
                className="detailProfileImg"
                src="/img/basicProfile.png"
                alt="이미지 없음..."></img>
              <p className="detailUserName">김아무개</p>
            </div>
            <div className="detailStatus col-6">거래 완료</div>
          </div>
          <div className="detailBody row">
            <div className="detailIngredientImg col-5">
              <img src={sample}></img>
            </div>
            <div className="detailContent col-7">
              <div className="detailTitle">고구마 나눔합니다.</div>
              <div className="detailInfo">
                <div>고구마</div>
                <div>구매일/유통기한 : 2022-04-11</div>
                <div>4km </div>
              </div>
              <div className="detailDescription">
                고구마 나눔합니다 *^^* 필요하신 분 채팅주세요.
              </div>
              <div className="detailIcon">댓글아이콘 좋아요아이콘 신고아이콘</div>
            </div>
          </div>
          <div className="detailFooter">
            <button id="detailCancelBtn">취소</button>
            <button id="detailActiveBtn">채팅하기</button>
            <button id="detailActiveBtn">수정</button>
          </div>
        </div>
      </section>
    </>
  );
};
