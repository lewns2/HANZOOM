import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import feature from '../../assets/images/map.png';
import DragNDrop from '../../assets/images/dragndrop.gif';

import { mainButton, item, number, image } from './Main.style';
import swal from 'sweetalert';

export const Feature = () => {
  // redux user 테스트
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const loginGo = () => {
    navigate('/login');
  };
  const myIngreGo = () => {
    if (!user.userInfo.lng && !user.userInfo.lat) {
      swal('위치 정보를 설정해주세요.', '한줌 서비스를 이용하기 위해 위치 정보가 필요합니다');
      return;
    }
    navigate('/my-food-ingredients');
  };
  return (
    // <Box
    //   component="section"
    //   sx={{
    //     display: 'flex',
    //     overflow: 'hidden',
    //   }}>
    //   <Container
    //     sx={{
    //       mt: 10,
    //       mb: 12,
    //       position: 'relative',
    //       display: 'flex',
    //       flexDirection: 'column',
    //       alignItems: 'center',
    //     }}>
    //     <Box
    //       component="img"
    //       alt="curvy lines"
    //       sx={{
    //         pointerEvents: 'none',
    //         position: 'absolute',
    //         top: -180,
    //         opacity: 0.7,
    //       }}
    //     />
    <div className="featureWrap">
      <Grid container spacing={6}>
        <Grid item xs={12} sm={8} md={6}>
          <Grid
            container
            spacing={0}
            direction="column"
            // alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100%' }}>
            <Grid item xs={3}>
              <h2>1. 나만의 식재료 관리</h2>
              <div className="featureContent">
                MY식재료에서 나만의 식재료를 관리할 수 있어요!
                <br />
                <strong>드래그 앤 드랍 (Drag & Drop)</strong>으로 쉽게 주변 사람들과
                <br />
                식재료를 교환&middot; 나눔하여 식재료 낭비를 줄여 지구를 생각해봐요.
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4} md={6}>
          <img className="featureimage" src={DragNDrop} alt="matching" />
        </Grid>
      </Grid>
      {/** xs 는 반응형 사이즈에서 차지하는 column의 수를 말함*/}
      {/* <Grid container spacing={5}>
        <Grid item xs={12} md={3}>
          <Box sx={item}>
            <Box className="featureimage" component="img" src={feature} alt="suitcase" sx={image} />
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
      </Grid> */}
    </div>
    //   </Container>
    // </Box>
  );
};
