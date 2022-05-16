import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Fade from 'react-reveal/Fade';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Main.scss';
import { Feature1 } from '../../components/Main/Feature1';
import { Feature2 } from '../../components/Main/Feature2';
import { Feature3 } from '../../components/Main/Feature3';
import { Feature4 } from '../../components/Main/Feature4';
import { Line } from '../../components/Main/Line';
import { Banner } from '../../components/Main/Banner';
import { BestBoard } from '../../components/Main/BestBoard';
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

  return (
    <>
      <Banner />
      <Fade left>
        <Feature1 />
      </Fade>
      <Line />
      <Fade right>
        <Feature2 />
      </Fade>
      <Line />
      <Fade left>
        <Feature3 />
      </Fade>
      <Line />
      <Fade right>
        <Feature4 />
      </Fade>
      <Fade top>
        <BestBoard />
      </Fade>
    </>
  );
};
