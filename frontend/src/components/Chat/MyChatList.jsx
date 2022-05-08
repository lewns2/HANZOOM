import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeShow, setRoomId, getChatMessageInfo, getChatInfo } from '../../Reducer/chatSlice';
import { Axios } from '../../core/axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { ConnectingAirportsOutlined } from '@mui/icons-material';

export const MyChatList = (chat) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = sessionStorage.getItem('jwt-token');

  const showMyChat = (chat) => {
    dispatch(setRoomId(chat.id));
    dispatch(getChatMessageInfo());
    dispatch(changeShow(true));
  };

  const handleDeleteChat = async (id) => {
    // alert(id);
    console.log('>>>>>>>>>>> token : ', token, ' && id : ', id);
    await Axios
      .delete('/chat/remove', {
          headers: { 
            Authorization: `Bearer ${token}`,
          },
          params: {
            id: id,
          },
        },
      )
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
          <img src={chat.user_image ? `${chat.chat.user_image}` : '/img/basicProfile.png'} alt="" />
        </div>
        <div className="chatInfo">
          <div className="d-flex">
            <div className="nickName">
              { chat.chat.userNickname1 === '' || chat.chat.userNickname2 === '' ?
                '(알수없음)' 
              : 
                (chat.chat.userNickname1 === user.userInfo.userNickname ? 
                  chat.chat.userNickname2 : chat.chat.userNickname1) 
              }
            </div>
            {/* { chat.chat.chatMessages === null ? 
              <div AclassName="chatTime"></div>
            :
              <div AclassName="chatTime">{ chat.chat.chatMessages.createdAt }</div>
            } */}
            <DeleteIcon className="chatDelete" onClick={ () => handleDeleteChat(chat.chat.id) }/>
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
