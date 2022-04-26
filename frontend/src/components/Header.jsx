import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

import { clearUser } from '../Reducer/userSlice';
import './Header.scss';

export const Header = () => {
  const user = useSelector((state) => state.user);
  console.log(user.userInfo);
  const dispatch = useDispatch();

  const logout = () => {
    alert('로그아웃 되었습니다.');
    dispatch(clearUser());
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg">
        <Container>
          <Navbar.Brand href="/">한줌</Navbar.Brand>
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
                  <Link to="/my-food-ingredients">MY식재료</Link>
                  <Link to="/my-page">MY페이지</Link>
                  <Link to="/login" onClick={logout}>
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
    </>
  );
};
