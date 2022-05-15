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
      navigate('/signup');
    }
  };
  return (
    <BannerLayout
      sxBackground={{
        backgroundImage: `url(${bannerImg})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}>
      <h1 align="center">SHARE YOUR FOOD</h1>
      {/* <Typography color="inherit" align="center" variant="h2" marked="center">
        SHARE YOUR FOOD
      </Typography> */}
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{
          mb: 2,
          mt: {
            sx: 4,
            sm: 10,
          },
        }}>
        {/* Keep an eye on what you eat and how you do your workout. */}
        <h2 className="intro d-flex align-items-center">
          냉장고 속 남는 재료, <br /> 이제 버리지 마세요!
        </h2>
      </Typography>
      <button className="Register" style={mainButton} onClick={handleRegister}>
        REGISTER
      </button>
      {/* <Button
        variant="contained"
        size="large"
        component="a"
        style={mainButton}
        sx={{
          minWidth: 200,
        }}
        onClick={handleRegister}>
        Register
      </Button> */}
      <Typography
        variant="body2"
        color="inherit"
        sx={{
          mt: 2,
        }}></Typography>
    </BannerLayout>
  );
};
