import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeShow, setRoomId, getChatMessageInfo, getChatInfo } from '../../Reducer/chatSlice';
import { setOtherImage } from '../../Reducer/userSlice';
import { Axios } from '../../core/axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { BASE_IMG_URL } from '../../core/s3';
import dayjs from 'dayjs';

export const MyChatList = (chat) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = sessionStorage.getItem('jwt-token');
  const today = new Date();

  const showMyChat = (chat) => {
    dispatch(setRoomId(chat.id));
    dispatch(getChatMessageInfo());
    dispatch(changeShow(true));
    if (chat.userNickname1 === user.userInfo.userNickname) {
      console.log(chat.userImage2);
      dispatch(setOtherImage(chat.userImage2));
    } else {
      dispatch(setOtherImage(chat.userImage1));
      console.log(chat.userImage2);
    }
  };

  const handleDeleteChat = async (id) => {
    await Axios.delete('/chat/remove', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        id: id,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    dispatch(getChatInfo());
  };

  return (
    <>
      <div className="d-flex listWrap" onClick={() => showMyChat(chat.chat)}>
        <div className="profileImage">
          {chat.chat.userNickname1 === user.userInfo.userNickname ? (
            <img
              src={
                chat.chat.userImage2
                  ? chat.chat.userImage2.includes('kakao')
                    ? chat.chat.userImage2
                    : `${BASE_IMG_URL}${chat.chat.userImage2}`
                  : '/img/basicProfile.png'
              }
              alt="userProfileImage"
            />
          ) : (
            <img
              src={
                chat.chat.userImage1
                  ? chat.chat.userImage1.includes('kakao')
                    ? chat.chat.userImage1
                    : `${BASE_IMG_URL}${chat.chat.userImage1}`
                  : '/img/basicProfile.png'
              }
              alt="userProfileImage"
            />
          )}
        </div>
        <div className="chatInfo">
          <div className="d-flex">
            <div className="nickName">
              {chat.chat.userNickname1 === '' || chat.chat.userNickname2 === ''
                ? '(알수없음)'
                : chat.chat.userNickname1 === user.userInfo.userNickname
                ? chat.chat.userNickname2
                : chat.chat.userNickname1}
            </div>
            {chat.chat.chatMessages === null ? (
              <div className="chatTime"></div>
            ) : (
              <>
                {chat.chat.chatMessages.createdAt.slice(0, 4) == today.getFullYear() ? (
                  <div className="chatTime">
                    {dayjs(chat.chat.chatMessages.createdAt).format('MM/DD HH:mm')}
                  </div>
                ) : (
                  <div className="chatTime">
                    {dayjs(chat.chat.chatMessages.createdAt).format('YY/MM/DD HH:mm')}
                  </div>
                )}
              </>
            )}
            <DeleteIcon
              className="chatDelete ms-auto"
              onClick={(event) => {
                handleDeleteChat(chat.chat.id);
                event.stopPropagation();
              }}
            />
          </div>
          {chat.chat.ingredientList.length > 0 && (
            <div className="chatIngredientList">
              {chat.chat.ingredientList.map((ingredient, index) => (
                <span className="chatIngredient" key={index}>
                  {ingredient}
                </span>
              ))}
            </div>
          )}
          {chat.chat.chatMessages === null ? (
            <div className="chatContent">채팅을 시작해보세요!</div>
          ) : (
            <div className="chatContent"> {chat.chat.chatMessages.message}</div>
          )}
        </div>
      </div>
    </>
  );
};
