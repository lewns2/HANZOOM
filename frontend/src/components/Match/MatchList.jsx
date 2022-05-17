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
import { render } from 'react-dom';

const BASE_IMG_URL = 'https://hanzoom-bucket.s3.ap-northeast-2.amazonaws.com/';

export const MatchList = (props) => {
  const [selectedType, setSelectedType] = useState('나눔');
  const navigate = useNavigate();
  const matchingArr = props.matchArr;

  const handleChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleClick = (num) => {
    console.log(num);
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
          navigate(`/board/${num}`);
          break;

        default:
          break;
      }
    });
  };

  useEffect(() => {}, [selectedType]);

  const renderList = (type) => {
    const shareResult = [];
    const exchangeResult = [];

    for (let i = 0; i < matchingArr.userIngredientMatchingRes.length; i++) {
      var it = matchingArr.userIngredientMatchingRes[i];
      var otherImgUrl;
      if (matchingArr.userIngredientMatchingRes[i].userImage == null) {
        otherImgUrl = '/img/basicProfile.png';
      } else if (matchingArr.userIngredientMatchingRes[i].userImage.includes('kakao')) {
        otherImgUrl = matchingArr.userIngredientMatchingRes[i].userImage;
      } else {
        otherImgUrl = `${BASE_IMG_URL}${matchingArr.userIngredientMatchingRes[i].userImage}`;
      }

      if (it.type == '나눔') {
        shareResult.push(
          <>
            <div key={i} className="matchContentCard">
              <img
                className="matchCardImgWrap"
                src={`${BASE_IMG_URL}${it.imagePath}`}
                onClick={() => handleClick(matchingArr.userIngredientMatchingRes[i].boardNo)}></img>
              <span className="matchImgHover">
                <p> 식재료명 : {it.ingredientName}</p>
                <p>거래 구분 : {it.type}</p>
                <p>나와 떨어진 거리 : {it.distance.toFixed(1)} KM</p>
                <p>구매일 : {it.purchaseDate}</p>
                <p>유통 기한 : {it.expirationDate}</p>
              </span>
              <div className="matchListNickName">
                <img
                  src={otherImgUrl}
                  style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                />
                &nbsp;&nbsp;
                {it.userNickname}
              </div>
            </div>
          </>,
        );
      } else if (it.type == '교환') {
        exchangeResult.push(
          <>
            <div key={i} className="matchContentCard">
              <img
                className="matchCardImgWrap"
                src={`${BASE_IMG_URL}${it.imagePath}`}
                onClick={() => handleClick(matchingArr.userIngredientMatchingRes[i].boardNo)}></img>
              <p>{it.userNickname}</p>
            </div>
          </>,
        );
      }
    }

    if (type == '나눔') return shareResult;
    else if (type == '교환') return exchangeResult;
  };

  var customSetting = {
    ...settings,
    infinite: false,
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

      <div className="matchListWrap">
        <div className="container matchContainer">
          {selectedType == '나눔' ? (
            <Slider {...customSetting}>
              {renderList('나눔').length == 0 ? (
                <p className="notFound">조건에 맞는 유저가 없어요</p>
              ) : (
                renderList('나눔')
              )}
            </Slider>
          ) : (
            <Slider {...customSetting}>
              {renderList('교환').length == 0 ? (
                <p className="notFound">조건에 맞는 유저가 없어요</p>
              ) : (
                renderList('교환')
              )}
            </Slider>
          )}
        </div>
      </div>
    </>
  );
};
