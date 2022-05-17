import React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import BannerLayout from './BannerLayout';
import bannerImg from '../../assets/images/fridge.gif';
import { useNavigate } from 'react-router-dom';
import { mainButton } from './Main.style';
import swal from 'sweetalert';

export const Banner = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleRegister = () => {
    if (user.userInfo.length !== 0) {
      if (!user.userInfo.lng && !user.userInfo.lat) {
        swal('위치 정보를 설정해주세요.', '한줌 서비스를 이용하기 위해 위치 정보가 필요합니다');
        return;
      }
      navigate('my-food-ingredients');
    } else {
      navigate('/login');
    }
  };
  return (
    <BannerLayout
      sxBackground={{
        backgroundImage: `url(${bannerImg})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}>
      <h1 align="center" style={{ fontSize: '50px' }}>
        SHARE YOUR FOOD
      </h1>
      <Typography
        color="inherit"
        align="center"
        variant="h2"
        sx={{
          mb: 2,
          mt: {
            sx: 4,
            sm: 10,
          },
        }}>
        <div
          className="intro d-flex align-items-center"
          style={{ fontSize: '30px', fontFamily: 'GmarketSansMedium' }}>
          냉장고 속 남는 재료, <br /> 이제 버리지 마세요!
        </div>
      </Typography>
      <button style={mainButton} onClick={handleRegister}>
        START
      </button>
      <Typography
        variant="body2"
        color="inherit"
        sx={{
          mt: 2,
        }}></Typography>
    </BannerLayout>
  );
};
