import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import marketImg from '../../assets/images/market.png';
import marketYellowImg from '../../assets/images/market_yellow.png';
import recipeImg from '../../assets/images/recipe.png';
import recipeYellowImg from '../../assets/images/recipe_yellow.png';

export const Failure = () => {
  const navigate = useNavigate();
  const [marketImage, setMarketImage] = useState(marketImg);
  const [recipeImage, setRecipeImage] = useState(recipeImg);

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
      <img
        className="failMoveToRecipe"
        src={recipeImage}
        onMouseEnter={() => setRecipeImage(recipeYellowImg)}
        onMouseLeave={() => setRecipeImage(recipeImg)}
        onClick={() => navigate(-1)}
      />
    </div>
  );
};
