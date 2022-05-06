import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeShow } from '../../Reducer/chatSlice';
import { Schedule } from '../Schedule/Schedule';
// import { ScheduleDetail } from '../Schedule/ScheduleDetail';

import CloseIcon from '@mui/icons-material/Close';

export const MyChatDisplay = () => {
  const [showSchedule, setShowSchedule] = useState(false);

  const msgContent = useRef();
  const dispatch = useDispatch();

  // 스크롤을 제일 아래도 내리는 함수
  const scrollToBottom = () => {
    msgContent.current.scrollTop = msgContent.current.scrollHeight;
  };

  const hideMyChat = () => {
    dispatch(changeShow(false));
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <>
      <div className="showChatDisplayWrap">
        {showSchedule && <Schedule show={setShowSchedule} />}
        {/* <ScheduleDetail show={setShowSchedule} /> */}
        <section className="chatDisplayWrap">
          <div className="chatHeader">
            <button className="headerBtn" onClick={() => setShowSchedule(true)}>
              일정
            </button>
            {/* <button className="headerBtn" onClick={() => setShowSchedule(true)}>
              일정 확인
            </button> */}
            <CloseIcon className="closeIcon" style={{ fontSize: '34px' }} onClick={hideMyChat} />
          </div>
          <div className="chatContent" ref={msgContent}>
            <div className="userMsg myMsg d-flex justify-content-end">
              <div className="msgContent">
                테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테
              </div>
              <div className="profileImg">
                <img src="/img/basicProfile.png" alt="" />
              </div>
            </div>
            <div className="userMsg otherMsg d-flex">
              <div className="profileImg">
                <img src="/img/basicProfile.png" alt="" />
              </div>
              <div className="msgContent">테스트</div>
            </div>
          </div>
          <div className="chatFooter">
            <input className="msgInput" type="text" />
            <button className="sendBtn">전송</button>
          </div>
        </section>
      </div>
    </>
  );
};
