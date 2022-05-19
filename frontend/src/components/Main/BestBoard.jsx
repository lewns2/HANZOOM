import * as React from 'react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ContentList } from './ContentList';

import { Axios } from '../../core/axios';
import { settings } from '../../constants/slider';

export const BestBoard = () => {
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
      {user.userInfo.length !== 0 ? (
        <Box
          style={{ backgroundColor: '#f7c343' }}
          sx={{
            display: 'flex',
            overflow: 'hidden',
          }}>
          {user.userInfo.length !== 0 ? (
            <section id="main3">
              <h3 className="text-center">인기 게시글</h3>
              <div className="bestBoardWrapper">
                <div className="container contentContainer">
                  <Slider {...settings}>
                    {contents.map((content, index) => (
                      <ContentList content={content} key={index} />
                    ))}
                  </Slider>
                </div>
              </div>
            </section>
          ) : null}
        </Box>
      ) : null}
    </>
  );
};
