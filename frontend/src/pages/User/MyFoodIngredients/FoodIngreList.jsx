import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { FoodModal } from './FoodModal';
import { useState } from 'react';
import { Axios } from '../../../core/axios.js';
import { Draggable } from 'react-beautiful-dnd';

export const FoodIngreList = (props) => {
  const {
    task,
    index,
    state,
    setState,
    checkedIngre,
    setCheckedIngre,
    checkedBSIngre,
    setCheckedBSIngre,
    checkedNeeds,
    setCheckedNeeds,
  } = props;

  // 수정모달
  const [modalOpen3, setModalOpen3] = useState(false);
  const [modalOpen4, setModalOpen4] = useState(false);

  // 일반식재료 체크
  const handleCheck = (checked, name) => {
    if (checked) {
      setCheckedIngre([...checkedIngre, name]);
    } else {
      // 체크 해제
      setCheckedIngre(checkedIngre.filter((el) => el !== name));
    }
  };

  // 필요 식재료 체크
  const handleNeedsCheck = (checked, name) => {
    if (checked) {
      setCheckedNeeds([...checkedNeeds, name]);
    } else {
      // 체크 해제
      setCheckedNeeds(checkedNeeds.filter((el) => el !== name));
    }
  };

  // 교환/나눔 식재료 체크
  const handleBSCheck = (checked, name) => {
    if (checked) {
      setCheckedBSIngre([...checkedBSIngre, name]);
    } else {
      // 체크 해제
      setCheckedBSIngre(checkedBSIngre.filter((el) => el !== name));
    }
  };

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

  // 식재료 삭제 요청
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
      {task.type === '필요' && (
        <div>
          <input
            type="checkbox"
            onChange={(e) => handleNeedsCheck(e.target.checked, task.ingredientName)}
            checked={checkedNeeds.includes(task.ingredientName) ? true : false}
          />
          {task.ingredientName}
          <EditIcon onClick={openModal4} style={{ cursor: 'pointer' }} />
          <FoodModal
            open={modalOpen4}
            close={closeModal4}
            header="필요목록 수정"
            ingre={task}
            state={state}
            setState={setState}
          />
          <DeleteIcon
            onClick={() => deleteFoodIngre(task.userIngredientNo)}
            style={{ cursor: 'pointer' }}
          />
        </div>
      )}
      {(task.type === '일반' || task.type === '교환/나눔') && (
        <Draggable
          draggableId={String(task.userIngredientNo)}
          index={index}
          key={task.userIngredientNo}>
          {(provided, snapshot) => (
            <div

            // isDragging={snapshot.isDragging} // 드래그 중일 때의 스타일링을 위해 snapshot 속성을 외부로 가져옴
            >
              {task.type === '일반' && (
                <input
                  type="checkbox"
                  onChange={(e) => handleCheck(e.target.checked, task.ingredientName)}
                  checked={checkedIngre.includes(task.ingredientName) ? true : false}
                />
              )}
              {task.type === '교환/나눔' && (
                <input
                  type="checkbox"
                  onChange={(e) => handleBSCheck(e.target.checked, task.ingredientName)}
                  checked={checkedBSIngre.includes(task.ingredientName) ? true : false}
                />
              )}

              <span
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}>
                {task.ingredientName}
              </span>
              {task.type === '교환/나눔' ? null : (
                <span>
                  <EditIcon onClick={openModal3} style={{ cursor: 'pointer' }} />
                  <FoodModal
                    open={modalOpen3}
                    close={closeModal3}
                    header="식재료 수정"
                    ingre={task}
                    state={state}
                    setState={setState}
                  />
                  <DeleteIcon
                    onClick={() => deleteFoodIngre(task.userIngredientNo)}
                    style={{ cursor: 'pointer' }}
                  />
                </span>
              )}
            </div>
          )}
        </Draggable>
      )}
    </>
  );
};
