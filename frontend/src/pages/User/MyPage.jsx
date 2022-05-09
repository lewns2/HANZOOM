import { UserInfo } from '../../components/User/MyPage/UserInfo';
import { UserCalendar } from '../../components/User/MyPage/UserCalendar';
import { FavoriteList } from '../../components/User/MyPage/FavoriteList';
import { UserInfoUpdate } from '../../components/User/MyPage/UserInfoUpdate';
import './MyPage.scss';
import { useState } from 'react';

export const MyPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="container mt-4">
        {modalOpen ? <UserInfoUpdate open={modalOpen} setModalOpen={setModalOpen} /> : null}
        <h1 className="pageTitle">마이페이지</h1>
        <div className="myPageWrap">
          <div className="row">
            <div className="col-lg-6 col-sm-12 d-flex align-items-center">
              <UserInfo setModalOpen={setModalOpen} />
            </div>
            <div className="col-lg-6 col-sm-12 d-flex justify-content-center">
              <UserCalendar />
            </div>
          </div>
        </div>
        <div className="favoriteListWrap">
          <h3>찜목록</h3>
          <FavoriteList />
        </div>
      </section>
    </>
  );
};
