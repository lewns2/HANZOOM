import { useState, useRef, useEffect } from 'react';
import { Axios } from '../../../core/axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../../../Reducer/userSlice';
import swal from 'sweetalert'; // 예쁜 alert 창을 위해 사용
export const KaKaoCall = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [code, setCode] = useState(null);
  const temp = new URL(window.location.href).searchParams.get('code');
  console.log('처음 >>>>>>>>>>>>>>>>>>>>>>>>>' + code);
  // const { code } = useSelector((state) => state.user);
  // setCode(temp);
  useEffect(() => {
    setCode(temp);
    // console.log(new URL(window.location.href));
    // setCode(new URL(window.location.href).searchParams.get('code'));
  }, []);
  useEffect(() => {
    if (code !== null) {
      console.log('if 안 >>>>>>>>>>>>>>>>>>>>>>' + code);
      getKaKaoUserInfoAPI();
    }
  }, [code]);
  const getKaKaoUserInfoAPI = async () => {
    await Axios.post(`/auth/kakao/${code}`)
      .then((res) => {
        console.log(res);
        if (res.data.accessToken) {
          localStorage.setItem('jwt-token', res.data.accessToken);
        }
        dispatch(getUserInfo());
        swal('로그인 성공', '  ', 'success', {
          buttons: false,
          timer: 1800,
        });
        navigate('/');
      })
      .catch(() => {
        alert('로그인 문제');
      });
  };

  return (
    <>
      <div>{console.log('>>>>>>>>>>>>>>>>>>>>>>>>> 처음ㄴ useEffect' + code)};</div>
    </>
  );
};
