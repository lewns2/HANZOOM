import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { settings } from '../../constants/slider';
import { ContentList } from '../../components/Board/ContentList';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Main.scss';
// import { Footer } from '../../components/Main/Footer';
import { Axios } from '../../core/axios';

export const Main = () => {
  // redux user 테스트
  const user = useSelector((state) => state.user);

  const [contents, setContents] = useState([]);

  const getContents = () => {
    const token = sessionStorage.getItem('jwt-token');
    Axios.get('/board/findAll?page=1&size=8&sort=viewCnt%2CDESC&ingredient=', {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      setContents(res.data.content);
    });
  };
  useEffect(() => {
    getContents();
  }, []);

  const navigate = useNavigate();
  const loginGo = () => {
    navigate('/login');
  };
  const myIngreGo = () => {
    navigate('/my-food-ingredients');
  };

  return (
    <>
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
          {user.userInfo.length !== 0 ? (
            <button className="myIngreGo" onClick={myIngreGo}>
              매칭하러 가기 GO
            </button>
          ) : (
            <button className="loginGo" onClick={loginGo}>
              한줌 즐기러 가기 GO
            </button>
          )}
        </div>
      </section>

      {user.userInfo.length !== 0 ? (
        <section id="main3">
          <h3 className="text-center">인기 게시글</h3>
          <div className="container contentContainer">
            <Slider {...settings}>
              {contents.map((content, key) => (
                <ContentList content={content} key={key} />
              ))}
            </Slider>
          </div>
        </section>
      ) : null}
      {/* <Footer></Footer> */}
    </>
  );
};
