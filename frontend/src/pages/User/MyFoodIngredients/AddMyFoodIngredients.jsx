import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import { useEffect, useState } from 'react';
import { Calendar } from '../../../components/Board/Calendar';
import { Axios } from '../../../core/axios.js';

export const AddMyFoodIngredients = (props) => {
  if (props.header == '식재료 등록') {
    console.log('👴👴👴👴👴👴👴👴👴', props.header);
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
  } else if (props.header === '식재료 수정') {
    const [ingreName, setIngreName] = useState();
    const [modiPurchaseDate, setModiPurchaseDate] = useState('');
    const [modiExpirationDate, setModiExpirationDate] = useState('');

    const getIngreInfo = async () => {
      await Axios.get(`userIngredient/find/${props.ingre.userIngredientNo}`)
        .then((res) => {
          console.log('👩👩👩👩👩👩👩👩👩👩', res);
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
      console.log(props);
    }, [modiPurchaseDate, modiExpirationDate]);
    return (
      <div className="applyForm">
        <div className="inputForm">
          <div>식재료 명</div>
          <div>
            <input
              className="form-control"
              type="text"
              placeholder={ingreName}
              value={ingreName}
              onChange={(event) => {
                props.setFoods({
                  ...props.foods,
                  ingredient: event.target.value,
                });
                setIngreName(event.target.value);
              }}
            />
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
  }
};
