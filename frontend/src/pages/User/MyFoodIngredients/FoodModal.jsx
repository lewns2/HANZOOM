import { useState } from 'react';
import { AddMyFoodIngredients } from './AddMyFoodIngredients';
import { AddNeedsIngredients } from './AddNeedsIngredients';
import { Axios } from '../../../core/axios.js';
import './FoodModal.scss';

export const FoodModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;
  const [foods, setFoods] = useState({
    ingredient: null,
    purchaseDate: { year: null, month: null, day: null },
    expirationDate: { year: null, month: null, day: null },
  });
  const [needs, setNeeds] = useState({
    ingredient: null,
  });

  const registerIngre = async () => {
    const token = sessionStorage.getItem('jwt-token');
    Axios.post(
      '/userIngredient/register',
      {
        expirationDate: `${foods.expirationDate.year}-${foods.expirationDate.month}-${foods.expirationDate.day}`,
        ingredientName: foods.ingredient,
        purchaseDate: `${foods.purchaseDate.year}-${foods.purchaseDate.month}-${foods.purchaseDate.day}`,
        type: '일반',
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then((res) => {
        console.log(res);
        close();
      })
      .catch((err) => {
        alert('MY식재료 등록에 실패하였습니다😓');
        console.log(err);
      });
  };

  const registerNeeds = () => {
    const token = sessionStorage.getItem('jwt-token');
    Axios.post(
      '/userIngredient/register',
      {
        expirationDate: '',
        ingredientName: needs.ingredient,
        purchaseDate: '',
        type: '필요',
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then((res) => {
        console.log(res);
        close();
      })
      .catch(() => {
        alert('필요목록 등록에 실패하였습니다😓');
      });
  };
  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
            {props.header === '식재료 등록' ? (
              <AddMyFoodIngredients setFoods={setFoods} foods={foods} />
            ) : (
              <AddNeedsIngredients setNeeds={setNeeds} needs={needs} />
            )}
          </main>
          <footer>
            <button className="close" onClick={close}>
              취소
            </button>
            {props.header === '식재료 등록' ? (
              <button className="apply" onClick={registerIngre}>
                등록
              </button>
            ) : (
              <button className="apply" onClick={registerNeeds}>
                등록
              </button>
            )}
          </footer>
        </section>
      ) : null}
    </div>
  );
};
