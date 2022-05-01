import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Axios } from '../../../core/axios';
import { getUserInfo } from '../../../Reducer/userSlice';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export const UserInfoUpdate = (props) => {
  const user = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState([]);

  const [userImg, setUserImg] = useState('');
  const [userNickname, setUserNickname] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [passwordType, setPasswordType] = useState({
    type: 'password',
    visible: false,
  });

  const passwordInput = useRef();

  const dispatch = useDispatch();

  const updateUser = () => {
    var rule = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,12}$/;
    if (!rule.test(userPassword)) {
      alert('비밀번호는 8 ~ 12 자리수이며 문자, 숫자, 특수기호를 최소 1개씩 포함해야합니다.');
      passwordInput.current.focus();
      return;
    }
    updateUserInfo();

    // todo: 유저 이미지 변경
    //   updateUserImg();
  };

  const updateUserInfo = async () => {
    const token = sessionStorage.getItem('jwt-token');
    await Axios.put(
      '/users/update',
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
        alert('회원 정보 수정이 완료되었습니다.');
        dispatch(getUserInfo());
        props.setModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
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
    // setUserInfo(user.userInfo);
    setUserImg(userInfo.userImage);
    setUserNickname(userInfo.userNickname);
  }, [userInfo]);

  return (
    <div className="updateModal">
      <div className="formWrap">
        <h4 className="text-center mb-3">정보 수정</h4>
        <div className="row mb-4">
          <div className="col-lg-3 label">이미지</div>
          <div className="col-lg-9">
            <div className="uploadImage">
              <img className="" src={userImg ? `${userImg}` : '/img/basicProfile.png'} alt="" />
            </div>
            <input
              type="file"
              className="imgInput"
              accept="image/*"
              onChange={(e) => setUserImg(URL.createObjectURL(e.target.files[0]))}
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-lg-3 label">닉네임</div>
          <div className="col-lg-9">
            <input
              className="form-control"
              type="text"
              value={userNickname}
              onChange={(e) => setUserNickname(e.target.value)}
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-lg-3 label">비밀번호</div>
          <div className="col-lg-9 pwdInput">
            <input
              className="form-control"
              type={passwordType.type}
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
        <div className="d-flex justify-content-center">
          <button className="updateBtn" onClick={updateUser}>
            수정
          </button>
          <button className="cancelBtn" onClick={() => props.setModalOpen(false)}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};
