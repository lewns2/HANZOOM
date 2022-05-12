import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeShow } from '../../Reducer/chatSlice';
import { Schedule } from '../Schedule/Schedule';
import { ScheduleDetail } from '../Schedule/ScheduleDetail';
import { BASE_IMG_URL } from '../../core/s3';
import { Axios, axios_apis } from '../../core/axios';
import StompJS from 'stompjs';
import SockJS from 'sockjs-client';
import messageImg from '../../assets/images/message.gif';
import { getChatInfo } from '../../Reducer/chatSlice';
import dayjs from 'dayjs';

import CloseIcon from '@mui/icons-material/Close';

export const MyChatDisplay = (props) => {
  const [showSchedule, setShowSchedule] = useState(false);
  const [showScheduleDetail, setShowScheduleDetail] = useState(false);
  const [planState, setPlanState] = useState(false);
  const token = sessionStorage.getItem('jwt-token');

  // console.log(props);

  const { setShow } = props;

  const msgContent = useRef();
  const dispatch = useDispatch();

  const [msg, setMsg] = useState('');
  const [newMessages, setNewMessages] = useState([]);
  const [chatMessageInfo, setChatMessageInfo] = useState([]);
  const [otherEmail, setOtherEmail] = useState('');
  const { chatShow, chatRoomId } = useSelector((state) => state.chat);
  const user = useSelector((state) => state.user);
  var reconnect = 0;

  // socket connect
  var sock = new SockJS('https://k6e103.p.ssafy.io:8443/ws/chat');
  var ws = StompJS.over(sock);

  // Socket connection
  const connect = () => {
    ws.connect(
      {
        token: token,
      },
      () => {
        ws.subscribe(
          '/sub/chat/room/' + chatRoomId,
          function (message) {
            var recv = JSON.parse(message.body);
            recvMessage(recv);
          },
          { token: token },
        );
        // ws.send(
        //   '/pub/chat/message',
        //   {},
        //   JSON.stringify({
        //     type: 'ENTER',
        //     roomId: chatRoomId,
        //     sender: user.userInfo.userNickname,
        //   }),
        // );
      },
      (error) => {
        if (reconnect++ <= 5) {
          setTimeout(() => {
            sock = new SockJS('/ws/chat');
            ws = StompJS.over(sock);
            connect();
          }, 10 * 1000);
        }
        console.log(error);
      },
    );
  };

  // Socket Disconnection
  const disconnect = () => {
    ws.disconnect(
      () => {
        ws.unsubscribe('/sub/chat/room/' + chatRoomId);
      },
      {
        token: token,
      },
    );
  };

  // send message
  const sendMessage = () => {
    ws.send(
      '/pub/chat/message',
      {},
      JSON.stringify({
        type: 'TALK',
        roomId: chatRoomId,
        message: msg,
        sender: user.userInfo.userNickname,
        createdAt: new Date(),
      }),
    );
    setMsg('');
  };

  // message setting
  const recvMessage = (recv) => {
    setNewMessages((oldArray) => [
      ...oldArray,
      {
        id: recv.id,
        type: recv.type,
        sender: recv.senderNickname,
        message: recv.type == 'ENTER' ? '[알림]' + recv.senderNickname : recv.message,
        senderImage: recv.senderImage,
        createdAt: recv.createdAt,
      },
    ]);
    // setNewMessages.push({'type':recv.type,'sender':recv.type=='ENTER'?'[알림]':recv.sender,'message':recv.message});
  };

  // 스크롤을 제일 아래도 내리는 함수
  const scrollToBottom = () => {
    msgContent.current.scrollTop = msgContent.current.scrollHeight;
  };

  const hideMyChat = () => {
    disconnect();
    dispatch(changeShow(false));
    dispatch(getChatInfo());
  };

  // 메시지 정보 요청 axios
  const getMessage = async () => {
    await Axios.get(`/chat/find/${chatRoomId}`)
      .then(async (res) => {
        await setChatMessageInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onKeyPress = (e) => {
    if (e.key == 'Enter') {
      sendMessage();
    }
  };

  const checkPlan = () => {
    Axios.get(`${axios_apis.plans.checkPlan}/${chatMessageInfo.boardNo}`)
      .then((data) => {
        console.log(data);
        setPlanState(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getMessage();
    connect(); // web socket connect
  }, []);

  useEffect(() => {
    let email;
    if (user.userInfo.userEmail !== chatMessageInfo.userEmail1) {
      email = chatMessageInfo.userEmail1;
    } else {
      email = chatMessageInfo.userEmail2;
    }
    setOtherEmail(email);

    if (chatMessageInfo.boardNo) checkPlan();
  }, [chatMessageInfo]);

  useEffect(() => {
    if (chatMessageInfo.boardNo) checkPlan();
  }, [showSchedule, showScheduleDetail]);

  useEffect(() => {
    scrollToBottom();
  });

  return (
    <>
      {/* {console.log(chatMessageInfo)} */}
      <div className="showChatDisplayWrap">
        {showSchedule && (
          <Schedule
            show={setShowSchedule}
            otherEmail={otherEmail}
            boardNo={chatMessageInfo.boardNo}
          />
        )}
        {showScheduleDetail && (
          <ScheduleDetail
            show={setShowScheduleDetail}
            setShow={setShow}
            boardNo={chatMessageInfo.boardNo}
          />
        )}
        <section className="chatDisplayWrap">
          <div className="chatHeader">
            {!planState ? (
              <button className="headerBtn" onClick={() => setShowSchedule(true)}>
                일정 잡기
              </button>
            ) : (
              <button className="headerBtn" onClick={() => setShowScheduleDetail(true)}>
                일정 확인
              </button>
            )}

            <CloseIcon className="closeIcon" style={{ fontSize: '34px' }} onClick={hideMyChat} />
          </div>
          <div className="chatContent" ref={msgContent}>
            {/* 기존의 채팅 목록 불러오기 */}
            {chatMessageInfo.length === 0 ? (
              <></>
            ) : (
              <>
                {chatMessageInfo.chatMessages.length === 0 && newMessages.length === 0 ? (
                  <div className="imageWrapper">
                    <img className="messageImage" src={messageImg}></img>
                    <div>대화를 시작해보세요!</div>
                  </div>
                ) : (
                  <>
                    {chatMessageInfo.chatMessages.map((message) => (
                      <div key={message.id}>
                        {message.type === 'LEAVE' ? (
                          <div className="d-flex justify-content-center m-4">{message.message}</div>
                        ) : (
                          <>
                            {message.senderNickname === user.userInfo.userNickname ? (
                              <>
                                <div className="userMsg myMsg d-flex justify-content-end">
                                  <div className="msgWrapper">
                                    <div className="d-flex justify-content-end">
                                      <div>{message.senderNickname}</div>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                      <div className="msgTime">
                                        {dayjs(message.createdAt).format('YY/MM/DD HH:mm')}
                                      </div>
                                      <div className="msgContent">{message.message}</div>
                                    </div>
                                  </div>
                                  <div className="profileImg">
                                    <img
                                      src={
                                        !message.senderImage.includes('kakao')
                                          ? message.senderImage
                                            ? `${BASE_IMG_URL}${message.senderImage}`
                                            : '/img/basicProfile.png'
                                          : message.senderImage
                                      }
                                      alt=""
                                    />
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div className="userMsg otherMsg d-flex">
                                <div className="profileImg">
                                  <img
                                    src={
                                      !message.senderImage.includes('kakao')
                                        ? message.senderImage
                                          ? `${BASE_IMG_URL}${message.senderImage}`
                                          : '/img/basicProfile.png'
                                        : message.senderImage
                                    }
                                    alt=""
                                  />
                                </div>
                                <div className="msgWrapper">
                                  <div className="d-flex">
                                    <div>{message.senderNickname}</div>
                                  </div>
                                  <div className="d-flex">
                                    <div className="msgContent">{message.message}</div>
                                    <div className="msgTime">
                                      {dayjs(message.createdAt).format('YY/MM/DD HH:mm')}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    ))}

                    {/* 새로 추가된 메시지 */}
                    {newMessages.map((m) => (
                      <div key={m.id}>
                        {m.type === 'TALK' ? (
                          <>
                            {m.sender === user.userInfo.userNickname ? (
                              <div className="userMsg myMsg d-flex justify-content-end">
                                <div className="msgWrapper">
                                  <div className="d-flex justify-content-end">
                                    <div>{m.sender}</div>
                                  </div>
                                  <div className="d-flex justify-content-end">
                                    <div className="msgTime">
                                      {dayjs(m.createdAt).format('YY/MM/DD HH:mm')}
                                    </div>
                                    <div className="msgContent">{m.message}</div>
                                  </div>
                                </div>
                                <div className="profileImg">
                                  <img
                                    src={
                                      !m.senderImage.includes('kakao')
                                        ? m.senderImage
                                          ? `${BASE_IMG_URL}${m.senderImage}`
                                          : '/img/basicProfile.png'
                                        : m.senderImage
                                    }
                                    alt=""
                                  />
                                </div>
                              </div>
                            ) : (
                              <div className="userMsg otherMsg d-flex">
                                <div className="profileImg">
                                  <img
                                    src={
                                      !m.senderImage.includes('kakao')
                                        ? m.senderImage
                                          ? `${BASE_IMG_URL}${m.senderImage}`
                                          : '/img/basicProfile.png'
                                        : m.senderImage
                                    }
                                    alt=""
                                  />
                                </div>
                                <div className="msgWrapper">
                                  <div className="d-flex">
                                    <div>{m.sender}</div>
                                  </div>
                                  <div className="d-flex">
                                    <div className="msgContent">{m.message}</div>
                                    <div className="msgTime">
                                      {dayjs(m.createdAt).toShortTimeString()}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                        ) : (
                          <>{m.sender}</>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </>
            )}
          </div>
          <div className="chatFooter">
            <input
              className="msgInput"
              type="text"
              value={msg}
              onKeyPress={onKeyPress}
              onChange={(e) => setMsg(e.target.value)}
            />
            {/* <input className='msgInput' type='text' /> */}
            <button className="sendBtn" onClick={sendMessage}>
              전송
            </button>
          </div>
        </section>
      </div>
    </>
  );
};
