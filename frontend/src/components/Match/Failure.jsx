import { Link, useNavigate } from 'react-router-dom';

export const Failure = () => {
  const navigate = useNavigate();
  return (
    <>
      <Link to="/martmap">
        <button className="failMoveToMart">주변 마트 보러 가기</button>
      </Link>
      <button className="failMoveToRecipe" onClick={() => navigate(-1)}>
        레시피 페이지로 돌아가기
      </button>
    </>
  );
};
