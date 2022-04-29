import React from 'react';
import { useDispatch } from 'react-redux';
import { changeShow } from '../../Reducer/chatSlice';

export const MyChatList = (chat) => {
  const dispatch = useDispatch();

  const showMyChat = () => {
    dispatch(changeShow(true));
  };

  return (
    <>
      <div className="d-flex listWrap" onClick={showMyChat}>
        <div className="profileImage">
          <img src={chat.user_image ? `${chat.chat.user_image}` : '/img/basicProfile.png'} alt="" />
        </div>
        <div className="chatInfo">
          <div className="d-flex">
            <div className="nickName">{chat.chat.user_nickname}</div>
            <div className="chatTime">{chat.chat.created_at}</div>
          </div>
          <div className="chatContent">{chat.chat.message}</div>
        </div>
      </div>
    </>
  );
};
