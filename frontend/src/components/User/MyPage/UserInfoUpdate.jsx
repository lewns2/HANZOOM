import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Axios } from '../../../core/axios';
import { getUserInfo } from '../../../Reducer/userSlice';
import { axios_apis } from '../../../core/axios';
import swal from 'sweetalert';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export const UserInfoUpdate = (props) => {
  const user = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState([]);

  const [userImg, setUserImg] = useState('');
  const [userPreviewImg, setUserPreviewImg] = useState('');
  const [userNickname, setUserNickname] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [passwordType, setPasswordType] = useState({
    type: 'password',
    visible: false,
  });

  const [passwordCheck, setPasswordCheck] = useState(false);
  const [password, setPassword] = useState(null);

  const passwordInput = useRef();
  const nickNameInput = useRef();

  const dispatch = useDispatch();

  const updateUser = async () => {
    if (userNickname.length < 3 || userNickname.length > 12) {
      alert('닉네임은 3~12자리수로 입력해주세요.');
      nickNameInput.current.focus();
      return;
    }

    const chkResult = await Axios.get(`${axios_apis.users.nickNameCheck}/${userNickname}`);
    if (userInfo.userNickname != userNickname && !chkResult.data) {
      alert('이미 사용 중인 닉네임입니다.');
      nickNameInput.current.focus();
      return;
    }

    var rule = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,12}$/;
    if (!rule.test(userPassword)) {
      alert('비밀번호는 8 ~ 12 자리수이며 문자, 숫자, 특수기호를 최소 1개씩 포함해야합니다.');
      passwordInput.current.focus();
      return;
    }
    await updateUserImage();
    await updateUserInfo();
    dispatch(getUserInfo());
  };

  const updateUserImage = async () => {
    const token = sessionStorage.getItem('jwt-token');
    const formData = new FormData();
    formData.append('file', userImg);
    await Axios.put(`${axios_apis.users.update}/profileImage`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {})
      .catch((error) => {
        console.log(error);
        alert('이미지 등록 에러');
      });
  };

  const pwdCheck = () => {
    const token = sessionStorage.getItem('jwt-token');
    Axios.post(`${axios_apis.users.passwordCheck}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        userPassword: password,
      },
    }).then((res) => {
      if (res.data) {
        setPasswordCheck(true);
        setUserPassword(password);
      } else {
        alert('비밀번호가 틀렸습니다.');
      }
    });
  };

  const updateUserInfo = async () => {
    const token = sessionStorage.getItem('jwt-token');

    await Axios.put(
      `${axios_apis.users.update}`,
      {
        userNickname: userNickname,
        userPassword: userPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then(() => {
        swal('회원 정보 수정이 완료되었습니다.', '  ', 'success', {
          buttons: false,
          timer: 1800,
        });
        props.setModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onKeyPressCheck = (e) => {
    if (e.key == 'Enter') {
      pwdCheck();
    }
  };

  const onKeyPress = (e) => {
    if (e.key == 'Enter') {
      updateUser();
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

  useEffect(() => {
    setUserInfo(user.userInfo);
  }, []);

  useEffect(() => {
    setUserImg(userInfo.userImage);
    setUserNickname(userInfo.userNickname);
  }, [userInfo]);

  return (
    <div className="updateModal">
      <div className={!passwordCheck ? 'formWrap pwdChkWrap' : 'formWrap'}>
        <h4 className="text-center mb-3">{!passwordCheck ? <>비밀번호 확인</> : <>정보 수정</>}</h4>
        {!passwordCheck ? (
          <input
            className="form-control mb-4 fontMedium"
            type="password"
            placeholder="비밀번호를 입력하세요."
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={onKeyPressCheck}
          />
        ) : (
          <>
            <div className="row mb-4">
              <div className="col-lg-3 label">이미지</div>
              <div className="col-lg-9">
                <div className="uploadImage">
                  <img
                    className=""
                    src={userPreviewImg ? `${userPreviewImg}` : '/img/basicProfile.png'}
                    alt=""
                  />
                </div>
                <input
                  type="file"
                  className="imgInput"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files[0].size > 1024 * 1024) {
                      alert('이미지는 1MB이내로 등록이 가능합니다.');
                      return;
                    }
                    setUserPreviewImg(URL.createObjectURL(e.target.files[0]));
                    setUserImg(e.target.files[0]);
                  }}
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-lg-3 label">닉네임</div>
              <div className="col-lg-9">
                <input
                  className="form-control fontMedium"
                  type="text"
                  value={userNickname}
                  onChange={(e) => setUserNickname(e.target.value)}
                  onKeyPress={onKeyPress}
                  ref={nickNameInput}
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-lg-3 label">비밀번호</div>
              <div className="col-lg-9 pwdInput">
                <input
                  className="form-control fontMedium"
                  type={passwordType.type}
                  value={userPassword}
                  placeholder="변경할 비밀번호를 입력하세요."
                  onChange={(e) => setUserPassword(e.target.value)}
                  onKeyPress={onKeyPress}
                  ref={passwordInput}
                />
                <span className="visibleIcon">
                  {!passwordType.visible ? (
                    <VisibilityIcon style={{ fontSize: '30px' }} onClick={handlePasswordType} />
                  ) : (
                    <VisibilityOffIcon style={{ fontSize: '30px' }} onClick={handlePasswordType} />
                  )}
                </span>
              </div>
            </div>
          </>
        )}

        <div className="d-flex justify-content-center">
          <button className="cancelBtn" onClick={() => props.setModalOpen(false)}>
            취소
          </button>
          {!passwordCheck ? (
            <button className="updateBtn" onClick={pwdCheck}>
              확인
            </button>
          ) : (
            <button className="updateBtn" onClick={updateUser}>
              수정
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
