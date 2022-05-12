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
import { useMediaQuery } from 'react-responsive';

import { BestDietWrapper } from './Main.style';
export const Effect = () => {
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

  //  반응형
  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 992 });
    return isDesktop ? children : null;
  };
  const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    return isTablet ? children : null;
  };
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    return isMobile ? children : null;
  };
  const Default = ({ children }) => {
    const isNotMobile = useMediaQuery({ minWidth: 768 });
    return isNotMobile ? children : null;
  };
  return (
    <>
      {user.userInfo.length !== 0 ? (
        <Box
          style={{ backgroundColor: '#f7c343' }}
          // component="section"
          sx={{
            display: 'flex',
            overflow: 'hidden',
          }}>
          <div style={{ margin: '7% auto', width: '100%' }}>
            {user.userInfo.length !== 0 ? (
              <section id="main3">
                <h3 className="text-center">인기 게시글</h3>
                <Desktop>
                  <BestDietWrapper>
                    <div className="container contentContainer">
                      <Slider {...settings}>
                        {contents.map((content, index) => (
                          <ContentList content={content} key={index} />
                        ))}
                      </Slider>
                    </div>
                  </BestDietWrapper>
                </Desktop>
                <Tablet>
                  <BestDietWrapper>
                    <div className="container contentContainer">
                      <Slider {...settings}>
                        {contents.map((content, index) => (
                          <ContentList content={content} key={index} />
                        ))}
                      </Slider>
                    </div>
                  </BestDietWrapper>
                </Tablet>
                <Mobile>
                  <BestDietWrapper>
                    <div className="container contentContainer">
                      <Slider {...settings}>
                        {contents.map((content, index) => (
                          <ContentList content={content} key={index} />
                        ))}
                      </Slider>
                    </div>
                  </BestDietWrapper>
                </Mobile>
              </section>
            ) : null}
          </div>
        </Box>
      ) : null}
    </>
  );
};
