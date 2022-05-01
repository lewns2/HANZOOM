import './MyFoodIngredients.scss';
import { FoodModal } from './FoodModal';
import { useState } from 'react';
import { useEffect } from 'react';
import { Axios } from '../../../core/axios.js';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const MyFoodIngredients = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [myFoodIngre, setMyFoodIngre] = useState([]);
  const [myBarterShareIngre, setMyBarterShareIngre] = useState([]);

  const getMyFoodIngre = () => {
    const token = sessionStorage.getItem('jwt-token');
    Axios.get('userIngredient/findAll', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        console.log(res.data);
        setMyFoodIngre(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getIngre = () => {
    myFoodIngre.map((ingre) => {
      if (ingre.type === '교환' || ingre.type === '나눔') {
        setMyBarterShareIngre([...myBarterShareIngre, ingre]);
      }
    });
  };
  useEffect(() => {
    if (modalOpen === false) {
      getMyFoodIngre();
    }
  }, [modalOpen, modalOpen2]);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const openModal2 = () => {
    setModalOpen2(true);
  };
  const closeModal2 = () => {
    setModalOpen2(false);
  };

  return (
    <div className="container">
      <div id="myFoodIngredients" className="d-flex justify-content-center">
        <section id="myIngre" className="col">
          <div className="d-flex justify-content-center headWrap">
            <h3 className="col-9">MY 식재료</h3>
            <button className="addFood col-1" onClick={openModal}>
              +
            </button>
            <FoodModal open={modalOpen} close={closeModal} header="식재료 등록" />
          </div>
          <div className="ingreBody">
            {myFoodIngre.map((ingre, key) => (
              <div key={key}>
                {ingre.type === '일반' ? (
                  <div>
                    <input type="checkbox" />
                    {ingre.ingredientName}
                    <EditIcon />
                    <DeleteIcon />
                  </div>
                ) : null}
              </div>
            ))}
            <button className="ingreBtn">레시피 추천</button>
          </div>
        </section>
        <section id="barterShare" className="col">
          <h3 className="headWrap">교환 / 나눔</h3>
          <div className="ingreBody">
            {/* {myBarterShareIngre.map((ingre, key) => (
              <div key={key}>
                {ingre.type === '교환' || ingre.type === '나눔' ? (
                  <div>
                    <input type="checkbox" />
                    {ingre.ingredientName}
                  </div>
                ) : null}
              </div>
            ))} */}
            <button className="ingreBtn">교환 / 나눔 등록</button>
          </div>
        </section>
        <section id="needs" className="col">
          <div className="d-flex justify-content-center headWrap">
            <h3 className="col-9">필요목록</h3>
            <button className="addNeeds col-1" onClick={openModal2}>
              +
            </button>
            <FoodModal open={modalOpen2} close={closeModal2} header="필요목록 등록" />
          </div>
          <div className="ingreBody">
            {myFoodIngre.map((ingre, key) => (
              <div key={key}>
                {ingre.type === '필요' ? (
                  <div>
                    <input type="checkbox" />
                    {ingre.ingredientName}
                    <EditIcon />
                    <DeleteIcon />
                  </div>
                ) : null}
              </div>
            ))}
            <button className="ingreBtn">선택 매칭</button>
          </div>
        </section>
      </div>
    </div>
  );
};
