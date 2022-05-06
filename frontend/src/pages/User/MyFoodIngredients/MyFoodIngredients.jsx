import './MyFoodIngredients.scss';
import { FoodModal } from './FoodModal';
import { useState } from 'react';
import { useEffect } from 'react';
import { Axios } from '../../../core/axios.js';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { FoodIngreList } from './FoodIngreList';
import { DragDropContext } from 'react-beautiful-dnd';
import { MyIngreDnd } from './MyIngreDnd';

export const MyFoodIngredients = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [checkedNeeds, setCheckedNeeds] = useState([]);
  const [myNeedsIngre, setMyNeedsIngre] = useState([]);

  const [state, setState] = useState(false);
  const [info, setInfo] = useState({
    tasks: null,
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'MY 식재료',
        taskIds: [],
      },
      'column-2': {
        id: 'column-2',
        title: '교환 / 나눔',
        taskIds: [],
      },
    },
    columnOrder: ['column-1', 'column-2'],
  });

  const getMyFoodIngre = async () => {
    const token = sessionStorage.getItem('jwt-token');
    let normal = [];
    let bartershare = [];
    let needs = [];
    let obj = {};
    await Axios.get('userIngredient/findAll', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        console.log(res.data);
        res.data.map((ingre) => {
          obj[String(ingre.userIngredientNo)] = ingre;
          if (ingre.type === '일반') {
            normal.push(String(ingre.userIngredientNo));
          } else if (ingre.type === '교환/나눔') {
            bartershare.push(String(ingre.userIngredientNo));
          } else {
            needs.push(ingre);
          }
        });
        await setInfo({
          ...info,
          tasks: obj,
          columns: {
            'column-1': {
              id: 'column-1',
              title: 'MY 식재료',
              taskIds: normal,
            },
            'column-2': {
              id: 'column-2',
              title: '교환 / 나눔',
              taskIds: bartershare,
            },
          },
        });
        setMyNeedsIngre(needs);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getMyFoodIngre();
  }, [state]);
  const getIngre = () => {
    myFoodIngre.map((ingre) => {
      if (ingre.type === '교환' || ingre.type === '나눔') {
        setMyBarterShareIngre([...myBarterShareIngre, ingre]);
      }
    });
  };
  // useEffect(() => {
  //   if (modalOpen === false) {
  //     getMyFoodIngre();
  //   }
  // }, [modalOpen, modalOpen2, state]);

  // 등록모달
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  // 필요모달
  const openModal2 = () => {
    setModalOpen2(true);
  };
  const closeModal2 = () => {
    setModalOpen2(false);
  };

  //수정 요청
  const modifyIngre = (from, expirationDate, ingredientName, purchaseDate, userIngredientNo) => {
    let typeDetail = '';
    if (from === 'MY 식재료') {
      typeDetail = '교환/나눔';
    } else {
      typeDetail = '일반';
    }
    Axios.put('/userIngredient/update', {
      expirationDate: expirationDate,
      ingredientName: ingredientName,
      purchaseDate: purchaseDate,
      type: typeDetail,
      userIngredientNo: userIngredientNo,
    })
      .then((res) => {
        console.log(res);
        setState(!state);
      })
      .catch((err) => {
        alert('MY식재료 수정에 실패하였습니다😓');
        console.log(err);
      });
  };

  const onDragEnd = (result) => {
    // destination이 끝 위치, source가 시작 위치를 의미함
    const { destination, source, draggableId } = result;

    // dnd를 도중에 멈췄으므로(올바른 droppable 위에 두지 않았으므로) 그냥 리턴
    if (!destination) {
      return;
    }

    // 같은 자리에 가져다 두었다면 그냥 리턴
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // 시작한 source의 droppable 위치
    const start = info.columns[source.droppableId];
    const finish = info.columns[destination.droppableId];

    // 한 droppable 내에서 움직이는 로직. 간단함
    if (start === finish) {
      // 새로이 만들어진 해당 컬럼의 task를 array 형태로 반환
      const newTaskIds = Array.from(start.taskIds);

      // 해당 array를 splic해서 새로 넣는 작업
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      // 새로운 컬럼
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      // 기존 state와 새롭게 바뀐 정보를 넣어 새 state로 만듦
      const newState = {
        ...info,
        columns: {
          ...info.columns,
          [newColumn.id]: newColumn,
        },
      };

      setInfo(newState);
      return;
    }

    // 다른 droppable로 옮기기
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...info,
      columns: {
        ...info.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setInfo(newState);
    const userIngredientNo = start.taskIds[source.index];
    const dragIngreInfo = info.tasks[userIngredientNo];
    if (start.title === 'MY 식재료' && finish.title === '교환 / 나눔') {
      modifyIngre(
        start.title,
        dragIngreInfo.expirationDate,
        dragIngreInfo.ingredientName,
        dragIngreInfo.purchaseDate,
        dragIngreInfo.userIngredientNo,
      );
    } else {
      modifyIngre(
        start.title,
        dragIngreInfo.expirationDate,
        dragIngreInfo.ingredientName,
        dragIngreInfo.purchaseDate,
        dragIngreInfo.userIngredientNo,
      );
    }
  };

  return (
    <div className="container">
      <div id="myFoodIngredients">
        <DragDropContext onDragEnd={onDragEnd}>
          {info.tasks ? (
            <div className="d-flex justify-content-around">
              {info.columnOrder.map((columnId, index) => {
                const column = info.columns[columnId];
                const tasks = column.taskIds.map((taskId) => info.tasks[taskId]);

                return (
                  <MyIngreDnd
                    key={column.id}
                    column={column}
                    tasks={tasks}
                    setState={setState}
                    state={state}
                  />
                );
              })}
              <section id="needs" className="col">
                <div className="d-flex justify-content-center headWrap">
                  <h2 className="col-9">필요목록</h2>
                  <button className="addNeeds col-1" onClick={openModal2}>
                    +
                  </button>
                  <FoodModal open={modalOpen2} close={closeModal2} header="필요목록 등록" />
                </div>
                <div className="ingreBody">
                  {myNeedsIngre.map((ingre, key) => (
                    <div key={key}>
                      <FoodIngreList task={ingre} state={state} setState={setState} />
                    </div>
                  ))}
                  <div className="d-flex justify-content-center">
                    <button className="ingreBtn">게시글 등록</button>
                    <button className="ingreBtn">선택 매칭</button>
                  </div>
                </div>
              </section>
            </div>
          ) : null}
        </DragDropContext>
      </div>
    </div>
  );
};
