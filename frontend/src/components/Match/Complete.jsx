import { useEffect, useState } from 'react';
import { MatchMap } from './MatchMap';
import { MatchList } from './MatchList';
import Switch from '@mui/material/Switch';

export const Complete = (props) => {
  const matchingList = props.res.matchingList;
  const notFound = props.res.notFound;

  const [clickCase, setClickCase] = useState(0);
  const [checked, setChecked] = useState(false);
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {}, [clickCase, checked]);

  const renderCase = () => {
    const caseList = [];
    for (let i = 0; i < matchingList.length; i++) {
      caseList.push(
        <button
          className="matchCaseBtn"
          onClick={() => setClickCase(i)}
          aria-current={clickCase == i ? 'matchClickedCaseBtn' : null}>
          {i + 1}
        </button>,
      );
    }
    return caseList;
  };

  const renderDist = () => {
    const findDist = [];
    var totDist = matchingList[clickCase].totalDistance.toFixed(1);
    findDist.push(<p className="matchDist">총 왕복 최단 거리 : 약 {totDist} KM</p>);

    return findDist;
  };

  const renderIngredient = () => {
    const findIngredient = [];
    for (let i = 0; i < matchingList[clickCase].userIngredientMatchingRes.length; i++) {
      var ingre = matchingList[clickCase].userIngredientMatchingRes[i].ingredientName;
      findIngredient.push(<p className="matchTag">#{ingre}</p>);
    }

    for (let i = 0; i < notFound.length; i++) {
      var ingre = notFound[i];
      findIngredient.push(<p className="matchNotTag">#{ingre}</p>);
    }

    return findIngredient;
  };

  return (
    <section className="container matchContainer">
      <div className="matchFormWrap">
        <div className="matchTitle">
          <p>{props.title}</p>
          <hr />
        </div>
        <div className="matchMessage">
          <p>식재료를 얻는 총 {matchingList.length}가지 경우를 찾았어요!</p>
        </div>
        <div>{renderCase()}</div>
        <div>{renderDist()}</div>
        <div className="matchIngredients">
          <div className="matchFindIngredients">{renderIngredient()}</div>
        </div>
        <div className="matchMartView">
          <p>
            {checked ? '마트 숨기기' : '마트 보이기'}
            <Switch {...label} checked={checked} onChange={handleChange} />
          </p>
        </div>
        <div className="matchResultMap">
          <MatchMap matchArr={matchingList[clickCase]} martView={checked} setChecked={setChecked} />
        </div>
        <div className="matchResultList">
          <MatchList matchArr={matchingList[clickCase]} />
        </div>
      </div>
    </section>
  );
};
