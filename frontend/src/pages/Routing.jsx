import { Main } from './Main/Main';
import { Board } from './Board/Board';
import { BoardDetail } from './Board/BoardDetail';
import { MyFoodIngredients } from './User/MyFoodIngredients/MyFoodIngredients';
import { MyPage } from './User/MyPage';
import { SignUp } from './User/SignUp';
import { Login } from './User/Login';
import { FindPassword } from './User/FindPassword';

import { Header } from '../components/Header';

import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';

export const Routing = () => {
  return (
    <BrowserRouter>
      <Header />
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
    </BrowserRouter>
  );
};
