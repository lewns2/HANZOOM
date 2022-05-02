import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { FoodModal } from './FoodModal';
import { useEffect, useState } from 'react';
import { Axios } from '../../../core/axios.js';

export const FoodIngreList = (props) => {
  const { ingre, state, setState } = props;
  // 수정모달
  const [modalOpen3, setModalOpen3] = useState(false);

  const openModal3 = () => {
    setModalOpen3(true);
  };
  const closeModal3 = () => {
    setModalOpen3(false);
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
    </>
  );
};
