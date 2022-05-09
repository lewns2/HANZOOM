import { useEffect, useState } from 'react';
import { AutoComplete } from './AutoComplete';

export const AddNeedsIngredients = (props) => {
  if (props.header === '필요목록 등록') {
    useEffect(() => {
      props.setNeeds();
    }, []);
    return (
      <div className="needsForm">
        <div>
          <div className="">식재료 명</div>
          {/* <input
            className="form-control"
            type="text"
            placeholder="식재료 명"
            onChange={(event) => {
              props.setNeeds({
                ingredient: event.target.value,
              });
            }}
          /> */}
          <AutoComplete setNeeds={props.setNeeds} />
        </div>
      </div>
    );
  } else {
    console.log(props);
    const [needsName, setNeedsName] = useState(props.ingre.ingredientName);
    useEffect(() => {
      props.setNeeds();
    }, []);
    return (
      <div className="needsForm">
        <div className="inputForm">
          <div>식재료 명</div>
          <input
            className="form-control"
            type="text"
            placeholder={props.ingre.ingredientName}
            value={needsName}
            onChange={(event) => {
              props.setNeeds({
                ingredient: event.target.value,
              });
              setNeedsName(event.target.value);
            }}
          />
        </div>
      </div>
    );
  }
};
