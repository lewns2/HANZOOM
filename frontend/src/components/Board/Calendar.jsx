import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import { getYear, getMonth, getDate, getDay } from 'date-fns';

export const Calendar = (props) => {
    
    const [ startDate, setStartDate ] = useState(new Date());

    useEffect(() => {
      let year = getYear(startDate);
      let month = getMonth(startDate) + 1;
      let date = getDate(startDate);
      props.setSelectedDate({year, month, date});
    }, [startDate]);

    
    return (
        <DatePicker
          locale={ko}
          dateFormat="yyyy년 MM월 dd일"    // 날짜 형식 설정
          selected={startDate} 
          onChange={
              (date) => setStartDate(date)}
        >
        </DatePicker>
      );
};