import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearUser } from '../Reducer/userSlice';

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    alert('로그아웃 되었습니다.');
    localStorage.removeItem('jwt-token');
    dispatch(clearUser());
    navigate('/login');
  };

  return (
    <div className="navbar">
      <li>
        <Link to="/main">로고</Link>
      </li>
      <li>
        <Link to="/board">게시판</Link>
      </li>
      <li>
        <Link to="/my-food-ingredients">MY페이지</Link>
      </li>
      <li>
        <Link to="/my-page">MY식재료</Link>
      </li>
      <li>
        <Link to="/login">로그인</Link>
      </li>
      <li>
        <Link to="/signup">회원가입</Link>
      </li>
      <li>
        <div onClick={logout}>로그아웃</div>
      </li>
    </div>
  );
};
