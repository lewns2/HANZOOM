import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { getYear, getMonth, getDate } from 'date-fns';

export const Calendar = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [myDate, setMyDate] = useState(null);
  // const my_date = new Date(props.originalDate);
  // const my_date = props.originalDate;
  // console.log('>>>>>>>>>>>>>>', my_date);

  useEffect(() => {
    var m = 0;
    if (getMonth(startDate) + 1 < 10) {
      m = '0' + (getMonth(startDate) + 1);
    } else {
      m = getMonth(startDate) + 1;
    }

    var d = 0;
    if (getDate(startDate) < 10) {
      d = '0' + getDate(startDate);
    } else {
      d = getDate(startDate);
    }

    let year = getYear(startDate);
    let month = m;
    let day = d;
    props.setSelectedDate({ year, month, day });
  }, [startDate]);

  useEffect(() => {
    const my_date = new Date(props.originalDate);
    console.log('👩‍🦰👩‍🦰👩‍🦰👩‍🦰👩‍🦰👩‍🦰👩‍🦰👩‍🦰', my_date);
    setMyDate(my_date);
  }, []);
  return (
    <>
      {myDate && (
        <DatePicker
          locale={ko}
          dateFormat="yyyy년 MM월 dd일" // 날짜 형식 설정
          selected={startDate}
          onChange={(date) => setStartDate(date)}>
          {console.log(myDate)}
        </DatePicker>
      )}
    </>
  );
};
