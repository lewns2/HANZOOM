import { useEffect, useState } from 'react';
import { AddMyFoodIngredients } from './AddMyFoodIngredients';
import { AddNeedsIngredients } from './AddNeedsIngredients';
import { Axios } from '../../../core/axios.js';
import './FoodModal.scss';
import { ModiMyFoodIngredients } from './ModiMyFoodIngredients';
import swal from 'sweetalert';

export const FoodModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, ingre } = props;

  const [foods, setFoods] = useState({
    ingredient: null,
    purchaseDate: { year: null, month: null, day: null },
    expirationDate: { year: null, month: null, day: null },
  });
  const [needs, setNeeds] = useState({
    ingredient: null,
  });
  const token = sessionStorage.getItem('jwt-token');
  const registerIngre = async () => {
    var expiration = `${foods.expirationDate.year}-${foods.expirationDate.month}-${foods.expirationDate.day}`;
    var purchase = `${foods.purchaseDate.year}-${foods.purchaseDate.month}-${foods.purchaseDate.day}`;
    console.log(expiration);
    if (expiration === 'NaN-NaN-NaN') {
      expiration = '';
    }
    if (purchase === 'NaN-NaN-NaN') {
      purchase = '';
    }
    if (!foods.ingredient) {
      swal('식재료명을 입력해주세요.', '', 'error');
      return;
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
        if (res.data.message === 'Pending') {
          swal({
            title: '저장되지 않은 식재료 입니다.',
            text: '관리자 승인 후, MY식재료에서 확인할 수 있습니다.\n(소요시간: 2-3일)',
            icon: 'info',
          });
        }
        close();
      })
      .catch((err) => {
        swal('MY식재료 등록에 실패하였습니다😓', '', 'error', {
          buttons: false,
          timer: 2000,
        });
        console.log(err);
      });
  };

  const registerNeeds = () => {
    if (!needs.ingredient) {
      swal('식재료명을 입력해주세요.', '', 'error');
      return;
    }
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
        if (res.data.message === 'Pending') {
          swal({
            title: '저장되지 않은 식재료 입니다.',
            text: '관리자 승인 후, 필요목록에서 확인할 수 있습니다.\n(소요시간: 2-3일)',
            icon: 'info',
          });
        }
        close();
      })
      .catch((err) => {
        console.log(err);
        swal('필요목록 등록에 실패하였습니다😓', '', 'error', {
          buttons: false,
          timer: 2000,
        });
      });
  };

  const modifyIngre = () => {
    var expiration = `${foods.expirationDate.year}-${foods.expirationDate.month}-${foods.expirationDate.day}`;
    var purchase = `${foods.purchaseDate.year}-${foods.purchaseDate.month}-${foods.purchaseDate.day}`;
    if (expiration === 'NaN-NaN-NaN') {
      expiration = '';
    }
    if (purchase === 'NaN-NaN-NaN') {
      purchase = '';
    }
    if (!foods.ingredient) {
      swal('식재료명을 입력해주세요.', '', 'error');
      return;
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
        close();
      })
      .catch((err) => {
        console.log(err);
        swal('MY식재료 수정에 실패하였습니다😓', '', 'error', {
          buttons: false,
          timer: 2000,
        });
      });
  };
  const modifyNeeds = () => {
    if (!needs.ingredient) {
      swal('식재료명을 입력해주세요.', '', 'error');
      return;
    }
    Axios.put('/userIngredient/update', {
      expirationDate: '',
      ingredientName: needs.ingredient,
      purchaseDate: '',
      type: '필요',
      userIngredientNo: ingre.userIngredientNo,
    })
      .then((res) => {
        console.log(res);
        close();
      })
      .catch((err) => {
        console.log(err);
        swal('필요목록 수정에 실패하였습니다😓', '', 'error', {
          buttons: false,
          timer: 2000,
        });
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
