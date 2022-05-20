import React from 'react';
import Grid from '@mui/material/Grid';
import Recipe from '../../assets/images/feature_recipe.gif';

export const Feature2 = () => {
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
                만개의 레시피 API를 이용하여 다양한 레시피 정보를 확인하고 남은 식재료를 활용하여
                맛있는 요리를 해봐요.
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
