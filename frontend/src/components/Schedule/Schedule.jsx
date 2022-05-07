import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { ScheduleMap } from './ScheduleMap';
import moment from 'moment';
import { Axios } from '../../core/axios';
import { axios_apis } from '../../core/axios';
import swal from 'sweetalert';

export const Schedule = (props) => {
  const [date, setDate] = useState(new Date());
  const [hour, setHour] = useState(null);
  const [minute, setMinute] = useState(null);

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

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
        boardNo: 83, // todo: 게시글 번호 받아오기
        lat: lat,
        lng: lng,
        opponent: 'ehdgus@naver.com', // todo: 상대방 이메일 받아오기
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="scheduleWrap d-flex align-items-center">
      <div className="schedule">
        <h3 className="text-center">일정 정하기</h3>
        <div className="scheduleItems d-flex justify-content-center align-items-center">
          <div className="row">
            <div className="scheduleDate col-lg-6 col-12  d-flex justify-content-center">
              <Calendar onChange={setDate} value={date} />
              <div className="schecduleTime d-flex">
                <div className="scheduleHour">
                  <input type="number" onChange={(e) => setHour(e.target.value)} />
                  <span>시</span>
                </div>
                <div className="scheduleHour">
                  <input type="number" onChange={(e) => setMinute(e.target.value)} />
                  <span>분</span>
                </div>
              </div>
            </div>
            <div className="scheduleMap col-lg-6 col-12 d-flex justify-content-center">
              <div className="mapExplain">약속 장소를 지도에 표시해주세요.</div>
              <ScheduleMap setLat={setLat} setLng={setLng} />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center" style={{ marginTop: '8px' }}>
          <button className="cancelBtn" onClick={() => props.show(false)}>
            취소
          </button>
          <button className="registBtn" onClick={scheduleRegist}>
            확정
          </button>
        </div>
      </div>
    </div>
  );
};
