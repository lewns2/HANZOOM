import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeShow } from '../../Reducer/chatSlice';

import CloseIcon from '@mui/icons-material/Close';

export const MyChatDisplay = (props) => {
  const { setShow } = props;

  const { chatShow } = useSelector((state) => state.chat);
  //   const [show, setShow] = useState(false);
  const msgContent = useRef();
  const dispatch = useDispatch();

  const [showChat, setShowChat] = useState(false);

  // 스크롤을 제일 아래도 내리는 함수
  const scrollToBottom = () => {
    msgContent.current.scrollTop = msgContent.current.scrollHeight;
  };

  const hideMyChat = () => {
    dispatch(changeShow(false));
  };

  useEffect(() => {
    scrollToBottom();
    setShowChat(chatShow);
  }, []);
  useEffect(() => {
    setShowChat(chatShow);
  }, [chatShow]);

  return (
    <div className={showChat ? 'showChatDisplayWrap' : 'hideChatDisplayWrap'}>
      <section className="chatDisplayWrap">
        <div className="chatHeader">
          <button className="headerBtn">일정</button>
          {/* <button className="headerBtn">채팅 리스트</button> */}
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
  );
};
