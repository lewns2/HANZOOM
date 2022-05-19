import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Axios } from '../../../core/axios';
import { axios_apis } from '../../../core/axios';
import { clearUser } from '../../../Reducer/userSlice';
import { BASE_IMG_URL } from '../../../core/s3';
import swal from 'sweetalert';

export const UserInfo = (props) => {
  const user = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState([]);
  const [loginType, setLoginType] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const withdrawUser = () => {
    if (!confirm('회원 탈퇴하시겠습니까?')) {
      return;
    }

    const token = sessionStorage.getItem('jwt-token');
    Axios.delete(`${axios_apis.users.user}/remove`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        swal('회원 탈퇴가 완료되었습니다.', ' ', 'success', {
          buttons: false,
          timer: 2000,
        });
        dispatch(clearUser());
        navigate('/');
      })
      .catch((error) => {
        swal('회원 탈퇴 실패', '서버 에러', 'error', {
          buttons: false,
          timer: 2000,
        });
        console.log(error);
      });
  };

  useEffect(() => {
    setUserInfo(user.userInfo);
    setLoginType(user.loginType);
  }, []);

  useEffect(() => {
    setUserInfo(user.userInfo);
  }, [user]);

  return (
    <>
      <section className="userInfoWrap">
        <h3>프로필</h3>
        <div className="userImage">
          <img
            className=""
            src={
              loginType == '일반'
                ? userInfo.userImage
                  ? `${BASE_IMG_URL}${userInfo.userImage}`
                  : '/img/basicProfile.png'
                : userInfo.userImage
            }
            alt=""
          />
        </div>
        <div className="userContent">
          <p className="userNickName">{userInfo.userNickname}</p>
          <p className="userEmail">{userInfo.userEmail}</p>
          <div className="buttons">
            <button className="withdrawBtn" onClick={withdrawUser}>
              회원 탈퇴
            </button>
            {loginType == '일반' && (
              <button className="updateBtn" onClick={() => props.setModalOpen(true)}>
                정보 수정
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
