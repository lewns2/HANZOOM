import { Link } from 'react-router-dom';

export const Navbar = () => {
    return (
        <div className="navbar">
            <li><Link to= "/main">로고</Link></li>
            <li><Link to= "/board">게시판</Link></li>
            <li><Link to= "/my-food-ingredients">MY페이지</Link></li>
            <li><Link to= "/my-page">MY식재료</Link></li>
            <li><Link to= "/main">로그인</Link></li>
        </div>
    );
};