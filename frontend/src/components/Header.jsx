import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

import { clearUser } from '../Reducer/userSlice';
import './Header.scss';
import swal from 'sweetalert'; // 예쁜 alert 창을 위해 사용
import { PositioningMapModal } from './Map/PositioningMapModal';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export const Header = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [userLocName, setUserLocName] = useState(null);

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const logout = () => {
    swal('로그아웃 되었습니다.', '  ', 'success', {
      buttons: false,
      timer: 1800,
    });
    dispatch(clearUser());
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

  useEffect(() => {
    if (user.userInfo.lng && user.userInfo.lat) {
      getAddrName();
    }
  }, []);

  useEffect(() => {
    if (user.userInfo.lng && user.userInfo.lat) {
      setModalShow(false);
      getAddrName();
    }
  }, [user]);

  return (
    <header>
      {/* {console.log(userLocName)}
      {console.log(user.userInfo)} */}
      <PositioningMapModal show={modalShow} onHide={() => setModalShow(false)} />
      <Navbar collapseOnSelect expand="lg">
        <Container>
          <div className="logo">
            <Link to="/">한줌</Link>
          </div>
          {user.userInfo.length != 0 ? (
            <div className="positioning">
              {/* <div className="addrName">부산광역시 강서구 명지동</div> */}
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
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="nav-menu ms-auto">
              <Link to="/board">게시판</Link>
              {user.userInfo.length == 0 ? (
                <>
                  <Link to="/login">로그인</Link>
                  <Link to="/signup" className="hi">
                    회원가입
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/martmap">마트맵</Link>
                  <Link to="/my-food-ingredients">MY식재료</Link>
                  <Link to="/my-page">MY페이지</Link>
                  <Link to="/" onClick={logout}>
                    로그아웃
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <nav className='navbar navbar-expand-lg navbar-light'>
        <div>
          <Link to="/main">한줌</Link>
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <div className='nav-menu ms-auto d-flex justify-content-between'>
            <Link to="/board">게시판</Link>
          
            <Link to="/my-food-ingredients">MY식재료</Link>
          
            <Link to="/my-page">MY페이지</Link>

            <Link to="/login">로그인</Link>
          
            <Link to="/signup">회원가입</Link>
          </div>
          <div>
            <div onClick={logout}>로그아웃</div>
          </div>
        </div>
      </nav> */}
    </header>
  );
};
