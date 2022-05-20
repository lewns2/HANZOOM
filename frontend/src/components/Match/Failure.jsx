import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import marketImg from '../../assets/images/market.png';
import marketYellowImg from '../../assets/images/market_yellow.png';
import recipeImg from '../../assets/images/recipe.png';
import recipeYellowImg from '../../assets/images/recipe_yellow.png';
import myIngreImg from '../../assets/images/myingredient.png';
import myIngreYellowImg from '../../assets/images/myingredient_yellow.png';

export const Failure = (props) => {
  const { matchType } = props;

  const navigate = useNavigate();
  const [marketImage, setMarketImage] = useState(marketImg);
  const [recipeImage, setRecipeImage] = useState(recipeImg);
  const [myIngreImage, setMyIngreImage] = useState(myIngreImg);

  return (
    <div className="failureWrapper">
      <Link to="/martmap">
        <img
          className="failMoveToMart"
          src={marketImage}
          onMouseEnter={() => setMarketImage(marketYellowImg)}
          onMouseLeave={() => setMarketImage(marketImg)}
        />
      </Link>
      {matchType.type === '자동' ? (
        <img
          className="failMoveToRecipe"
          src={recipeImage}
          onMouseEnter={() => setRecipeImage(recipeYellowImg)}
          onMouseLeave={() => setRecipeImage(recipeImg)}
          onClick={() => navigate(-1)}
        />
      ) : (
        <img
          className="failMoveToMyIngre"
          src={myIngreImage}
          onMouseEnter={() => setMyIngreImage(myIngreYellowImg)}
          onMouseLeave={() => setMyIngreImage(myIngreImg)}
          onClick={() => navigate(-1)}
        />
      )}
    </div>
  );
};
