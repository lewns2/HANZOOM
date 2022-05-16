import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

import { clearUser } from '../Reducer/userSlice';
import { clearChat } from '../Reducer/chatSlice';
import './Header.scss';
import swal from 'sweetalert'; // 예쁜 alert 창을 위해 사용
import { PositioningMapModal } from './Map/PositioningMapModal';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export const Header = () => {
  const [modalShow, setModalShow] = useState(false);
  const [userLocName, setUserLocName] = useState(null);
  const [beforeLoginPage, setBeforeLoginPage] = useState(false);

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const logout = () => {
    swal('로그아웃 되었습니다.', '  ', 'success', {
      buttons: false,
      timer: 1800,
    });
    dispatch(clearUser());
    dispatch(clearChat());
  };

  const getAddrName = () => {
    var geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2RegionCode(user.userInfo.lng, user.userInfo.lat, displayAddrName);
  };

  // 행정동 주소정보를 표시하는 함수
  const displayAddrName = (result, status) => {
    if (status === kakao.maps.services.Status.OK) {
      for (var i = 0; i < result.length; i++) {
        // 행정동의 region_type 값은 'H' 이므로
        if (result[i].region_type === 'H') {
          let addrName = result[i].address_name;
          setUserLocName(addrName);
          break;
        }
      }
    }
  };

  const moveHandler = (e) => {
    if (!user.userInfo.lng && !user.userInfo.lat) {
      e.preventDefault();
      swal('위치 정보를 설정해주세요.', '한줌 서비스를 이용하기 위해 위치 정보가 필요합니다');
    }
  };

  useEffect(() => {
    if (user.userInfo.lng && user.userInfo.lat) {
      getAddrName();
    }
    const token = sessionStorage.getItem('jwt-token');
    console.log(token);
    if (!token) dispatch(clearUser());
  }, []);

  useEffect(() => {
    if (user.userInfo.lng && user.userInfo.lat) {
      setModalShow(false);
      getAddrName();
    }
    setBeforeLoginPage(user.beforeLogin);
  }, [user]);

  return (
    <header>
      <PositioningMapModal show={modalShow} onHide={() => setModalShow(false)} />
      <Navbar collapseOnSelect expand="lg">
        <Container>
          <div className="logo">
            <Link to="/">한줌</Link>
          </div>
          {user.userInfo.length != 0 ? (
            <div className="positioning">
              {user.userInfo.lat && user.userInfo.lat ? (
                <div className="addrName">{userLocName}</div>
              ) : (
                <div className="addrName">위치 정보를 설정해주세요.</div>
              )}

              <span className="locationIcon">
                <LocationOnIcon onClick={() => setModalShow(true)} />
              </span>
            </div>
          ) : null}
          {!beforeLoginPage && <Navbar.Toggle aria-controls="responsive-navbar-nav" />}
          <Navbar.Collapse id="responsive-navbar-nav" style={{ textAlign: 'center' }}>
            <Nav className="nav-menu ms-auto">
              {user.userInfo.length == 0 ? (
                !beforeLoginPage && (
                  <>
                    <Link to="/login">로그인</Link>
                    <Link to="/signup" className="hi">
                      회원가입
                    </Link>
                  </>
                )
              ) : (
                <>
                  <Link to="/my-food-ingredients" onClick={(event) => moveHandler(event)}>
                    MY식재료
                  </Link>
                  <Link to="/board" onClick={(event) => moveHandler(event)}>
                    게시판
                  </Link>
                  <Link to="/my-page">MY페이지</Link>
                  {user.userInfo.userNickname === 'admin' && <Link to="/admin">관리자</Link>}
                  <Link to="/" onClick={logout} style={{ marginRight: '0' }}>
                    로그아웃
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
