import { Main } from './Main';
import { Board } from './Board';
import { MyFoodIngredients } from './MyFoodIngredients';
import { MyPage } from './MyPage';

import {Navbar} from '../components/Navbar';

import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';

export const Routing = () => {
    return (
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/main" element={<Main />} />
          <Route path="/board" element={<Board />} />
          <Route path="/my-food-ingredients" element={<MyFoodIngredients />} />
          <Route path="/my-page" element={<MyPage />} />
          <Route path="*" element={<Navigate replace to="/main" />} />
        </Routes>
      </BrowserRouter>
    );
};