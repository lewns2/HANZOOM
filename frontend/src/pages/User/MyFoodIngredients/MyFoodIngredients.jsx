import './MyFoodIngredients.scss';
import { FoodModal } from './FoodModal';
import { useState } from 'react';

export const MyFoodIngredients = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);

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
    <div id="myFoodIngredients" className="d-flex justify-content-center">
      <section id="myIngre" className="col">
        <div className="d-flex justify-content-center">
          <h3 className="col-9">MY 식재료</h3>
          <button className="addFood col-1" onClick={openModal}>
            +
          </button>
          <FoodModal open={modalOpen} close={closeModal} header="식재료 등록" />
        </div>
        <div className="ingreBody">
          <p>식재료가 들어가겠지</p>
        </div>
      </section>
      <section id="barterShare" className="col">
        <h3>교환 / 나눔</h3>
        <div className="ingreBody">
          <p>식재료가 들어가겠지</p>
        </div>
      </section>
      <section id="needs" className="col">
        <div className="d-flex justify-content-center">
          <h3 className="col-9">필요목록</h3>
          <button className="addNeeds col-1" onClick={openModal2}>
            +
          </button>
          <FoodModal open={modalOpen2} close={closeModal2} header="필요목록 등록" />
        </div>
        <div className="ingreBody">
          <p>식재료가 들어가겠지</p>
        </div>
      </section>
    </div>
  );
};
