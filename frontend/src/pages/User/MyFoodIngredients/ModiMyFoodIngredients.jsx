import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import { useEffect, useState } from 'react';
import { Calendar } from '../../../components/Board/Calendar';
import { Axios } from '../../../core/axios.js';
import { AutoComplete } from './AutoComplete';

export const ModiMyFoodIngredients = (props) => {
  const [ingreName, setIngreName] = useState();
  const [modiPurchaseDate, setModiPurchaseDate] = useState('');
  const [modiExpirationDate, setModiExpirationDate] = useState('');

  const getIngreInfo = async () => {
    await Axios.get(`userIngredient/find/${props.ingre.userIngredientNo}`)
      .then((res) => {
        setIngreName(res.data.ingredientName);
        setModiPurchaseDate(res.data.purchaseDate);
        setModiExpirationDate(res.data.expirationDate);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getIngreInfo();
  }, []);

  useEffect(() => {
    props.setFoods({
      ...props.foods,
      purchaseDate: modiPurchaseDate,
      expirationDate: modiExpirationDate,
    });
  }, [modiPurchaseDate, modiExpirationDate]);
  return (
    <div className="applyForm">
      <div className="inputForm">
        <div>식재료 명</div>
        <div>
          {ingreName && (
            <AutoComplete
              foods={props.foods}
              setFoods={props.setFoods}
              ingreName={ingreName}
              setIngreName={setIngreName}
              header={props.header}
            />
          )}
        </div>
      </div>
      <div className="inputForm">
        <div>
          구매일자
          <CalendarMonthIcon />
          {modiPurchaseDate && (
            <Calendar setSelectedDate={setModiPurchaseDate} originalDate={modiPurchaseDate} />
          )}
        </div>
      </div>
      <div className="inputForm">
        <div>
          유통기한
          <CalendarMonthIcon />
          {modiExpirationDate && (
            <Calendar setSelectedDate={setModiExpirationDate} originalDate={modiExpirationDate} />
          )}
          <HelpOutlineRoundedIcon />
        </div>
      </div>
    </div>
  );
};
