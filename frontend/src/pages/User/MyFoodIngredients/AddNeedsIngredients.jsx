import { useEffect } from 'react';

export const AddNeedsIngredients = (props) => {
  useEffect(() => {
    props.setNeeds();
  }, []);
  return (
    <div className="needsForm">
      <div>
        <div className="">식재료 명</div>
        <input
          className="form-control"
          type="text"
          placeholder="식재료 명"
          onChange={(event) => {
            props.setNeeds({
              ingredient: event.target.value,
            });
          }}
        />
      </div>
    </div>
  );
};
