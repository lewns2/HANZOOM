import './MyFoodIngredients.scss';
import { FoodModal } from './FoodModal';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Axios } from '../../../core/axios.js';
import { FoodIngreList } from './FoodIngreList';
import { DragDropContext } from 'react-beautiful-dnd';
import { MyIngreDnd } from './MyIngreDnd';
import { Col, Row } from 'react-bootstrap';
import Tooltip from '@mui/material/Tooltip';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import swal from 'sweetalert';

export const MyFoodIngredients = () => {
  const [modalOpen2, setModalOpen2] = useState(false);
  const [checkedNeeds, setCheckedNeeds] = useState([]);
  const [myNeedsIngre, setMyNeedsIngre] = useState([]);
  const [boardStatus, setBoardStatus] = useState(true);
  const [myBoard, setMyBoard] = useState([]);

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

  const token = sessionStorage.getItem('jwt-token');
  const getMyFoodIngre = async () => {
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
          } else if (ingre.type === '필요') {
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

  const getMyBoard = () => {
    Axios.get('/userIngredient/board', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        console.log(res.data);
        setMyBoard(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getMyFoodIngre();
    getMyBoard();
  }, [state]);

  // 필요모달
  const openModal2 = () => {
    setModalOpen2(true);
  };
  const closeModal2 = () => {
    setModalOpen2(false);
    setState(!state);
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
        swal('MY식재료 수정에 실패하였습니다😓', '', 'error', {
          buttons: false,
          timer: 2000,
        });
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

  const clickEvent = () => {
    if (!boardStatus) {
      swal('이미 등록된 식재료 입니다.', '다른 식재료를 선택해주세요.', 'error');
    } else {
      swal('식재료를 선택해주세요', '', 'error');
    }
  };
  const navigate = useNavigate();
  const goBoardDetail = (boardNo) => {
    navigate(`/board/${boardNo}`);
  };

  const confirmNeeds = () => {
    var boardsIngre = [];
    var ingreNames = [];
    myBoard.map((item) => {
      if (item.board.type === '필요') {
        boardsIngre.push(item.ingredients);
      }
    });
    checkedNeeds.map((ingre) => ingreNames.push(ingre.ingredientName));
    ingreNames.map((i) => {
      boardsIngre.map((j) => {
        if (j.includes(i)) {
          setBoardStatus(false);
        }
      });
    });
  };
  useEffect(() => {
    confirmNeeds();
  }, [checkedNeeds]);

  const [selectedType, setSelectedType] = useState('교환');
  const handleChange = (e) => {
    setSelectedType(e.target.value);
  };
  useEffect(() => {}, [selectedType]);

  useEffect(() => {
    getMyFoodIngre();
    getMyBoard();
  }, []);

  const RenderType = (props) => {
    const { type } = props;
    const arr = [];
    myBoard.map((item, key) => {
      if (item.board.type === type) {
        arr.push(
          <div key={key} className="d-flex justify-content-center mt-2 ingredients">
            {item.ingredients &&
              item.ingredients.map((ingredient, index) =>
                index === item.ingredients.length - 1 ? (
                  <div
                    key={index}
                    onClick={() => goBoardDetail(item.board.boardNo)}
                    style={{ cursor: 'pointer' }}>
                    {ingredient}
                  </div>
                ) : (
                  <div
                    key={index}
                    onClick={() => goBoardDetail(item.board.boardNo)}
                    style={{ cursor: 'pointer' }}>
                    {ingredient},{' '}
                  </div>
                ),
              )}
          </div>,
        );
      }
    });
    if (arr.length !== 0) {
      return arr;
    } else {
      return (
        <div className="d-flex justify-content-center ingredients mt-2">
          등록된 식재료가 없습니다.
        </div>
      );
    }
  };

  return (
    <div className="container">
      <div id="myFoodIngredients">
        <DragDropContext onDragEnd={onDragEnd}>
          {info.tasks ? (
            <Row>
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
              <Col id="needs">
                <div className="d-flex justify-content-center px-4">
                  <h2>필요목록</h2>

                  <AddCircleIcon className="addNeeds" onClick={openModal2}></AddCircleIcon>
                  <FoodModal
                    open={modalOpen2}
                    close={closeModal2}
                    header="필요목록 등록"
                    state={state}
                    setState={setState}
                  />
                </div>
                <div className="ingreBody">
                  {myNeedsIngre.map((ingre, key) => (
                    <div className="needBody" key={key}>
                      <FoodIngreList
                        task={ingre}
                        state={state}
                        setState={setState}
                        checkedNeeds={checkedNeeds}
                        setCheckedNeeds={setCheckedNeeds}
                      />
                    </div>
                  ))}

                  {checkedNeeds.length ? (
                    <div className="d-flex justify-content-center">
                      {boardStatus ? (
                        <button className="ingreBtn mt-3">
                          <Link to={'/board/write'} state={{ type: '필요', ingre: checkedNeeds }}>
                            게시글 등록
                          </Link>
                        </button>
                      ) : (
                        <button className="ingreBtn mt-3" onClick={clickEvent}>
                          게시글 등록
                        </button>
                      )}

                      <button className="ingreBtn mt-3">
                        <Link to="/match" state={{ type: '선택', matchNeeds: checkedNeeds }}>
                          선택 매칭
                        </Link>
                      </button>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-center">
                      <button className="ingreBtn mt-3" onClick={clickEvent}>
                        게시글 등록
                      </button>
                      <button className="ingreBtn mt-3" onClick={clickEvent}>
                        선택 매칭
                      </button>
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          ) : null}
        </DragDropContext>
      </div>
      <div id="myBoard">
        <div className="d-flex justify-content-center align-items-center">
          <h2>등록된 식재료</h2>
          <Tooltip
            className="ms-2"
            title="식재료를 클릭하면 해당 게시글로 이동합니다."
            placement="right">
            <HelpOutlineRoundedIcon />
          </Tooltip>
        </div>
        <div className="tabsContainer">
          <div className="tabs">
            <input type="radio" id="radio-1" name="tabs" value="교환" onChange={handleChange} />
            <label className="tab" htmlFor="radio-1">
              교환
            </label>
            <input type="radio" id="radio-2" name="tabs" value="나눔" onChange={handleChange} />
            <label className="tab" htmlFor="radio-2">
              나눔
            </label>
            <input type="radio" id="radio-3" name="tabs" value="필요" onChange={handleChange} />
            <label className="tab" htmlFor="radio-3">
              필요
            </label>
            <span className="glider"></span>
          </div>
        </div>

        {myBoard && selectedType === '교환' && <RenderType type="교환" />}
        {myBoard && selectedType === '나눔' && <RenderType type="나눔" />}
        {myBoard && selectedType === '필요' && <RenderType type="필요" />}
      </div>
    </div>
  );
};
