import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import Recipe from '../../assets/images/feature_recipe.gif';

import swal from 'sweetalert';

export const Feature2 = () => {
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
    <div className="featureRightWrap">
      <Grid container spacing={6}>
        <Grid className="regularScreen" item xs={12} sm={6} md={6}>
          <img className="featureimage" src={Recipe} alt="recipe" />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Grid
            container
            spacing={0}
            direction="column"
            // alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100%' }}>
            <Grid item xs={3}>
              <h2>2. 레시피 추천</h2>
              <div className="featureSubTitle">
                <strong>원하는 식재료를 기반</strong>으로 레시피를 추천받을 수 있어요!
              </div>
              <div className="featureContent">
                만개의 레시피 API를 이용하여 다양한 레시피 정보를 확인하고
                <span className="regularScreen">
                  <br />
                </span>
                남은 식재료를 활용하여 맛있는 요리를 해봐요.
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid className="mobileScreen" item xs={12} sm={6} md={6}>
          <img className="featureimage" src={Recipe} alt="recipe" />
        </Grid>
      </Grid>
    </div>
  );
};
