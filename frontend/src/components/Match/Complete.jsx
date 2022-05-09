import { useEffect, useState } from 'react';
import { MatchMap } from './MatchMap';
import { MatchList } from './MatchList';

const test = ['양파', '김치', '두부'];

export const Complete = () => {
  return (
    <section className="container">
      <div className="matchTitle">
        <h2>김치찌개</h2>
        <hr />
      </div>
      <div className="matchIngredients">
        {test.map((ingre, key) => (
          <p key={key}>#{ingre}&nbsp;</p>
        ))}
      </div>
      <div className="matchResultMap">
        <MatchMap />
      </div>
      <div className="matchResultList">
        <MatchList />
      </div>
    </section>
  );
};
