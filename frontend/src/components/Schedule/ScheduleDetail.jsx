import React, { useEffect, useState } from 'react';
import { ScheduleDetailMap } from './ScheduleDetailMap';
import moment from 'moment';
import { Axios } from '../../core/axios';
import { axios_apis } from '../../core/axios';
import { useNavigate } from 'react-router';
import { changeShow } from '../../Reducer/chatSlice';
import { useDispatch } from 'react-redux';

export const ScheduleDetail = (props) => {
  const [scheduleInfo, setScheduleInfo] = useState([]);
  console.log(props);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getSchedule = () => {
    Axios.get(`${axios_apis.plans.find}/29`).then((res) => {
      console.log(res);
      setScheduleInfo(res.data);
    });
  };

  const moveToDetail = () => {
    navigate(`/board/${scheduleInfo.boardNo}`);
    props.show(false); // 일정 상세 조회 모달 숨기기
    dispatch(changeShow(false)); // 채팅창 모달 숨기기
    props.setShow(false); // 채팅 리스트 모달 숨기기
  };

  useEffect(() => {
    getSchedule();
  }, []);

  return (
    <div className="scheduleWrap d-flex align-items-center">
      <div className="schedule">
        <h3 className="text-center">일정 상세정보</h3>
        <button className="boardButton" onClick={moveToDetail}>
          게시글로 이동
        </button>
        <div className="scheduleItems scheduleDetails">
          <div className="text-center mb-2">
            {moment(scheduleInfo.scheduleDatetime).format('YYYY년 MM월 DD일 LT')}
          </div>
          <div className="scheduleDetailMap col-lg-6 col-12 d-flex justify-content-center">
            {scheduleInfo.lat && scheduleInfo.lng && (
              <ScheduleDetailMap lat={scheduleInfo.lat} lng={scheduleInfo.lng} />
            )}
          </div>
        </div>
        <div className="d-flex justify-content-center" style={{ marginTop: '10px' }}>
          <button className="cancelBtn" onClick={() => props.show(false)}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
