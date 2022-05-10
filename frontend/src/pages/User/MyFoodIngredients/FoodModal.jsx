import { useEffect, useState } from 'react';
import { AddMyFoodIngredients } from './AddMyFoodIngredients';
import { AddNeedsIngredients } from './AddNeedsIngredients';
import { Axios } from '../../../core/axios.js';
import './FoodModal.scss';
import { ModiMyFoodIngredients } from './ModiMyFoodIngredients';

export const FoodModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, ingre, state, setState } = props;
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
    const expiration = `${foods.expirationDate.year}-${foods.expirationDate.month}-${foods.expirationDate.day}`;
    const purchase = `${foods.purchaseDate.year}-${foods.purchaseDate.month}-${foods.purchaseDate.day}`;
    if (foods.expirationDate.year === NaN) {
      expiration = '';
    }
    if (foods.purchaseDate.year === NaN) {
      purchase = '';
    }
    Axios.post(
      '/userIngredient/register',
      {
        expirationDate: expiration,
        ingredientName: foods.ingredient,
        purchaseDate: purchase,
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
        setState(!state);
        close();
      })
      .catch((err) => {
        console.log(err);
        alert('필요목록 등록에 실패하였습니다😓');
      });
  };

  const modifyIngre = () => {
    const expiration = `${foods.expirationDate.year}-${foods.expirationDate.month}-${foods.expirationDate.day}`;
    const purchase = `${foods.purchaseDate.year}-${foods.purchaseDate.month}-${foods.purchaseDate.day}`;
    console.log('>>>>>>>>>수정 유통기한', expiration);
    console.log('>>>>>>>>>수정 구매일자', purchase);

    if (foods.expirationDate.year === NaN) {
      expiration = '';
    }
    if (foods.purchaseDate.year === NaN) {
      purchase = '';
    }
    Axios.put('/userIngredient/update', {
      expirationDate: expiration,
      ingredientName: foods.ingredient,
      purchaseDate: purchase,
      type: '일반',
      userIngredientNo: ingre.userIngredientNo,
    })
      .then((res) => {
        console.log(res);
        setState(!state);
        close();
      })
      .catch((err) => {
        alert('MY식재료 수정에 실패하였습니다😓');
        console.log(err);
      });
  };
  const modifyNeeds = () => {
    console.log(needs.ingredient);
    console.log(ingre.userIngredientNo);
    Axios.put('/userIngredient/update', {
      expirationDate: '',
      ingredientName: needs.ingredient,
      purchaseDate: '',
      type: '필요',
      userIngredientNo: ingre.userIngredientNo,
    })
      .then((res) => {
        console.log(res);
        setState(!state);
        close();
      })
      .catch((err) => {
        alert('필요목록 수정에 실패하였습니다😓');
        console.log(err);
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
            {props.header === '식재료 등록' || props.header === '식재료 수정' ? (
              props.header === '식재료 등록' ? (
                <AddMyFoodIngredients
                  setFoods={setFoods}
                  foods={foods}
                  header={header}
                  ingre={ingre}
                />
              ) : (
                <ModiMyFoodIngredients
                  setFoods={setFoods}
                  foods={foods}
                  header={header}
                  ingre={ingre}
                />
              )
            ) : (
              <AddNeedsIngredients
                setNeeds={setNeeds}
                needs={needs}
                header={header}
                ingre={ingre}
              />
            )}
          </main>
          <footer>
            <button className="close" onClick={close}>
              취소
            </button>
            {props.header === '식재료 등록' && (
              <button className="apply" onClick={registerIngre}>
                등록
              </button>
            )}
            {props.header === '필요목록 등록' && (
              <button className="apply" onClick={registerNeeds}>
                등록
              </button>
            )}
            {props.header === '식재료 수정' && (
              <button className="apply" onClick={modifyIngre}>
                수정
              </button>
            )}
            {props.header === '필요목록 수정' && (
              <button className="apply" onClick={modifyNeeds}>
                수정
              </button>
            )}
          </footer>
        </section>
      ) : null}
    </div>
  );
};
