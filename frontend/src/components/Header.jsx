import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

import { clearUser } from '../Reducer/userSlice';
import './Header.scss';

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    alert('로그아웃 되었습니다.');
    dispatch(clearUser());
    navigate('/login');
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg">
        <Container>
          <Navbar.Brand href="/">한줌</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="nav-menu ms-auto">
              <Nav.Link href="/board">게시판</Nav.Link>
              <Nav.Link href="/my-food-ingredients">MY식재료</Nav.Link>
              <Nav.Link href="/my-page">MY페이지</Nav.Link>
              <Nav.Link href="/login">로그인</Nav.Link>
              <Nav.Link href="/signup" className="hi">
                회원가입
              </Nav.Link>

              {/* <div>
            <div onClick={logout}>로그아웃</div>
          </div> */}
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
