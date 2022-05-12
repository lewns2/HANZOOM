import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Slider from 'react-slick';
import { settings } from '../../constants/slider';
import sample from '../../assets/images/need.PNG';
import { RestoreOutlined, SwapCallsTwoTone } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const BASE_IMG_URL = 'https://hanzoom-bucket.s3.ap-northeast-2.amazonaws.com/';

export const MatchList = (props) => {
  const [selectedType, setSelectedType] = useState('나눔');
  const [isMove, setIsMove] = useState(true);
  const navigate = useNavigate();
  const matchingArr = props.matchArr;

  const handleChange = (e) => {
    // console.log(e.target.value);
    setSelectedType(e.target.value);
  };

  const handleClick = (num) => {
    console.log(num);
    setIsMove(true);
    swal('해당 게시글로 이동하시겠습니까?', {
      buttons: {
        cancel: '아니오',
        catch: {
          text: '이동할래요',
          value: 'move',
        },
      },
    }).then((value) => {
      switch (value) {
        case 'move':
          setIsMove(false);
          break;

        default:
          break;
      }
    });
    if (!isMove) {
      navigate(`/board/${num}`);
    }
  };

  useEffect(() => {}, [selectedType]);

  const renderList = (type) => {
    const shareResult = [];
    const exchangeResult = [];

    for (let i = 0; i < matchingArr[0].userIngredientMatchingRes.length; i++) {
      var it = matchingArr[0].userIngredientMatchingRes[i];
      if (it.type == '나눔') {
        shareResult.push(
          <div key={i} className="matchContentCard">
            <div className="matchCardImgWrap">
              <img
                src={`${BASE_IMG_URL}${it.imagePath}`}
                onClick={() => handleClick(it.boardNo)}></img>
            </div>
            <p>{it.userNickname}</p>
          </div>,
        );
      } else if (it.type == '교환') {
        exchangeResult.push(
          <div key={i} className="matchContentCard">
            <div className="matchCardImgWrap">
              <img
                src={`${BASE_IMG_URL}${it.imagePath}`}
                onClick={() => handleClick(it.boardNo)}></img>
            </div>
            <p>{it.userNickname}</p>
          </div>,
        );
      }
    }

    if (type == '나눔') return shareResult;
    else if (type == '교환') return exchangeResult;
  };

  return (
    <>
      <div className="matchFilterContainer">
        <div className="tabs">
          <input type="radio" id="radio-1" name="tabs" value="나눔" onChange={handleChange} />
          <label className="tab" htmlFor="radio-1">
            나눔
          </label>
          <input type="radio" id="radio-2" name="tabs" value="교환" onChange={handleChange} />
          <label className="tab" htmlFor="radio-2">
            교환
          </label>
          <span className="glider"></span>
        </div>
      </div>

      <div className="matchContainer">
        {selectedType == '나눔' ? (
          <Slider {...settings}>
            {renderList('나눔').length == 0 ? (
              <p className="notFound">조건에 맞는 유저가 없어요</p>
            ) : (
              renderList('나눔')
            )}
          </Slider>
        ) : (
          <Slider {...settings}>
            {renderList('교환').length == 0 ? (
              <p className="notFound">조건에 맞는 유저가 없어요</p>
            ) : (
              renderList('교환')
            )}
          </Slider>
        )}
      </div>
    </>
  );
};
