import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import { useEffect, useState } from 'react';
import { Calendar } from '../../../components/Board/Calendar';

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
          <input
            className="form-control"
            type="text"
            placeholder="식재료 명"
            onChange={(event) => {
              props.setFoods({
                ...props.foods,
                ingredient: event.target.value,
              });
            }}
          />
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
