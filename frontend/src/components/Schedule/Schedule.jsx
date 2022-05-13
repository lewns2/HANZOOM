import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { ScheduleMap } from './ScheduleMap';
import moment from 'moment';
import { Axios } from '../../core/axios';
import { axios_apis } from '../../core/axios';
import swal from 'sweetalert';
import { useSelector } from 'react-redux';

import 'react-calendar/dist/Calendar.css'; // css import
import './ReactCalendar.scss';

export const Schedule = (props) => {
  const { otherEmail, boardNo } = props;

  const [date, setDate] = useState(new Date());
  const [hour, setHour] = useState(null);
  const [minute, setMinute] = useState(null);

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  const [authority, setAuthority] = useState(false);

  const user = useSelector((state) => state.user);

  const scheduleRegist = () => {
    date.setHours(hour, minute);
    const time = moment(date).format('YYYY-MM-DD HH:mm:ss');
    console.log(time);
    const token = sessionStorage.getItem('jwt-token');

    if (!hour || !minute) {
      alert('시간을 설정해주세요.');
      return;
    }
    if (!lat || !lng) {
      alert('위치를 설정해주세요.');
      return;
    }

    Axios.post(
      `${axios_apis.plans.register}`,
      {
        boardNo: boardNo, // todo: 게시글 번호 받아오기
        lat: lat,
        lng: lng,
        opponent: otherEmail, // todo: 상대방 이메일 받아오기
        scheduleDatetime: time,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then(() => {
        swal('일정 확정 완료', '  ', 'success', {
          buttons: false,
          timer: 1000,
        });
        props.show(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 게시글 작성자가 일정 수정 권한 갖기
  const checkAuthority = () => {
    const token = sessionStorage.getItem('jwt-token');
    Axios.get(`board/find/${boardNo}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((data) => {
        console.log(data);
        let writer = data.data.userEmail;
        if (user.userInfo.userEmail === writer) {
          setAuthority(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setScheduleHour = (inputHour) => {
    // const hour = e.target.value;
    if ((inputHour.length > 0 && inputHour < 1) || inputHour > 24) {
      console.log(inputHour);
      alert('시간은 1시~24시로 설정해주세요.');
      if (inputHour < 1) setHour(1);
      else setHour(hour);
      return;
    }
    setHour(inputHour);
  };

  const setScheduleMinute = (inputMinute) => {
    if ((inputMinute.length > 0 && inputMinute < 1) || inputMinute > 59) {
      console.log(inputMinute);
      alert('분은 1분~59분으로 설정해주세요.');
      if (inputMinute < 1) setMinute(1);
      else setMinute(inputMinute);
      return;
    }
    setMinute(inputMinute);
  };

  useEffect(() => {
    checkAuthority();
  }, []);

  return (
    <div className="scheduleWrap d-flex align-items-center">
      <div className="schedule">
        <h3 className="text-center">일정 정하기</h3>
        <div className="scheduleItems d-flex justify-content-center align-items-center">
          <div className="row">
            <div className="scheduleDate col-lg-5 d-flex justify-content-center">
              <Calendar
                onChange={setDate}
                value={date}
                formatDay={(locale, date) => moment(date).format('DD')}
              />
              {authority && (
                <div className="schecduleTime d-flex">
                  <div className="scheduleHour">
                    <input
                      type="number"
                      onChange={(e) => setScheduleHour(e.target.value)}
                      value={hour}
                    />
                    <span>시</span>
                  </div>
                  <div className="scheduleHour">
                    <input
                      type="number"
                      onChange={(e) => setScheduleMinute(e.target.value)}
                      value={minute}
                    />
                    <span>분</span>
                  </div>
                </div>
              )}
            </div>
            <div className="scheduleMap col-lg-7 d-flex justify-content-center">
              <div className="mapExplain">약속 장소를 지도에 표시해주세요.</div>
              <ScheduleMap setLat={setLat} setLng={setLng} otherEmail={otherEmail} />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center" style={{ marginTop: '8px' }}>
          <button className="btn cancelBtn" onClick={() => props.show(false)}>
            취소
          </button>
          {authority && (
            <button className="btn registBtn" onClick={scheduleRegist}>
              확정
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
