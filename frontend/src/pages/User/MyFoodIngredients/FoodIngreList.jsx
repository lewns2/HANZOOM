import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { FoodModal } from './FoodModal';
import { useEffect, useState } from 'react';
import { Axios } from '../../../core/axios.js';

export const FoodIngreList = (props) => {
  const { ingre, state, setState } = props;
  // 수정모달
  const [modalOpen3, setModalOpen3] = useState(false);
  const [modalOpen4, setModalOpen4] = useState(false);

  const openModal3 = () => {
    setModalOpen3(true);
  };
  const closeModal3 = () => {
    setModalOpen3(false);
  };
  const openModal4 = () => {
    setModalOpen4(true);
  };
  const closeModal4 = () => {
    setModalOpen4(false);
  };

  const deleteFoodIngre = async (userIngredientNo) => {
    await Axios.delete(`userIngredient/remove/${userIngredientNo}`)
      .then((res) => {
        console.log(res);
        setState(!state);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {ingre.type === '필요' && (
        <div>
          <input type="checkbox" />
          {ingre.ingredientName}
          <EditIcon onClick={openModal4} />
          <FoodModal
            open={modalOpen4}
            close={closeModal4}
            header="필요목록 수정"
            ingre={ingre}
            state={state}
            setState={setState}
          />
          <DeleteIcon onClick={() => deleteFoodIngre(ingre.userIngredientNo)} />
        </div>
      )}
      {ingre.type === '일반' && (
        <div>
          <input type="checkbox" />
          {ingre.ingredientName}
          <EditIcon onClick={openModal3} />
          <FoodModal
            open={modalOpen3}
            close={closeModal3}
            header="식재료 수정"
            ingre={ingre}
            state={state}
            setState={setState}
          />
          <DeleteIcon onClick={() => deleteFoodIngre(ingre.userIngredientNo)} />
        </div>
      )}
    </>
  );
};
