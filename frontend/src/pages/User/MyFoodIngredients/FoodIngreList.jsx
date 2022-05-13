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
  const handleNeedsCheck = (checked, name, num) => {
    if (checked) {
      const arr = [...checkedNeeds];
      arr.push({ ingredientName: name, userIngredientNo: num });
      setCheckedNeeds([...arr]);
    } else {
      // 체크 해제
      setCheckedNeeds(checkedNeeds.filter((el) => el.ingredientName !== name));
    }
  };

  // 교환/나눔 식재료 체크
  const handleBSCheck = (checked, name, num) => {
    if (checked) {
      const arr2 = [...checkedBSIngre];
      arr2.push({ ingredientName: name, userIngredientNo: num });
      setCheckedBSIngre([...arr2]);
    } else {
      // 체크 해제
      setCheckedBSIngre(checkedBSIngre.filter((el) => el.ingredientName !== name));
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
        <div className="d-flex align-items-center px-4 py-1">
          <input
            className="me-3"
            type="checkbox"
            onChange={(e) =>
              handleNeedsCheck(e.target.checked, task.ingredientName, task.userIngredientNo)
            }
          />
          {task.boardNo ? (
            <span style={{ color: '#777' }}>{task.ingredientName}</span>
          ) : (
            <>
              {task.ingredientName}
              <span className="ms-auto">
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
              </span>
            </>
          )}
        </div>
      )}
      {(task.type === '일반' || task.type === '교환/나눔') && (
        <Draggable
          draggableId={String(task.userIngredientNo)}
          index={index}
          key={task.userIngredientNo}>
          {(provided, snapshot) => (
            <div
              className="d-flex align-items-center px-4 py-1"

              // isDragging={snapshot.isDragging} // 드래그 중일 때의 스타일링을 위해 snapshot 속성을 외부로 가져옴
            >
              {task.type === '일반' && (
                <input
                  className="me-3"
                  type="checkbox"
                  onChange={(e) => handleCheck(e.target.checked, task.ingredientName)}
                />
              )}
              {task.type === '교환/나눔' && (
                <input
                  className="me-3"
                  type="checkbox"
                  onChange={(e) =>
                    handleBSCheck(e.target.checked, task.ingredientName, task.userIngredientNo)
                  }
                />
              )}

              <span
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}>
                {task.ingredientName}
              </span>

              {task.type === '교환/나눔' ? null : (
                <span className="ms-auto">
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
