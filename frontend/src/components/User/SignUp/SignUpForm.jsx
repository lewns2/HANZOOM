import { useState, useRef } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { Axios } from '../../../core/axios';

export const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [nickName, setNickName] = useState('');
  const [password1, setPassword1] = useState(null);
  const [password2, setPassword2] = useState(null);
  const [password1Type, setPassword1Type] = useState({
    type: 'password',
    visible: false,
  });
  const [password2Type, setPassword2Type] = useState({
    type: 'password',
    visible: false,
  });
  const [emailChkState, setEmailChkState] = useState(false);
  const [nickNameChkState, setNickNameChkState] = useState(false);

  const nickNameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();

  const signUp = () => {
    if (!nickNameChkState) {
      alert('닉네임 중복확인을 해주세요.');
      nickNameInput.current.focus();
      return;
    }

    if (!emailChkState) {
      alert('이메일 중복확인을 해주세요.');
      emailInput.current.focus();
      return;
    }

    if (password1 != password2) {
      alert('비밀번호가 일치하지 않습니다.');
      passwordInput.current.focus();
      return;
    }

    var rule = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,12}$/;
    if (!rule.test(password1) || !rule.test(password2)) {
      alert('비밀번호는 8 ~ 12 자리수이며 문자, 숫자, 특수기호를 최소 1개씩 포함해야합니다.');
      return;
    }

    Axios.post('/users/register/signup', {
      // params: {
      userEmail: email,
      userNickname: nickName,
      userPassword: password1,
      // },
    })
      .then(() => {
        alert('회원가입이 완료되었습니다.');
      })
      .catch((error) => {
        alert('회원가입 실패!');
        console.log(error);
      });
  };

  // 닉네임 중복 검사
  const nickNameChk = () => {
    if (nickName == '') {
      alert('닉네임을 입력해주세요.');
      nickNameInput.current.focus();
      return;
    }

    if (nickName.length < 3 || nickName.length > 12) {
      alert('닉네임은 3~12자리수로 입력해주세요.');
      nickNameInput.current.focus();
      return;
    }

    const chkResult = Axios.get(`/users/nicknameCheck/${nickName}`);
    if (chkResult) {
      alert('사용 가능한 닉네임입니다.');
      setNickNameChkState(true);
    } else alert('이미 사용 중인 닉네임입니다.');
  };

  // 이메일 중복 검사
  const emailChk = () => {
    if (email == '') {
      alert('이메일을 입력해주세요.');
      emailInput.current.focus();
      return;
    }

    var rule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
    if (!rule.test(email)) {
      alert('유효한 이메일 형식이 아닙니다.');
      return;
    }

    const chkResult = Axios.get(`/users/emailCheck/${email}`);
    if (chkResult) {
      alert('사용 가능한 이메일입니다.');
      setEmailChkState(true);
    } else alert('이미 사용 중인 이메일입니다.');
  };

  const handlePassword1Type = () => {
    setPassword1Type(() => {
      if (!password1Type.visible) {
        return { type: 'text', visible: true };
      }
      return { type: 'password', visible: false };
    });
  };

  const handlePassword2Type = () => {
    setPassword2Type(() => {
      if (!password2Type.visible) {
        return { type: 'text', visible: true };
      }
      return { type: 'password', visible: false };
    });
  };

  return (
    <>
      <section className="container">
        {console.log(nickName)}
        <div className="row">
          <h2 className="title text-center">SIGN UP</h2>
          <div className="formInput">
            <input
              className="form-control nickName"
              type="text"
              placeholder="닉네임"
              onChange={(e) => setNickName(e.target.value)}
              ref={nickNameInput}
            />
            <button className="checkBtn" onClick={nickNameChk}>
              중복확인
            </button>
          </div>
          <div className="formInput">
            <input
              className="form-control"
              type="text"
              placeholder="이메일"
              onChange={(e) => setEmail(e.target.value)}
              ref={emailInput}
            />
            <button className="checkBtn" onClick={emailChk}>
              중복확인
            </button>
          </div>
          <div className="formInput">
            <input
              className="form-control"
              // type="password"
              type={password1Type.type}
              placeholder="비밀번호"
              onChange={(e) => setPassword1(e.target.value)}
            />
            <span className="visibleIcon">
              {!password1Type.visible ? (
                <VisibilityIcon style={{ fontSize: '32px' }} onClick={handlePassword1Type} />
              ) : (
                <VisibilityOffIcon style={{ fontSize: '32px' }} onClick={handlePassword1Type} />
              )}
            </span>
          </div>
          <div className="formInput">
            <input
              className="form-control"
              type={password2Type.type}
              placeholder="비밀번호 확인"
              onChange={(e) => setPassword2(e.target.value)}
              ref={passwordInput}
            />
            <span className="visibleIcon">
              {!password2Type.visible ? (
                <VisibilityIcon style={{ fontSize: '32px' }} onClick={handlePassword2Type} />
              ) : (
                <VisibilityOffIcon style={{ fontSize: '32px' }} onClick={handlePassword2Type} />
              )}
            </span>
          </div>
          <button className="signUpBtn" onClick={signUp}>
            SIGN UP
          </button>
          <p className="loginExplain">이미 계정이 있나요? 로그인하러 가기</p>
        </div>
      </section>
    </>
  );
};
