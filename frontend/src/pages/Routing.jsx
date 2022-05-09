import { Main } from './Main/Main';
import { Board } from './Board/Board';
import { BoardDetail } from './Board/BoardDetail';
import { BoardCreate } from './Board/BoardCreate';
import { MyFoodIngredients } from './User/MyFoodIngredients/MyFoodIngredients';
import { MyPage } from './User/MyPage';
import { SignUp } from './User/SignUp';
import { Login } from './User/Login';
import { FindPassword } from './User/FindPassword';
import { Recipe } from './Recipe/Recipe';
import { Match } from './Match/Match';
import { NearbyMartMap } from '../components/Map/NearbyMartMap';
import { Header } from '../components/Header';
import { KaKaoCall } from '../components/User/Login/KaKaoCall';
import { MyChat } from '../components/Chat/MyChat';
import { MyChatDisplay } from '../components/Chat/MyChatDisplay';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import CommentsDisabledOutlinedIcon from '@mui/icons-material/CommentsDisabledOutlined';

import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getChatInfo } from '../Reducer/chatSlice';

export const Routing = () => {
  const [showChatList, setShowChatList] = useState(false);
  const chatShow = useSelector((state) => state.chat);
  const [showChat, setShowChat] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setShowChat(chatShow.chatShow);
  }, []);
  useEffect(() => {
    setShowChat(chatShow.chatShow);
  }, [chatShow]);

  return (
    <BrowserRouter>
      <Header />
      <MyChat show={showChatList} setShow={setShowChatList} />
      {showChat ? <MyChatDisplay setShow={setShowChatList} /> : null}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/board" element={<Board />} />
        <Route path="/board/:id" element={<BoardDetail />} />
        <Route path="/board/write" element={<BoardCreate />} />
        <Route path="/my-food-ingredients" element={<MyFoodIngredients />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/martmap" element={<NearbyMartMap />} />
        <Route path="/find-password" element={<FindPassword />} />
        <Route path="/oauth/kakao/callback" element={<KaKaoCall />}></Route>
        <Route path="/recipe" element={<Recipe />}></Route>
        <Route path="/match" element={<Match />}></Route>
      </Routes>
      {!showChatList ? (
        <CommentOutlinedIcon
          className="chatIcon"
          style={{ fontSize: '50px', color: 'green' }}
          onClick={() => {
            setShowChatList(!showChatList);
            dispatch(getChatInfo());
          }}
        />
      ) : (
        <CommentsDisabledOutlinedIcon
          className="chatIcon"
          style={{ fontSize: '50px', color: 'green' }}
          onClick={() => {
            setShowChatList(!showChatList);
          }}
        />
      )}
    </BrowserRouter>
  );
};
