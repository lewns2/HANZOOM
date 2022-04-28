import { Main } from './Main/Main';
import { Board } from './Board/Board';
import { BoardDetail } from './Board/BoardDetail';
import { MyFoodIngredients } from './User/MyFoodIngredients/MyFoodIngredients';
import { MyPage } from './User/MyPage';
import { SignUp } from './User/SignUp';
import { Login } from './User/Login';
import { FindPassword } from './User/FindPassword';

import { Header } from '../components/Header';
import { MyChat } from '../components/Chat/MyChat';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import CommentsDisabledOutlinedIcon from '@mui/icons-material/CommentsDisabledOutlined';

import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import { useState } from 'react';

export const Routing = () => {
  const [showChatList, setShowChatList] = useState(false);

  const hideChat = () => {};

  return (
    <BrowserRouter>
      <Header />
      <MyChat show={showChatList} setShow={setShowChatList} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/board" element={<Board />} />
        <Route path="/board/:id" element={<BoardDetail />} />
        <Route path="/my-food-ingredients" element={<MyFoodIngredients />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/find-password" element={<FindPassword />} />
      </Routes>
      {!showChatList ? (
        <CommentOutlinedIcon
          className="chatIcon"
          style={{ fontSize: '50px', color: 'green' }}
          onClick={() => setShowChatList(!showChatList)}
        />
      ) : (
        <CommentsDisabledOutlinedIcon
          className="chatIcon"
          style={{ fontSize: '50px', color: 'green' }}
          onClick={() => setShowChatList(!showChatList)}
        />
      )}
    </BrowserRouter>
  );
};
