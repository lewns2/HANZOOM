import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import { useEffect, useState } from 'react';
import { Calendar } from '../../../components/Board/Calendar';

import { AutoComplete } from './AutoComplete';

export const AddMyFoodIngredients = (props) => {
  const [purchaseDate, setPurchaseDate] = useState({
    year: null,
    month: null,
    day: null,
  });
  const [expirationDate, setExpirationDate] = useState({
    year: null,
    month: null,
    day: null,
  });
  useEffect(() => {
    props.setFoods({
      ...props.foods,
      purchaseDate: purchaseDate,
      expirationDate: expirationDate,
    });
  }, [purchaseDate, expirationDate]);

  return (
    <div className="applyForm">
      <div className="inputForm">
        <div>식재료 명</div>
        <div>
          <AutoComplete foods={props.foods} setFoods={props.setFoods} header={props.header} />
        </div>
      </div>
      <div className="inputForm">
        <div>
          구매일자
          <CalendarMonthIcon />
          <Calendar setSelectedDate={setPurchaseDate} />
        </div>
      </div>
      <div className="inputForm">
        <div>
          유통기한
          <CalendarMonthIcon />
          <Calendar setSelectedDate={setExpirationDate} />
          <HelpOutlineRoundedIcon />
        </div>
      </div>
    </div>
  );
};
