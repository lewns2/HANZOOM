import { useEffect, useState } from 'react';
import { MatchMap } from './MatchMap';
import { MatchList } from './MatchList';

const test = ['양파', '김치', '두부'];

export const Complete = (props) => {
  const matchingList = props.res.matchingList;
  const notFound = props.res.notFound;

  const renderIngredient = () => {
    const findIngredient = [];
    for (let i = 0; i < matchingList.length; i++) {
      for (let j = 0; j < matchingList[i].userIngredientMatchingRes.length; j++) {
        var ingre = matchingList[i].userIngredientMatchingRes[0].ingredientName;
        findIngredient.push(<p className="matchTag">#{ingre}</p>);
      }
    }
    return findIngredient;
  };

  /* 매칭리스트 - 토탈 거리, 재료를 가진 유저, 재료 정보 */
  // const totalDistance = matchingList[index].totalDistance;
  // const userIngredientMatchingRes = matchingList[index].userIngredientMatchingRes;

  // userIngredientMatchingRes.boardNo;
  // userIngredientMatchingRes.distance;
  // userIngredientMatchingRes.expirationDate;
  // userIngredientMatchingRes.purchaseDate;
  // userIngredientMatchingRes.ingredientName;
  // userIngredientMatchingRes.lat;
  // userIngredientMatchingRes.lng;
  // userIngredientMatchingRes.type;
  // userIngredientMatchingRes.userEmail;
  // userIngredientMatchingRes.userIngredientNo;
  // userIngredientMatchingRes.userNickname;

  return (
    <section className="container">
      <div className="matchTitle">
        <h2>{props.title}</h2>
        <hr />
      </div>
      <div className="matchMessage">
        <p>총 {matchingList.length}건을 찾았어요!</p>
      </div>
      <div className="matchIngredients">{renderIngredient()}</div>
      <div className="matchResultMap">
        <MatchMap matchArr={matchingList} />
      </div>
      <div className="matchResultList">
        <MatchList matchArr={matchingList} />
      </div>
    </section>
  );
};
