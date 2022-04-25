import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './Main.scss';
import { Contents } from '../../components/Board/Contents';

export const Main = () => {
  // redux user 테스트
  const user = useSelector((state) => state.user);

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
            <button className="loginGo">한줌 즐기러 가기 GO</button>
          ) : (
            <button className="myIngreGo">매칭하러 가기 GO</button>
          )}
        </div>
      </section>

      {user ? (
        <section id="main3">
          <h3>인기 게시글</h3>
          <Contents />
        </section>
      ) : (
        'null'
      )}
    </>
  );
};
