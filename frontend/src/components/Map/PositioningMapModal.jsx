import React, { useState, useEffect } from 'react';

import { Modal } from 'react-bootstrap';
import { PositioningMap } from './PositioningMap';
import './PositioningMapModal.scss';

export const PositioningMapModal = (props) => {
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      style={{ zIndex: '99999', fontFamily: 'GmarketSansBold' }}>
      <Modal.Header closeButton>
        <div>
          <Modal.Title id="contained-modal-title-vcenter " className="modalTitle">
            내 위치 설정
          </Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="modalExplain">타인에게 보여줄 나의 위치를 지도에서 선택해주세요.</div>
        <>
          <PositioningMap />
        </>
      </Modal.Body>
      {/* <Modal.Footer></Modal.Footer> */}
    </Modal>
  );
};
