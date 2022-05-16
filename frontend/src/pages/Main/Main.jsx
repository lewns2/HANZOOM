import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { settings } from '../../constants/slider';
import { ContentList } from '../../components/Main/ContentList';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Main.scss';
import { Feature } from '../../components/Main/Feature';
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
      <Feature />
      <BestBoard />
    </>
  );
};
