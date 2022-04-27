import { useState } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import { Calendar } from '../../../components/Board/Calendar';

export const AddMyFoodIngredients = () => {
  const [applyIngre, setApplyIngre] = useState({
    ingredient: null,
    sellByDate: { year: null, month: null, day: null },
    expirationDate: { year: null, month: null, day: null },
  });

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
              setApplyIngre({
                ...state,
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
        </div>

        <input
          className="form-control"
          type="text"
          placeholder="구매일자"
          onChange={(event) => {
            setApplyIngre({
              ...state,
              sellByDate: event.target.value,
            });
          }}
        />
      </div>
      <div className="inputForm">
        <div>
          유통기한
          <CalendarMonthIcon />
          <HelpOutlineRoundedIcon />
        </div>
        <input
          className="form-control"
          type="text"
          placeholder="유통기한"
          onChange={(event) => {
            setApplyIngre({
              ...state,
              expirationDate: event.target.value,
            });
          }}
        />
      </div>
    </div>
  );
};
