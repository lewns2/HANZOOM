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
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

import firebase from '../firebaseInit';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import alarmFull from '../assets/images/alarmFull.png';
import alarmEmpty from '../assets/images/alarmEmpty.png';

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
    // console.log(token);
    if (!token) dispatch(clearUser());
  }, []);

  useEffect(() => {
    if (user.userInfo.lng && user.userInfo.lat) {
      setModalShow(false);
      getAddrName();
    }
    setBeforeLoginPage(user.beforeLogin);
  }, [user]);

  // firebase database
  const userRef = firebase.database().ref('pendingIngredients');
  const [pendingIngredients, setPendingIngredients] = useState([]);
  useEffect(() => {
    userRef.on('value', (snapshot) => {
      const pendingIngredients = snapshot.val();
      const pendingIngredientsData = [];
      if (user.userInfo.length !== 0) {
        for (let id in pendingIngredients) {
          if (pendingIngredients[id].requestor === user.userInfo.userEmail) {
            pendingIngredientsData.push({ ...pendingIngredients[id], id });
          }
        }
        setPendingIngredients(pendingIngredientsData);
      }
    });
  }, [user]);

  const removePendingIngredient = (id) => {
    userRef.child(id).remove();
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: 7,
      top: 3,
    },
  }));

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
                  {pendingIngredients.length === 0 ? (
                    <>
                      <div onClick={handleClick} style={{ textAlign: 'center', cursor: 'pointer' }}>
                        <StyledBadge
                          showZero={true}
                          badgeContent={pendingIngredients.length}
                          color="warning"
                          style={{ marginRight: '20px' }}
                          className="badge">
                          <div>
                            <img
                              src={alarmEmpty}
                              alt="알람"
                              style={{ width: '20px', height: '20px' }}></img>
                          </div>
                        </StyledBadge>
                      </div>

                      <Popper
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        style={{
                          zIndex: '999',
                        }}>
                        <Box
                          sx={{
                            m: 1,
                            p: 2,
                            bgcolor: 'background.paper',
                            borderRadius: '5px',
                          }}>
                          <ul className="scrollUl">
                            <li
                              style={{
                                display: 'flex',
                                textAlign: 'left',
                                flexDirection: 'column',
                                boxSizing: 'border-box',
                                width: '100%',
                                textDecoration: 'none',
                                position: 'relative',
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start',
                              }}>
                              <p
                                style={{
                                  margin: '0px 0px 0.35em',
                                  fontSize: '0.95rem',
                                  lineHeight: '1.5',
                                  letterSpacing: '0px',
                                  fontFamily: 'GmarketSansBold',
                                }}>
                                식재료 등록 요청에 대한 결과가 없습니다.
                              </p>
                            </li>
                            <hr
                              style={{
                                flexShrink: '0',
                                borderWidth: '0px 0px thin',
                                borderStyle: 'solid',
                                borderColor: 'rgb(136, 141, 147)',
                                margin: '8px 0px',
                              }}
                            />
                            <li
                              style={{
                                display: 'flex',
                                textAlign: 'left',
                                flexDirection: 'column',
                                boxSizing: 'border-box',
                                width: '100%',
                                textDecoration: 'none',
                                position: 'relative',
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start',
                              }}>
                              <p
                                style={{
                                  margin: '0px 0px 0.35em',
                                  fontSize: '0.875rem',
                                  lineHeight: '1.5',
                                  letterSpacing: '0px',
                                  fontFamily: 'GmarketSansMedium',
                                  color: 'rgb(62, 80, 96)',
                                }}>
                                MY식재료에서 원하는 식재료를 등록해보세요.🥦
                              </p>
                            </li>
                          </ul>
                        </Box>
                      </Popper>
                    </>
                  ) : (
                    <>
                      <div onClick={handleClick} style={{ textAlign: 'center' }}>
                        <StyledBadge
                          badgeContent={pendingIngredients.length}
                          color="warning"
                          style={{ marginRight: '20px' }}
                          className="badge">
                          <div>
                            <img
                              src={alarmFull}
                              alt="알람"
                              style={{ width: '20px', height: '20px', cursor: 'pointer' }}></img>
                          </div>
                        </StyledBadge>
                      </div>

                      <Popper
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        style={{
                          zIndex: '999',
                        }}>
                        <Box
                          sx={{
                            m: 1,
                            p: 2,
                            bgcolor: 'background.paper',
                            borderRadius: '5px',
                          }}>
                          <ul className="scrollUl">
                            {pendingIngredients.map((pending) => (
                              <div key={pending.id}>
                                <li
                                  style={{
                                    display: 'flex',
                                    textAlign: 'left',
                                    flexDirection: 'column',
                                    boxSizing: 'border-box',
                                    width: '100%',
                                    textDecoration: 'none',
                                    position: 'relative',
                                    alignItems: 'flex-start',
                                    justifyContent: 'flex-start',
                                  }}>
                                  <p
                                    style={{
                                      margin: '0px 0px 0.35em',
                                      fontSize: '1rem',
                                      lineHeight: '1.5',
                                      letterSpacing: '0px',
                                      fontFamily: 'GmarketSansBold',
                                    }}>
                                    &apos;{pending.ingredient}&apos; 건에 대해 식재료 등록 요청이{' '}
                                    {pending.result}
                                    되었습니다.
                                  </p>
                                  <p
                                    style={{
                                      margin: '0px 0px 0.35em',
                                      marginRight: '3px',
                                      fontSize: '0.875rem',
                                      lineHeight: '1.5',
                                      letterSpacing: '0px',
                                      fontFamily: 'GmarketSansMedium',
                                      color: 'rgb(62, 80, 96)',
                                    }}>
                                    {pending.result} 이유 : {pending.reason}
                                  </p>
                                </li>
                                <p
                                  style={{
                                    margin: '0px 15px 0.35em',
                                    fontSize: '0.75rem',
                                    lineHeight: '1.5',
                                    letterSpacing: '0px',
                                    fontFamily: 'GmarketSansMedium',
                                    color: 'rgb(62, 80, 96)',
                                    textAlign: 'right',
                                    cursor: 'pointer',
                                  }}
                                  onClick={() => removePendingIngredient(pending.id)}>
                                  확인
                                </p>
                                <hr
                                  style={{
                                    flexShrink: '0',
                                    borderWidth: '0px 0px thin',
                                    borderStyle: 'solid',
                                    borderColor: 'rgb(136, 141, 147)',
                                    margin: '8px 0px',
                                  }}
                                />
                              </div>
                            ))}
                            <li
                              style={{
                                display: 'flex',
                                textAlign: 'left',
                                flexDirection: 'column',
                                boxSizing: 'border-box',
                                width: '100%',
                                textDecoration: 'none',
                                position: 'relative',
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start',
                              }}>
                              <p
                                style={{
                                  margin: '0px 0px 0.35em',
                                  fontSize: '0.875rem',
                                  lineHeight: '1.5',
                                  letterSpacing: '0px',
                                  fontFamily: 'GmarketSansMedium',
                                  color: 'rgb(62, 80, 96)',
                                }}>
                                MY식재료에서 식재료 등록 요청 결과를 확인할 수 있습니다.
                              </p>
                            </li>
                          </ul>
                        </Box>
                      </Popper>
                    </>
                  )}
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
