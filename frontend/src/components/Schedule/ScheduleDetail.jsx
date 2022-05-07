import React, { useEffect, useState } from 'react';
import { ScheduleDetailMap } from './ScheduleDetailMap';
import moment from 'moment';
import { Axios } from '../../core/axios';
import { axios_apis } from '../../core/axios';
import { useNavigate } from 'react-router';
import { changeShow } from '../../Reducer/chatSlice';
import { useDispatch, useSelector } from 'react-redux';
import { CalendarAndMap } from './CalendarAndMap';

export const ScheduleDetail = (props) => {
  const [scheduleInfo, setScheduleInfo] = useState([]);
  const [authority, setAuthority] = useState(false);
  const [myEmail, setMyEmail] = useState('');

  const [updateState, setUpdateState] = useState(false);
  const [updateSignal, setUpdateSignal] = useState(false);

  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getSchedule = () => {
    Axios.get(`${axios_apis.plans.find}/83`).then((res) => {
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

  // 게시글 작성자가 일정 수정 권한 갖기
  const checkAuthority = () => {
    if (myEmail === scheduleInfo.userEmail) {
      setAuthority(true);
    }
  };

  useEffect(() => {
    getSchedule();
    setMyEmail(user.userInfo.userEmail);
    console.log(props);
  }, []);

  useEffect(() => {
    checkAuthority();
  }, [myEmail, scheduleInfo]);

  return (
    <div className="scheduleWrap d-flex align-items-center">
      {console.log(scheduleInfo)}
      <div className="schedule">
        {!updateState ? (
          <h3 className="text-center">일정 상세정보</h3>
        ) : (
          <h3 className="text-center">일정 수정</h3>
        )}

        <button className="boardButton" onClick={moveToDetail}>
          게시글로 이동
        </button>
        <div
          className={
            !updateState
              ? 'scheduleItems scheduleDetails'
              : 'scheduleItems d-flex justify-content-center align-items-center'
          }>
          {!updateState ? (
            <>
              <div className="text-center mb-2">
                {moment(scheduleInfo.scheduleDatetime).format('YYYY년 MM월 DD일 LT')}
              </div>
              <div className="scheduleDetailMap d-flex justify-content-center">
                {scheduleInfo.lat && scheduleInfo.lng && (
                  <ScheduleDetailMap lat={scheduleInfo.lat} lng={scheduleInfo.lng} />
                )}
              </div>
            </>
          ) : (
            <>
              <CalendarAndMap
                lat={scheduleInfo.lat}
                lng={scheduleInfo.lng}
                dateTime={scheduleInfo.scheduleDatetime}
                update={updateSignal}
                updateSignal={setUpdateSignal}
                show={props.show}
              />
            </>
          )}
        </div>
        <div className="d-flex justify-content-center" style={{ marginTop: '8px' }}>
          {!updateState ? (
            <>
              <button className="cancelBtn" onClick={() => props.show(false)}>
                닫기
              </button>
              {authority && (
                <button className="updateBtn" onClick={() => setUpdateState(true)}>
                  일정 수정
                </button>
              )}
            </>
          ) : (
            <>
              <button className="cancelBtn" onClick={() => setUpdateState(false)}>
                취소
              </button>
              {authority && (
                <button className="updateBtn" onClick={() => setUpdateSignal(true)}>
                  수정 완료
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
