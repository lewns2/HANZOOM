import React from 'react';
import Grid from '@mui/material/Grid';
import Chat from '../../assets/images/feature_chat.gif';

export const Feature4 = () => {
  return (
    <div className="featureRightWrap">
      <Grid container spacing={6}>
        <Grid className="regularScreen" item xs={12} sm={6} md={6}>
          <img className="featureimage" src={Chat} alt="chat" />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Grid
            container
            spacing={0}
            direction="column"
            justifyContent="center"
            style={{ minHeight: '100%' }}>
            <Grid item xs={3}>
              <h2>4. 유저 간 채팅</h2>
              <div className="featureSubTitle">유저 간 채팅을 통해 소통할 수 있어요!</div>
              <div className="featureContent">
                원하는 교환&middot;나눔 게시글을 선택하여 해당 유저와{' '}
                <strong>채팅을 통해 일정</strong>을 잡아보아요.
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid className="mobileScreen" item xs={12} sm={6} md={6}>
          <img className="featureimage" src={Chat} alt="chat" />
        </Grid>
      </Grid>
    </div>
  );
};
