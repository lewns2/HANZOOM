import React from 'react';
import styled from 'styled-components';
import { Container, Grid, Typography } from '@mui/material';
import './Footer.scss';
import Link from '@mui/material/Link';

export const Footer = () => {
  if (location.pathname === '/login') return null;

  return (
    <MyFooter>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
            <Typography className="logoText">한줌 (HANZOOM)</Typography>
            <Typography className="boldText">
              부산광역시 강서구 송정동 녹산산업중로 333,
              <br />
              부울경캠퍼스(삼성전기 부산사업장)
            </Typography>
            <Typography className="regularText">Email : noreply.cdp.hanzoom@gmail.com</Typography>
          </Grid>
          <Grid className="footerMember" item xs={12} sm={6} md={6}>
            <Grid container spacing={{ xs: 1, sm: 1, md: 3 }}>
              <Grid item xs={2} sm={6} md={4}>
                <Link href="https://github.com/heeya15" className="contributor">
                  김광희
                </Link>
              </Grid>
              <Grid item xs={2} sm={6} md={4}>
                <Link href="https://github.com/kdongju" className="contributor">
                  김동주
                </Link>
              </Grid>
              <Grid item xs={2} sm={6} md={4}>
                <Link href="https://github.com/lewns2" className="contributor">
                  김동현
                </Link>
              </Grid>
              <Grid item xs={2} sm={6} md={4}>
                <Link href="https://github.com/yoonjung1205" className="contributor">
                  정윤정
                </Link>
              </Grid>
              <Grid item xs={2} sm={6} md={4}>
                <Link href="https://github.com/youngjin98" className="contributor">
                  최영진
                </Link>
              </Grid>
              <Grid item xs={2} sm={6} md={4}>
                <Link href="https://github.com/ehhclaire" className="contributor">
                  한성희
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Typography className="boldText"></Typography>
        <p className="copyright">Copyright {' © '} 2022 by HANZOOM</p>
      </Container>
    </MyFooter>
  );
};
const MyFooter = styled.div`
  width: 100%;
  height: 250px;
  color: '#fff';
  padding-top: 40px;
  text-align: left;
  background-color: rgb(241, 241, 241);
  @media only screen and (max-width: 869px) {
    // padding: 0 auto;
  }
  @media only screen and (max-width: 414px) {
    text-align: center;
    height: 300px;
  }
`;
