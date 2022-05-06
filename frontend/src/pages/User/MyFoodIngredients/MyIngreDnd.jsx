import { Droppable } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { FoodIngreList } from './FoodIngreList';
import { FoodModal } from './FoodModal';
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
              <>
                {/* {console.log(task)} */}
                <FoodIngreList
                  key={index}
                  task={task}
                  index={index}
                  state={state}
                  setState={setState}
                  checkedIngre={checkedIngre}
                  setCheckedIngre={setCheckedIngre}
                  checkedBSIngre={checkedBSIngre}
                  setCheckedBSIngre={setCheckedBSIngre}
                />
                {console.log(checkedIngre)}
              </>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {column.title === 'MY 식재료' ? (
        <button className="ingreBtn">
          <Link to={'/recipe'} state={checkedIngre}>
            레시피 추천
          </Link>
        </button>
      ) : (
        <button className="ingreBtn">교환 / 나눔 등록</button>
      )}
    </div>
  );
};
