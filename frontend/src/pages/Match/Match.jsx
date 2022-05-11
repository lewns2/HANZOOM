import { useEffect, useState } from 'react';
import { Loading } from '../../components/Match/Loading';
import { Complete } from '../../components/Match/Complete';
import { Failure } from '../../components/Match/Failure';

import { Axios } from '../../core/axios';
import { useLocation } from 'react-router';

import './Match.scss';

export const Match = () => {
  const location = useLocation();
  const token = sessionStorage.getItem('jwt-token');

  const [isLoading, setIsLoading] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [matchingRes, setMatchingRes] = useState();

  useEffect(() => {
    // console.log(location.state.recipeNo);
    // console.log(location.state.recipeName);
    const handle = setTimeout(() => setIsLoading(false), 8500);
    Axios.get(`userIngredient/recipe/matching?distance=20&recipeNo=${location.state.recipeNo}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(
        (res) => (
          setMatchingRes(res.data),
          res.data.matchingList[0].userIngredientMatchingRes.length != 0
            ? setIsComplete(true)
            : setIsComplete(false)
        ),
      )
      .catch((err) => console.log(err));
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
