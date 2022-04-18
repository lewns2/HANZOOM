import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export const SignUpForm = () => {
  return (
    <>
      <section className="container">
        <div className="row">
          <h2 className="title text-center">SIGN UP</h2>
          <div className="formInput">
            <input className="form-control nickName" type="text" placeholder="닉네임" />
            <button className="checkBtn">중복확인</button>
          </div>
          <div className="formInput">
            <input className="form-control" type="text" placeholder="이메일" />
            <button className="checkBtn">중복확인</button>
          </div>
          <div className="formInput">
            <input className="form-control" type="password" placeholder="비밀번호" />
            <span className="visibleIcon">
              <VisibilityIcon style={{ fontSize: '32px' }} />
            </span>
          </div>
          <div className="formInput">
            <input className="form-control" type="password" placeholder="비밀번호 확인" />
            <span className="visibleIcon">
              <VisibilityIcon style={{ fontSize: '32px' }} />
            </span>
          </div>
          <button className="signUpBtn">SIGN UP</button>
          <p className="loginExplain">이미 계정이 있나요? 로그인하러 가기</p>
        </div>
      </section>
    </>
  );
};
