import { Droppable } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FoodIngreList } from './FoodIngreList';
import { FoodModal } from './FoodModal';
import swal from 'sweetalert';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export const MyIngreDnd = (props) => {
  const { column, tasks, setState, state } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [checkedIngre, setCheckedIngre] = useState([]);
  const [checkedBSIngre, setCheckedBSIngre] = useState([]);

  // console.log(tasks);

  useEffect(() => {
    setCheckedIngre(checkedIngre);
  }, [checkedIngre]);

  // 등록모달
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setState(!state);
  };

  const clickEvent = () => {
    if (checkedIngre.length == 0) {
      swal('식재료를 선택해주세요', '', 'error');
      return;
    }
  };

  const clickEvent2 = () => {
    if (checkedBSIngre.length == 0) {
      swal('식재료를 선택해주세요', '', 'error');
      return;
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2>{column.title}</h2>
        {column.title === 'MY 식재료' ? (
          <Fab
            sx={{
              backgroundColor: '#f7c343',
              height: '10px',
              width: '10px',
              padding: '12px',
              '&:hover': {
                backgroundColor: '#000',
                color: '#f7c343',
              },
            }}
            aria-label="add"
            onClick={openModal}>
            <AddIcon />
          </Fab>
        ) : null}

        <FoodModal open={modalOpen} close={closeModal} header="식재료 등록" />
      </div>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            // isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task, index) => (
              <div key={index}>
                <FoodIngreList
                  task={task}
                  index={index}
                  state={state}
                  setState={setState}
                  checkedIngre={checkedIngre}
                  setCheckedIngre={setCheckedIngre}
                  checkedBSIngre={checkedBSIngre}
                  setCheckedBSIngre={setCheckedBSIngre}
                />
              </div>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {column.title === 'MY 식재료' ? (
        <button className="ingreBtn" onClick={clickEvent}>
          {checkedIngre.length ? (
            <Link to={'/recipe'} state={checkedIngre}>
              레시피 추천
            </Link>
          ) : (
            <div>레시피 추천</div>
          )}
        </button>
      ) : (
        <button className="ingreBtn" onClick={clickEvent2}>
          {checkedBSIngre.length ? (
            <Link to={'/board/write'} state={checkedBSIngre}>
              교환 / 나눔 등록
            </Link>
          ) : (
            <div>교환 / 나눔 등록</div>
          )}
        </button>
      )}
    </div>
  );
};
