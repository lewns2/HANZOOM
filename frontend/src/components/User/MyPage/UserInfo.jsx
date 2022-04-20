import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const UserInfo = () => {
  const user = useSelector((state) => state.user);

  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    setUserInfo(user.userInfo);
  }, []);

  return (
    <>
      <section className="userInfoWrap">
        {console.log(userInfo)}
        <div className="row">
          <div className="col-4 userImage">
            <img
              className=""
              src={userInfo.userImage ? `${userInfo.userImage}` : '/img/basicProfile.png'}
              alt=""
            />
          </div>
          <div className="col-8 userContent">
            <p className="userNickName">{userInfo.userNickname}</p>
            <p className="userEmail">{userInfo.userEmail}</p>
            <div className="buttons">
              <button className="withdrawBtn">회원 탈퇴</button>
              <button className="updateBtn">정보 수정</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
