import sample from '../../assets/images/Initimage.PNG';

export const RecipeModal = (props) => {
  const { open, close } = props;
  return (
    <div className={open ? 'recipeDetailForm openModal' : 'recipeDetailForm'}>
      {open ? (
        <>
          <section className="recipeFormWrap">
            <div className="recipeModalTitle">
              <h2>김치찌개</h2>
              <button>자동매칭</button>
            </div>
            <hr></hr>
            <div className="recipeModalBody">
              <div className="recipeImg">
                <img src={sample}></img>
              </div>
              <button onClick={close}>취소</button>
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
};
