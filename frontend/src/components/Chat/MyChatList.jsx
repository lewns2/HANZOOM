import React from 'react';

export const MyChatList = (chat) => {
  return (
    <div className="d-flex listWrap">
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
  );
};
