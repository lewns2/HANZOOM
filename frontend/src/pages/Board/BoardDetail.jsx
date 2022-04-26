import { useState, useEffect } from 'react';
import { Axios } from '../../core/axios';
import { useParams } from 'react-router-dom';

import './BoardDetail.scss';

export const BoardDetail = () => {
  const { id } = useParams();
  const token = localStorage.getItem('jwt-token');
  useEffect(() => {
    Axios.get(`board/find/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1>{id}번 상세페이지</h1>
      <section className="container">
        <div className="detailFormWrap">
          <button>test</button>
        </div>
      </section>
    </>
  );
};
