import { useEffect } from 'react';
import sample from '../../assets/images/Initimage.PNG';
import { Link } from 'react-router-dom';

export const RecipeModal = (props) => {
  const { open, close, info } = props;

  return (
    <div className={open ? 'recipeDetailForm openModal' : 'recipeDetailForm'}>
      {open ? (
        <>
          <div className="recipeFormWrap">
            <div className="recipeCancleBtn1">
              <button className="btn-close" aria-label="Close" onClick={close}></button>
            </div>
            <div className="recipeModalTitle">
              <h2 className="recipeName">📙 {info.recipeName}</h2>
              <div>
                <Link
                  to="/match"
                  state={{ type: '자동', recipeNo: info.recipeNo, recipeName: info.recipeName }}>
                  <button className="matchingBtn">자동매칭</button>
                </Link>
              </div>
            </div>
            <hr></hr>
            <div className="recipeModalBody">
              <h3 className="recipeIngreTitle">재료</h3>
              <div className="recipeIngredients">
                {info.ingredients.map((ingredient, key) => (
                  <p className="recipeIngredient" key={key}>
                    &nbsp;
                    {ingredient.name} {ingredient.weight}&nbsp;
                  </p>
                ))}
              </div>
              <div className="recipeImgWrap">
                <h3>레시피</h3>
                {info.recipe.map((content, key) => (
                  <>
                    <div key={key} className="recipeOrder row">
                      <div className="recipeText col-lg-6">
                        <p className="recipeIndex col-lg-2">{key + 1}</p>
                        <p className="recipeDescription col-lg-10">{content.description}</p>
                      </div>
                      <img className="recipeImg col-lg-6" src={content.imagePath}></img>
                    </div>
                  </>
                ))}
              </div>
              <div className="ButtonWrapper">
                <button className="recipeCancleBtn" onClick={close}>
                  돌아가기
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};
