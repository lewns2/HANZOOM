import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeShow, setRoomId, getChatMessageInfo } from '../../Reducer/chatSlice';

export const MyChatList = (chat) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const showMyChat = (chat) => {
    dispatch(setRoomId(chat.id));
    dispatch(getChatMessageInfo());
    dispatch(changeShow(true));
  };

  return (
    <>
      <div className="d-flex listWrap" onClick={() => showMyChat(chat.chat)}>
        <div className="profileImage">
          <img src={chat.user_image ? `${chat.chat.user_image}` : '/img/basicProfile.png'} alt="" />
        </div>
        <div className="chatInfo">
          <div className="d-flex">
            <div className="nickName">
              { chat.chat.userNickname1 === user.userInfo.userNickname ? 
                chat.chat.userNickname2 : chat.chat.userNickname1 }
            </div>
            <div className="chatTime">{chat.chat.created_at}</div>
          </div>
          { chat.chat.chatMessages === null ? 
            <div className="chatContent">채팅을 시작해보세요!</div> 
          : 
            <div className="chatContent"> { chat.chat.chatMessages.message }</div>
          }
        </div>
      </div>
    </>
  );
};
