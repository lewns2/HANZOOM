import { useEffect, useState } from 'react';
import { Loading } from '../../components/Match/Loading';
import { Complete } from '../../components/Match/Complete';
import { Failure } from '../../components/Match/Failure';

import { Axios } from '../../core/axios';
import { useLocation } from 'react-router';

import './Match.scss';
import { getAccordionDetailsUtilityClass } from '@mui/material';

export const Match = () => {
  const location = useLocation();
  const token = sessionStorage.getItem('jwt-token');

  const [isLoading, setIsLoading] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [matchingRes, setMatchingRes] = useState();
  // const [url, setUrl] = useState();

  const requestData = (url, type) => {
    console.log(url);
    Axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        console.log(res),
          (setMatchingRes(res.data),
          res.data.matchingList[0].userIngredientMatchingRes.length != 0
            ? setIsComplete(true)
            : setIsComplete(false));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log('넘어오는 거', location.state);
    const handle = setTimeout(() => setIsLoading(false), 8500);

    if (location.state.type == '자동') {
      let url = `userIngredient/recipe/matching?distance=20&recipeNo=${location.state.recipeNo}`;
      requestData(url, '자동');
    } else if (location.state.type == '선택') {
      let ingreList = [];
      for (let i = 0; i < location.state.matchNeeds.length; i++) {
        ingreList.push(location.state.matchNeeds[i].ingredientName);
      }
      let url = `userIngredient/matching?distance=20&ingredients=${ingreList}`;
      requestData(url, '선택');
    }
  }, []);

  return (
    <section className="container">
      <div className="matchWrap">
        <div className="matchBody">
          {isLoading ? (
            <Loading isComplete={isComplete} />
          ) : isComplete ? (
            <Complete title={location.state.recipeName} res={matchingRes} />
          ) : (
            <Failure />
          )}
        </div>
      </div>
    </section>
  );
};
