import { Link, useNavigate } from 'react-router-dom';
import marketImg from '../../assets/images/market.png';
import recipeImg from '../../assets/images/recipe.png';

export const Failure = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* <Link to="/martmap">
        <button className="failMoveToMart">주변 마트 보러 가기</button>
      </Link> */}
      {/* <button className="failMoveToRecipe" onClick={() => navigate(-1)}>
        레시피 페이지로 돌아가기
      </button> */}
      <Link to="/martmap">
        <img className="failMoveToMart" src={marketImg} />
      </Link>
      <img className="failMoveToRecipe" src={recipeImg} onClick={() => navigate(-1)} />
    </>
  );
};
