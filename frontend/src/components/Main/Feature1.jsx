import React from 'react';
import Grid from '@mui/material/Grid';
import DragNDrop from '../../assets/images/feature_dragndrop.gif';

export const Feature1 = () => {
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
              <h2>1. 나만의 식재료 관리</h2>
              <div className="featureSubTitle">MY식재료에서 나만의 식재료를 관리할 수 있어요!</div>
              <div className="featureContent">
                <strong>드래그 앤 드랍 (Drag & Drop)</strong>으로 쉽게 주변 사람들과
                <span className="regularScreen">
                  <br />
                </span>
                식재료를 교환&middot; 나눔하여 식재료 낭비를 줄여 지구를 생각해봐요.
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <img className="featureimage" src={DragNDrop} alt="dragndrop" />
        </Grid>
      </Grid>
    </div>
  );
};
