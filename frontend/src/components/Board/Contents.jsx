import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import sample from '../../assets/images/Initimage.PNG';
import { Axios } from '../../core/axios';

const contents = [
  {
    boardNo: 0,
    description: '맛있는 닭가슴살 샐러드 소랴라솰라라라라라라라라샤랄라',
    distance: '2km',
    imagePath: sample,
    like: true,
    likeCnt: 0,
    status: '거래중',
    title: '닭가슴살 샐러드',
    userNickname: '김아무개',
    viewCnt: 0,
  },
  {
    boardNo: 1,
    description: '소랴라솰라라라라라라라라샤랄라 맛있는 닭가슴살 샐러드 ',
    distance: '1km',
    imagePath: sample,
    like: false,
    likeCnt: 1,
    status: '거래중',
    title: '닭가슴살 샐러드2',
    userNickname: '박아무개',
    viewCnt: 0,
  },
  {
    boardNo: 2,
    description: '소랴라솰라라라라라라라라샤랄라 맛있는 닭가슴살 샐러드 ',
    distance: '1km',
    imagePath: sample,
    like: true,
    likeCnt: 1,
    status: '거래중',
    title: '닭가슴살 샐러드2',
    userNickname: '박아무개',
    viewCnt: 0,
  },
  {
    boardNo: 3,
    description: '소랴라솰라라라라라라라라샤랄라 맛있는 닭가슴살 샐러드 ',
    distance: '1km',
    imagePath: sample,
    like: true,
    likeCnt: 1,
    status: '거래중',
    title: '닭가슴살 샐러드2',
    userNickname: '박아무개',
    viewCnt: 0,
  },
  {
    boardNo: 4,
    description: '소랴라솰라라라라라라라라샤랄라 맛있는 닭가슴살 샐러드 ',
    distance: '1km',
    imagePath: sample,
    like: false,
    likeCnt: 1,
    status: '거래중',
    title: '닭가슴살 샐러드2',
    userNickname: '박아무개',
    viewCnt: 0,
  },
  {
    boardNo: 5,
    description: '소랴라솰라라라라라라라라샤랄라 맛있는 닭가슴살 샐러드 ',
    distance: '1km',
    imagePath: sample,
    like: true,
    likeCnt: 1,
    status: '거래중',
    title: '닭가슴살 샐러드2',
    userNickname: '박아무개',
    viewCnt: 0,
  },
  {
    boardNo: 6,
    description: '소랴라솰라라라라라라라라샤랄라 맛있는 닭가슴살 샐러드 ',
    distance: '1km',
    imagePath: sample,
    like: false,
    likeCnt: 1,
    status: '거래중',
    title: '닭가슴살 샐러드2',
    userNickname: '박아무개',
    viewCnt: 0,
  },
];

export const Contents = (props) => {
  const totalElements = 48;
  const totalPages = 6;

  const navigate = useNavigate();
  // const [totalElements, setTotalElements] = useState(48);
  // const [totalPages, setTotalPages] = useState(6);
  // const [contents, setContents] = useState();
  useEffect(() => {
    Axios.get('board/findAll', {
      headers: { page: `${props.page}`, size: `${props.size}`, sort: 'ASC' },
    })
      .then((res) => console.log(res))
      .catch(
        (err) => console.log(`${props.page} 페이지 조회한다!`, err),
        props.setTotalPage(totalPages),
        props.setTotalElements(totalElements),
      );
  }, [props.page]);

  const moveToDetail = (num) => {
    navigate(`/board/${num}`);
  };

  return (
    <section className="contentsContainer">
      {contents.map((content, key) => (
        <div
          className="contentCard mx-2 mb-3"
          key={content.boardNo}
          onClick={() => moveToDetail(content.boardNo)}>
          {/*  이미지  */}
          <img src={content.imagePath} className="card-img-top" alt="..." />

          {/* 본문 */}
          <div className="card-body">
            {/* 제목, 거래 상태 */}
            <div className="row">
              <div className="col-8">
                <p className="card-title">{content.title}</p>
              </div>
              <div className="col-4">
                <p className="status">{content.status}</p>
              </div>
            </div>

            {/* 설명 */}
            <p>{content.description}</p>

            {/* 나와의 거리 */}
            <p>{content.distance}</p>

            {/* 식재료 명 */}
            <p>#식재료명이 없어</p>

            {/* 좋아요 표시 */}
            <div className="likeBtn" style={{ visibility: content.like ? 'visible' : 'hidden' }}>
              좋아요 버튼
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
