import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { getYear, getMonth, getDate } from 'date-fns';

export const Calendar = (props) => {
  const [startDate, setStartDate] = useState();

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

  return (
    <DatePicker
      locale={ko}
      dateFormat="yyyy년 MM월 dd일" // 날짜 형식 설정
      selected={startDate}
      onChange={(date) => setStartDate(date)}></DatePicker>
  );
};
