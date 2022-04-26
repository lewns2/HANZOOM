import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { settings } from '../../constants/slider';
import { ContentList } from '../../components/Board/ContentList';
import sample from '../../assets/images/Initimage.PNG';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Main.scss';
import { useNavigate } from 'react-router-dom';

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

export const Main = () => {
  // redux user 테스트
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const loginGo = () => {
    navigate('/login');
  };
  const myIngreGo = () => {
    navigate('/my-food-ingredients');
  };
  return (
    <>
      {console.log(user)}
      <section id="main1" className="d-flex justify-content-center">
        <h1 className="intro d-flex align-items-center">
          냉장고 속 남는 재료, <br /> 이제 버리지 마세요!
        </h1>
        <img src="/img/fridge.png" alt="fridge" id="fridge" />
      </section>

      <section id="main2" className="d-flex justify-content-center">
        <img src="/img/map.png" alt="map" />
        <div className="">
          <h1>내 주변 이웃들과 나누세요!</h1>
          <p>냉장고 속 남는 재료를 필요로 하는 내 주변 이웃들과 나눌 수 있습니다.</p>
          <p>그리고 나에게 필요한 식재료를 이웃으로 부터 찾을 수도 있습니다.</p>
          {user ? (
            <button className="loginGo" onClick={loginGo}>
              한줌 즐기러 가기 GO
            </button>
          ) : (
            <button className="myIngreGo" onClick={myIngreGo}>
              매칭하러 가기 GO
            </button>
          )}
        </div>
      </section>

      {user ? (
        <section id="main3">
          <h3 className="text-center">인기 게시글</h3>

          <Slider {...settings}>
            {contents.map((content, key) => (
              <ContentList content={content} key={key} />
            ))}
            {/* <ContentList contents={contents} /> */}
          </Slider>
        </section>
      ) : (
        'null'
      )}
    </>
  );
};
