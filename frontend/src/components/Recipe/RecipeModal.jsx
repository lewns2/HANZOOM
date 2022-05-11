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
              <h2>{info.recipeName}</h2>
              <div>
                <Link to="/match" state={{ recipeNo: info.recipeNo, recipeName: info.recipeName }}>
                  <button className="matchingBtn">자동매칭</button>
                </Link>
              </div>
            </div>
            <hr></hr>
            <div className="recipeModalBody">
              <h3>재료</h3>
              <div className="recipeIngredients">
                {info.ingredients.map((ingredient, key) => (
                  <div key={key}>
                    &nbsp;
                    {ingredient.name} {ingredient.weight}&nbsp; /
                  </div>
                ))}
              </div>
              <div className="recipeImgWrap">
                <h3>레시피</h3>
                {info.recipe.map((content, key) => (
                  <>
                    <div key={key} className="recipeOrder row">
                      <p className="recipeIndex col-1">{key + 1}</p>
                      <p className="recipeDescription col-5">{content.description}</p>
                      <img className="recipeImg col-6" src={content.imagePath}></img>
                    </div>
                  </>
                ))}
              </div>
              <button className="recipeCancleBtn" onClick={close}>
                취소
              </button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};
