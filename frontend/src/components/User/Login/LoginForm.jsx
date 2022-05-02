import { useState, useRef } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import kakaoimage from '../../../assets/images/kakao_login_medium_narrow.png';
import { Axios } from '../../../core/axios';
import { axios_apis } from '../../../core/axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserInfo, setCode } from '../../../Reducer/userSlice';
import swal from 'sweetalert'; // 예쁜 alert 창을 위해 사용
export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordType, setPasswordType] = useState({
    type: 'password',
    visible: false,
  });

  const emailInput = useRef();
  const passwordInput = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async () => {
    if (email == '') {
      alert('이메일을 입력해주세요.');
      emailInput.current.focus();
      return;
    }
    if (password == '') {
      alert('패스워드를 입력해주세요.');
      passwordInput.current.focus();
      return;
    }

    const chkResult = await Axios.get(`${axios_apis.users.emailCheck}/${email}`);
    if (chkResult.data) {
      swal('로그인 실패', '존재하지 않는 이메일입니다.\n 이메일을 다시 확인해주세요!', 'error', {
        buttons: false,
        timer: 2000,
      });
      emailInput.current.focus();
      return;
    }

    Axios.post('/auth/login', {
      userEmail: email,
      userPassword: password,
    })
      .then((res) => {
        console.log(res);
        if (res.data.accessToken) {
          sessionStorage.setItem('jwt-token', res.data.accessToken);
        }
        dispatch(getUserInfo());
        swal('로그인 성공', '  ', 'success', {
          buttons: false,
          timer: 1800,
        });
        navigate('/');
      })
      .catch(() => {
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
      });
  };

  const onKeyPress = (e) => {
    if (e.key == 'Enter') {
      login();
    }
  };

  const handlePasswordType = () => {
    setPasswordType(() => {
      if (!passwordType.visible) {
        return { type: 'text', visible: true };
      }
      return { type: 'password', visible: false };
    });
  };

  const REST_API_KEY = '112573439184cd2fae91493c54ed80a9';
  const REDIRECT_URI = 'http://localhost:3000/oauth/kakao/callback';
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const onSocialLogin = async () => {
    console.log(new URL(window.location.href));
    const code = new URL(window.location.href).searchParams.get('code');
    dispatch(setCode(code));
    console.log('debug>>>>>>>>>>>>>>>>>>' + code);
  };

  return (
    <>
      <section className="container">
        <div className="row">
          <h2 className="title text-center">LOGIN</h2>
          <div className="formInput">
            <input
              className="form-control"
              type="text"
              placeholder="이메일"
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={onKeyPress}
              ref={emailInput}
            />
          </div>
          <div className="formInput">
            <input
              className="form-control"
              type={passwordType.type}
              placeholder="비밀번호"
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={onKeyPress}
              ref={passwordInput}
            />
            <span className="visibleIcon">
              {!passwordType.visible ? (
                <VisibilityIcon style={{ fontSize: '32px' }} onClick={handlePasswordType} />
              ) : (
                <VisibilityOffIcon style={{ fontSize: '32px' }} onClick={handlePasswordType} />
              )}
            </span>
          </div>
          <button className="formBtn" onClick={login}>
            LOGIN
          </button>
          <div className="loginBottom d-flex justify-content-between">
            <Link to="/find-password">
              <p className="findPwd">비밀번호 찾기</p>
            </Link>

            <Link to="/signup">
              <p>계정이 없으신가요? 회원가입 하러가기</p>
            </Link>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <a href={KAKAO_AUTH_URL}>
              <img src={kakaoimage} onClick={onSocialLogin} alt="kakao login button" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
