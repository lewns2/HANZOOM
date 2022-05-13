import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { ScheduleMap } from './ScheduleMap';
import moment from 'moment';
import swal from 'sweetalert';

import 'react-calendar/dist/Calendar.css'; // css import
import './ReactCalendar.scss';

import { Axios } from '../../core/axios';
import { axios_apis } from '../../core/axios';

export const CalendarAndMap = (props) => {
  const { boardNo } = props;
  const [date, setDate] = useState(new Date());
  const [hour, setHour] = useState(null);
  const [minute, setMinute] = useState(null);

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  const scheduleUpdate = () => {
    console.log('😀😀');
    date.setHours(hour, minute);
    const time = moment(date).format('YYYY-MM-DD HH:mm:ss');
    const token = sessionStorage.getItem('jwt-token');
    Axios.put(
      `${axios_apis.plans.update}`,
      {
        boardNo: boardNo,
        lat: lat,
        lng: lng,
        scheduleDatetime: time,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then(() => {
        swal('일정 수정 완료', '  ', 'success', {
          buttons: false,
          timer: 1000,
        });
        props.updateSignal(false);
        props.show(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const date = new Date(props.dateTime);
    const hour = moment(date).format('H');
    const minute = moment(date).format('m');
    setDate(date);
    setHour(hour);
    setMinute(minute);
    setLat(props.lat);
    setLng(props.lng);
    console.log(props);
  }, []);

  useEffect(() => {
    if (props.update) {
      scheduleUpdate();
    }
  }, [props.update]);

  return (
    <div className="row">
      <div className="scheduleDate col-lg-6 col-12 d-flex justify-content-center">
        <Calendar
          onChange={setDate}
          value={date}
          formatDay={(locale, date) => moment(date).format('DD')}
        />
        <div className="schecduleTime d-flex">
          <div className="scheduleHour">
            {hour && <input type="number" onChange={(e) => setHour(e.target.value)} value={hour} />}
            <span>시</span>
          </div>
          <div className="scheduleHour">
            {minute && (
              <input type="number" onChange={(e) => setMinute(e.target.value)} value={minute} />
            )}
            <span>분</span>
          </div>
        </div>
      </div>
      <div className="scheduleMap col-lg-6 col-12 d-flex justify-content-center">
        <div className="mapExplain">약속 장소를 지도에 표시해주세요.</div>
        <ScheduleMap
          setLat={setLat}
          setLng={setLng}
          lat={lat}
          lng={lng}
          // otherEmail={props.otherEmail}
        />
      </div>
    </div>
  );
};
