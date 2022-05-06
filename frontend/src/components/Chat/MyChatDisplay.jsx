import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeShow } from '../../Reducer/chatSlice';
import { Schedule } from '../Schedule/Schedule';
import { ScheduleDetail } from '../Schedule/ScheduleDetail';
import { BASE_IMG_URL } from '../../core/s3';
import { Axios } from '../../core/axios';
import StompJS from 'stompjs';
import SockJS from 'sockjs-client';

import CloseIcon from '@mui/icons-material/Close';

export const MyChatDisplay = (props) => {
  const [showSchedule, setShowSchedule] = useState(false);
  const [showScheduleDetail, setShowScheduleDetail] = useState(false);

  console.log(props);

  const { setShow } = props;

  const msgContent = useRef();
  const dispatch = useDispatch();

  const [ msg, setMsg ] = useState('');
  const [ newMessages, setNewMessages ] = useState([]);
  const [ chatMessageInfo, setChatMessageInfo ] = useState([]);
  const { chatShow, chatRoomId } = useSelector((state) => state.chat);
  const user = useSelector((state) => state.user);
  var reconnect = 0;

  // socket connect
  var sock = new SockJS('https://k6e103.p.ssafy.io:8443/ws/chat');
  var ws = StompJS.over(sock);

  // Socket connection
  const connect = () => {
    ws.connect({}, () => {
      ws.subscribe('/sub/chat/room/' + chatRoomId, function(message) {
        var recv = JSON.parse(message.body);
        recvMessage(recv);
      });
      ws.send('/pub/chat/message', {}, JSON.stringify({ 
        type: 'ENTER', 
        roomId: chatRoomId, 
        sender: user.userInfo.userNickname,
      }));
    }, (error) => {
      if(reconnect++ <= 5) {
        setTimeout(() => {
          sock = new SockJS('/ws/chat');
          ws = StompJS.over(sock);
          connect();
        }, 10*1000);
      };
      console.log(error);
    });
  };

  // send message
  const sendMessage = () => {
    ws.send('/pub/chat/message', {}, JSON.stringify({
      type: 'TALK', 
      roomId: chatRoomId,
      message: msg,
      sender: user.userInfo.userNickname,
    }));
    setMsg('');
  };

  // message setting
  const recvMessage = (recv) => {
    // console.log('>>>>>>>>>>> 받은 메시지 축척', recv);
    setNewMessages(oldArray => [...oldArray, {'id': recv.id, 'type':recv.type, 'sender':recv.senderNickname, 'message':recv.type=='ENTER'? '[알림]'+recv.senderNickname : recv.message, 'senderImage': recv.senderImage}]);
    // setNewMessages.push({'type':recv.type,'sender':recv.type=='ENTER'?'[알림]':recv.sender,'message':recv.message});
  };

  // 스크롤을 제일 아래도 내리는 함수
  const scrollToBottom = () => {
    msgContent.current.scrollTop = msgContent.current.scrollHeight;
  };

  const hideMyChat = () => {
    dispatch(changeShow(false));
  };

  // 메시지 정보 요청 axios
  const getMessage = async () => {
    await Axios
    .get(`/chat/find/${chatRoomId}`)
    .then(async (response) => {
      console.log(response.data);
      await setChatMessageInfo(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    getMessage() ;
    connect();  // web socket connect
  }, []);
  
  useEffect(() => {
    scrollToBottom();
  });

  return (
    <>
      <div className="showChatDisplayWrap">
        {showSchedule && <Schedule show={setShowSchedule} />}
        {showScheduleDetail && <ScheduleDetail show={setShowScheduleDetail} setShow={setShow} />}
        <section className="chatDisplayWrap">
          <div className="chatHeader">
            <button className="headerBtn" onClick={() => setShowSchedule(true)}>
              일정
            </button>
            <button className="headerBtn" onClick={() => setShowScheduleDetail(true)}>
              일정 확인
            </button>
            <CloseIcon className="closeIcon" style={{ fontSize: '34px' }} onClick={hideMyChat} />
          </div>
          <div className="chatContent" ref={msgContent}>
            {/* 기존의 채팅 목록 불러오기 */}
            {
              chatMessageInfo.length === 0 ? 
                <></>
              :
                <>
                  { chatMessageInfo.chatMessages.map((message) => (
                  <div key={message.id}>
                    { message.senderNickname === user.userInfo.userNickname ? 
                      <div className='userMsg myMsg d-flex justify-content-end'>
                        <div className='msgContent'>
                          { message.message }
                        </div>
                        <div className='profileImg'>
                          <img src={
                            message.senderImage !== null
                              ? `${BASE_IMG_URL}${message.senderImage}`
                              : '/img/basicProfile.png'
                          } alt='' />
                        </div>
                      </div>
                    :
                    <div className='userMsg otherMsg d-flex'>
                      <div className='profileImg'>
                        <img src={
                          message.senderImage !== null
                            ? `${BASE_IMG_URL}${message.senderImage}`
                            : '/img/basicProfile.png'
                        } alt='' />
                      </div>
                      <div className='msgContent'>
                        { message.message }
                      </div>
                    </div>
                    }
                  </div> 
                ))}
                </>
            }
            

            {/* 새로 추가된 메시지 */}
            { newMessages.map((m) => (
              <div key={ m.id }>
              { m.type === 'TALK' ?
                <>
                  { m.sender === user.userInfo.userNickname ? 
                    <div className='userMsg myMsg d-flex justify-content-end'>
                      <div className='msgContent'>
                        { m.message }
                      </div>
                      <div className='profileImg'>
                        <img src={
                          m.senderImage !== null
                            ? `${BASE_IMG_URL}${m.senderImage}`
                            : '/img/basicProfile.png'
                        } alt='' />
                      </div>
                    </div>
                  :
                    <div className='userMsg otherMsg d-flex'>
                      <div className='profileImg'>
                        <img src={
                          m.senderImage !== null
                            ? `${BASE_IMG_URL}${m.senderImage}`
                            : '/img/basicProfile.png'
                        } alt='' />
                      </div>
                      <div className='msgContent'>
                        { m.message }
                      </div>
                    </div>
                    }
                  </>
                :
                  <>
                    { m.sender }
                  </>
                }  
              </div>
            ))}
            {/* <div className="userMsg myMsg d-flex justify-content-end">
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
            </div> */}
          </div>
          <div className='chatFooter'>
            <input className='msgInput' type='text' value={msg} onChange={ (e) => setMsg(e.target.value) } />
            {/* <input className='msgInput' type='text' /> */}
            <button className='sendBtn' onClick={ sendMessage }>전송</button>
          </div>
        </section>
      </div>
    </>
  );
};
