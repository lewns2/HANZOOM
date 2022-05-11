import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Report } from '../../components/Admin/Report';
import { PendingIngredient } from '../../components/Admin/PendingIngredient';

import './Admin.scss';

export const Admin = () => {
  const [selectedType, setSelectedType] = useState('신고내역');

  const handleChange = (e) => {
    // console.log(e.target.value);
    setSelectedType(e.target.value);
  };

  return (
    <>
      <Container>
        <div className="matchFilterContainer">
          <div className="tabs">
            <input type="radio" id="radio-1" name="tabs" value="신고내역" onChange={handleChange} />
            <label className="tab" htmlFor="radio-1">
              신고내역
            </label>
            <input
              type="radio"
              id="radio-2"
              name="tabs"
              value="식재료요청"
              onChange={handleChange}
            />
            <label className="tab" htmlFor="radio-2">
              식재료 등록 요청
            </label>
            <span className="glider"></span>
          </div>
        </div>
        {selectedType === '신고내역' && <Report />}
        {selectedType === '식재료요청' && <PendingIngredient />}
      </Container>
    </>
  );
};
