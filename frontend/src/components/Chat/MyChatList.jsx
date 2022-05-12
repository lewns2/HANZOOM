import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeShow, setRoomId, getChatMessageInfo, getChatInfo } from '../../Reducer/chatSlice';
import { Axios } from '../../core/axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { BASE_IMG_URL } from '../../core/s3';

export const MyChatList = (chat) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = sessionStorage.getItem('jwt-token');
  const today = new Date();

  const showMyChat = (chat) => {
    dispatch(setRoomId(chat.id));
    dispatch(getChatMessageInfo());
    dispatch(changeShow(true));
  };

  const handleDeleteChat = async (id) => {
    // alert(id);
    console.log('>>>>>>>>>>> token : ', token, ' && id : ', id);
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
                  ? `${BASE_IMG_URL}${chat.chat.userImage2}`
                  : '/img/basicProfile.png'
              }
              alt="userProfileImage"
            />
          ) : (
            <img
              src={
                chat.chat.userImage1
                  ? `${BASE_IMG_URL}${chat.chat.userImage1}`
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
                    {chat.chat.chatMessages.createdAt.slice(5, 7)}/
                    {chat.chat.chatMessages.createdAt.slice(8, 10)}{' '}
                    {chat.chat.chatMessages.createdAt.slice(10, 16)}
                  </div>
                ) : (
                  <div className="chatTime">{chat.chat.chatMessages.createdAt.slice(0, 16)}</div>
                )}
              </>
            )}
            {/* <div className="chatIngredient mx-auto">{chat.chat.ingredientList[0]}</div> */}
            <DeleteIcon
              className="chatDelete ms-auto"
              onClick={() => handleDeleteChat(chat.chat.id)}
            />
          </div>
          <div className="chatIngredientList">
            {chat.chat.ingredientList.map((ingredient, index) => (
              <span className="chatIngredient" key={index}>
                {ingredient}
              </span>
            ))}
          </div>
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
