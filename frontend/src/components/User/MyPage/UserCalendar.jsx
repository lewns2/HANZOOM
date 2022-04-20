import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import './UserCalendar.scss';

export const UserCalendar = () => {
  const [value, onChange] = useState(new Date());

  return (
    <>
      <div>
        <Calendar onChange={onChange} value={value} />
      </div>
    </>
  );
};
