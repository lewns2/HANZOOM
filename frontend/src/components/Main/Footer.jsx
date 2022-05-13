import React from 'react';
import styled from 'styled-components';
import { Container, Grid, Typography } from '@mui/material';
import './Footer.scss';
export const Footer = () => {
  if (location.pathname === '/login') return null;

  return (
    <MyFooter style={footerBackground}>
      <Container>
        <Grid container sx={{ pt: 6 }} spacing={5}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ color: '#687274', fontWeight: 'bold', fontSize: '20px' }}>
              한 줌(HANZOOM)
            </Typography>
            <Typography sx={{ mt: 2, fontSize: '15px', color: '#8C999B' }}>
              김광희, 김동현, 김동주, 정윤정, 최영진, 한성희
            </Typography>
            <Typography sx={{ fontWeight: 'bold', fontSize: '15px', color: '#8C999B' }}>
              서울특별시 강남구 언주로 508 14층(역삼동, 서울상록빌딩) 멀티캠퍼스
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 2, fontSize: '15px', color: '#8C999B' }}>
              Tel : 02.6949.3016 월-금 (09:00 - 18:00)
              <br />
              Email : noreply.cdp.hanzoom@gmail.com
              <br />
              광고문의 : 010.1234.5678 월-금 (09:00 - 18:00)
            </Typography>
          </Grid>
        </Grid>
        <p className="copyright">Copyright {' © '} 2022 by HANZOOM</p>
      </Container>
    </MyFooter>
  );
};
const MyFooter = styled.div`
  width: 100%;
  height: 250px;
  bordertop: '1px solid rgb(241, 241, 241)';
  backgroundcolor: '#f7c343';
  paddingbottom: '100%';
  // color: '#fff';
  text-align: center;
  @media (max-width: 900px) {
    height: 410px;
  }
`;
const footerBackground = {
  backgroundColor: 'rgb(241, 241, 241)',
  color: '#fff',
};
