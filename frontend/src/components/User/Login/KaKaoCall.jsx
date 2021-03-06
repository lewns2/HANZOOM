import { useState, useEffect } from 'react';
import { Axios } from '../../../core/axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserInfo, setLoginType } from '../../../Reducer/userSlice';
import swal from 'sweetalert';

export const KaKaoCall = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [code, setCode] = useState(null);
  const temp = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    setCode(temp);
  }, []);

  useEffect(() => {
    if (code !== null) {
      getKaKaoUserInfoAPI();
    }
  }, [code]);

  const getKaKaoUserInfoAPI = async () => {
    const browerToken =
      localStorage.getItem('browerToken') === null ? '' : localStorage.getItem('browerToken');
    await Axios.post(`/auth/kakao/${code}`, browerToken)
      .then((res) => {
        if (res.data.accessToken) {
          sessionStorage.setItem('jwt-token', res.data.accessToken);
        }
        dispatch(getUserInfo());
        dispatch(setLoginType('카카오'));
        swal('카카오 로그인 성공', '  ', 'success', {
          buttons: false,
          timer: 1800,
        });
        navigate('/');
      })
      .catch((err) => {
        navigate('/login');
        if (err.response.data.statusCode === 401) {
          swal(
            '로그인 실패',
            '비밀 번호가 일치 하지 않습니다. \n비밀 번호를 다시 입력해주세요.',
            'error',
            {
              buttons: false,
              timer: 2000,
            },
          );
          passwordInput.current.focus();
        } else if (err.response.data.statusCode === 403) {
          swal('로그인 실패', '신고 최대 횟수(3회) 초과로\n사용 불가한 계정입니다.', 'error', {
            buttons: false,
            timer: 2000,
          });
        }
      });
  };

  return (
    <>
      <div></div>
    </>
  );
};
