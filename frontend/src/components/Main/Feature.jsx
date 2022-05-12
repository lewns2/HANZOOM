import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import feature from '../../assets/images/map.png';

import { mainButton, item, number, image } from './Main.style';
export const Feature = () => {
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
    <Box
      component="section"
      sx={{
        display: 'flex',
        overflow: 'hidden',
      }}>
      <Container
        sx={{
          mt: 10,
          mb: 12,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Box
          component="img"
          alt="curvy lines"
          sx={{
            pointerEvents: 'none',
            position: 'absolute',
            top: -180,
            opacity: 0.7,
          }}
        />

        {/** xs 는 반응형 사이즈에서 차지하는 column의 수를 말함*/}
        <Grid container spacing={5}>
          <Grid item xs={12} md={3}>
            <Box sx={item}>
              <Box
                className="featureimage"
                component="img"
                src={feature}
                alt="suitcase"
                sx={image}
              />
            </Box>
          </Grid>

          <Grid item xs={14} md={9}>
            <Box sx={item}>
              <Box sx={number}>
                <section id="main2">
                  <h1 className="featuretitle" style={{ paddingTop: '20px' }}>
                    내 주변 이웃들과 나누세요!
                  </h1>
                  <p>냉장고 속 남는 재료를 필요로 하는 내 주변 이웃들과 나눌 수 있습니다.</p>
                  <p>그리고 나에게 필요한 식재료를 이웃으로 부터 찾을 수도 있습니다.</p>
                </section>
              </Box>

              {user.userInfo.length !== 0 ? (
                <button className="myIngreGo" style={mainButton} onClick={myIngreGo}>
                  매칭하러 가기 GO
                </button>
              ) : (
                <button className="loginGo" style={mainButton} onClick={loginGo}>
                  한줌 즐기러 가기 GO
                </button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
