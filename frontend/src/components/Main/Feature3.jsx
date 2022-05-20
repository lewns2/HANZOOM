import React from 'react';
import Grid from '@mui/material/Grid';
import Matching from '../../assets/images/feature_matching.gif';

export const Feature3 = () => {
  return (
    <div className="featureLeftWrap">
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6} md={6}>
          <Grid
            container
            spacing={0}
            direction="column"
            justifyContent="center"
            style={{ minHeight: '100%' }}>
            <Grid item xs={3}>
              <h2>3. 위치기반 식재료 매칭</h2>
              <div className="featureSubTitle">
                <strong>위치를 기반</strong>으로 원하는 식재료를 한눈에 파악할 수 있어요!
              </div>
              <div className="featureContent">
                MY식재료에서 원하는 식재료를 선택하여 내 주변에 식재료를 가진 사람과
                교환&middot;나눔을 할 수 있어요.
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <img className="featureimage" src={Matching} alt="matching" />
        </Grid>
      </Grid>
    </div>
  );
};
