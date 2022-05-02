import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { FoodModal } from './FoodModal';
import { useState } from 'react';

export const FoodIngreList = (props) => {
  const { ingre } = props;
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
      <FoodModal open={modalOpen3} close={closeModal3} header="식재료 수정" ingre={ingre} />
      <DeleteIcon onClick={() => deleteFoodIngre(ingre.userIngredientNo)} />
    </>
  );
};
