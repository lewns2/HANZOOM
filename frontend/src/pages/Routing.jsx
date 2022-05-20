import { Main } from './Main/Main';
import { Board } from './Board/Board';
import { BoardDetail } from './Board/BoardDetail';
import { BoardCreate } from './Board/BoardCreate';
import { BoardModify } from './Board/BoardModify';
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
import { Footer } from '../components/Footer';
import { Admin } from './Admin/Admin';
import { NotFound } from '../components/NotFound/NotFound';
import ChatIcon from '../assets/images/chat.png';
import NoChatIcon from '../assets/images/nochat.png';

import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getChatInfo } from '../Reducer/chatSlice';

export const Routing = () => {
  const [showChatList, setShowChatList] = useState(false);
  const chatShow = useSelector((state) => state.chat);
  const [showChat, setShowChat] = useState(false);
  const [beforeLoginPage, setBeforeLoginPage] = useState(false);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const setChatInfo = () => {
    if (user.userInfo !== null) dispatch(getChatInfo());
  };

  useEffect(() => {
    setShowChat(chatShow.chatShow);
  }, []);

  useEffect(() => {
    setShowChat(chatShow.chatShow);
  }, [chatShow]);

  useEffect(() => {
    setBeforeLoginPage(user.beforeLogin);
  }, [user]);

  return (
    <BrowserRouter>
      <Header />
      <MyChat show={showChatList} setShow={setShowChatList} />
      {showChat ? <MyChatDisplay setShow={setShowChatList} /> : null}

      <div style={{ minHeight: '100%' }}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/board" element={<Board />} />
          <Route path="/board/:id" element={<BoardDetail />} />
          <Route path="/board/write" element={<BoardCreate />} />
          <Route path="/board/modify/:id" element={<BoardModify />} />
          <Route path="/my-food-ingredients" element={<MyFoodIngredients />} />
          <Route path="/my-page" element={<MyPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/martmap" element={<NearbyMartMap />} />
          <Route path="/find-password" element={<FindPassword />} />
          <Route path="/oauth/kakao/callback" element={<KaKaoCall />}></Route>
          <Route path="/recipe" element={<Recipe />}></Route>
          <Route path="/match" element={<Match />}></Route>
          <Route
            path="/admin"
            element={user.userInfo.userNickname === 'admin' ? <Admin /> : <Main />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
      {user.userInfo.length !== 0 && (
        <>
          {!showChatList ? (
            <img
              src={ChatIcon}
              className="chatIcon"
              style={{ width: '70px', height: '70px' }}
              onClick={() => {
                setShowChatList(!showChatList);
                setChatInfo();
              }}
            />
          ) : (
            <img
              src={NoChatIcon}
              className="chatIcon"
              style={{ width: '70px', height: '70px' }}
              onClick={() => {
                setShowChatList(!showChatList);
              }}
            />
          )}
        </>
      )}
      {!beforeLoginPage && <Footer></Footer>}
    </BrowserRouter>
  );
};
