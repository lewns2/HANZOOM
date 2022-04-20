import { UserInfo } from '../../components/User/MyPage/UserInfo';
import { UserCalendar } from '../../components/User/MyPage/UserCalendar';
import { FavoriteList } from '../../components/User/MyPage/FavoriteList';
import './MyPage.scss';

export const MyPage = () => {
  return (
    <>
      <section className="container">
        <h1 className="pageTitle">마이페이지</h1>
        <div className="myPageWrap">
          <div className="row">
            <div className="col-lg-6 col-sm-12">
              <UserInfo />
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
