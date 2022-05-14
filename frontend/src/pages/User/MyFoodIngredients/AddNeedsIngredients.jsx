import { useEffect, useState } from 'react';
import { AutoComplete } from './AutoComplete';

export const AddNeedsIngredients = (props) => {
  if (props.header === '필요목록 등록') {
    useEffect(() => {
      props.setNeeds();
    }, []);
    return (
      <div className="needsForm">
        <div>식재료 명</div>
        <AutoComplete setNeeds={props.setNeeds} header={props.header} />
      </div>
    );
  } else {
    const [needsName, setNeedsName] = useState(props.ingre.ingredientName);
    useEffect(() => {
      props.setNeeds();
    }, []);
    return (
      <div className="needsForm">
        <div className="inputForm">
          <div>식재료 명</div>
          <AutoComplete
            header={props.header}
            setNeeds={props.setNeeds}
            needsName={needsName}
            setNeedsName={setNeedsName}
          />
        </div>
      </div>
    );
  }
};
