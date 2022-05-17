import { useState, useRef } from 'react';
import { Axios } from '../../../core/axios';
import { axios_apis } from '../../../core/axios';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

export const FindPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);

  const emailInput = useRef();
  const nicknameInput = useRef();

  const navigate = useNavigate();

  const findPassword = async () => {
    if (email == '') {
      alert('이메일을 입력해주세요.');
      emailInput.current.focus();
      return;
    }
    if (nickname == '') {
      alert('닉네임 입력해주세요.');
      nicknameInput.current.focus();
      return;
    }

    const chkResult = await Axios.get(`${axios_apis.users.emailCheck}/${email}`);
    if (chkResult.data) {
      alert('존재하지 않는 이메일입니다.');
      emailInput.current.focus();
      return;
    }

    setLoading(true);
    Axios.post('/email/send', {
      userEmail: email,
      userNickname: nickname,
    })
      .then((res) => {
        setLoading(false);
        swal('비밀번호 찾기 성공', '이메일로 임시비밀번호를 전송하였습니다.', 'success', {
          buttons: false,
          timer: 1000,
        });
        navigate('/login');
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        swal('비밀번호 찾기 실패', '이메일과 닉네임이 일치하지 않습니다.', 'error', {
          buttons: false,
          timer: 1000,
        });
        nicknameInput.current.focus();
      });
  };

  const onKeyPress = (e) => {
    if (e.key == 'Enter') {
      findPassword();
    }
  };

  return (
    <>
      <section className="container">
        <div className="row">
          <h2 className="title text-center mb-0">FIND</h2>
          <h2 className="title text-center">PASSWORD</h2>
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
              type="text"
              placeholder="닉네임"
              onChange={(e) => setNickname(e.target.value)}
              onKeyPress={onKeyPress}
              ref={nicknameInput}
            />
          </div>
          <button className="formBtn" onClick={findPassword}>
            {loading ? <>FINDING...</> : <>FIND PASSWORD</>}
          </button>
          <div className="text-center findPwdBottom">
            <Link to="/login">
              <p>돌아가기</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
