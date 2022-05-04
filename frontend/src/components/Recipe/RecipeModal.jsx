import { useEffect } from 'react';
import sample from '../../assets/images/Initimage.PNG';

export const RecipeModal = (props) => {
  const { open, close, info } = props;

  useEffect(() => {
    console.log(info);
  });
  return (
    <div className={open ? 'recipeDetailForm openModal' : 'recipeDetailForm'}>
      {open ? (
        <>
          <div className="recipeFormWrap">
            <div className="recipeModalTitle">
              <h2>{info.recipeName}</h2>
              <button>자동매칭</button>
            </div>
            <hr></hr>
            <div className="recipeModalBody">
              <h3>재료</h3>
              <div className="recipeIngredients">
                {info.ingredients.map((ingredient, key) => (
                  <div key={key}>
                    {ingredient.name} {ingredient.weight}&nbsp;
                  </div>
                ))}
              </div>
              <div className="recipeImgWrap">
                <h3>레시피</h3>
                {info.recipe.map((content, key) => (
                  <>
                    <img className="recipeImg" key={key} src={content.imagePath}></img>
                    <p>{content.description}</p>
                  </>
                ))}
              </div>
              <button onClick={close}>취소</button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};
