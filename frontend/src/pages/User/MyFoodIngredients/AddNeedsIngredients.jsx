import { useState } from 'react';

export const AddNeedsIngredients = () => {
  const [needsIngre, setApplyIngre] = useState({
    ingredient: null,
  });

  return (
    <div className="needsForm">
      <div>
        <div className="">식재료 명</div>
        <input
          className="form-control"
          type="text"
          placeholder="식재료 명"
          onChange={(event) => {
            setApplyIngre({
              ...state,
              ingredient: event.target.value,
            });
          }}
        />
      </div>
    </div>
  );
};
