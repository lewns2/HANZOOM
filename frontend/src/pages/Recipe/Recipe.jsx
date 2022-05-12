import { useEffect, useState } from 'react';
import { RecipeModal } from '../../components/Recipe/RecipeModal';
import Slider from 'react-slick';
// import { settings } from '../../constants/slider';
import sample from '../../assets/images/Initimage.PNG';
import { display } from '@mui/system';
import { Axios } from '../../core/axios';
import qs from 'qs';
import { useLocation } from 'react-router';
import Lottie from '../../components/Lottie';

const BASE_IMG_URL = 'https://hanzoom-bucket.s3.ap-northeast-2.amazonaws.com/';

import './Recipe.scss';

export const Recipe = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetail, setRecipeDetail] = useState();
  const [isPending, setIsPending] = useState(false);
  const location = useLocation();
  const openModal = (data) => {
    setRecipeDetail(data);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  // const postData = qs.stringify(testData);

  useEffect(() => {
    console.log(location.state);
    Axios.get(`/userIngredient/recipe?ingredients=${location.state}`)
      .then((res) => (setRecipeList(res.data.slice(0, 52)), setIsPending(true), console.log(res)))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {isPending ? (
        <section className="container">
          <RecipeModal open={modalOpen} close={closeModal} info={recipeDetail}></RecipeModal>
          <div style={modalOpen ? { display: 'none' } : { display: 'grid' }}>
            <div className="recipeTextWrap">
              <div className="recipeHeader">
                <div className="recipeTitle">추천 레시피</div>
                <div className="recipeDescription">
                  MY식재료를 바탕으로 만개의 레시피 사이트를 참고하여 추천된 레시피들입니다.
                  솰라솰라 여기 너무 허전해서 페이지 설명이라도 적자는 마인드
                </div>
              </div>
              <div className="recipeListWrap">
                <div className="container recipeContainer">
                  {recipeList.length == 0 ? (
                    <>
                      <p className="recipeNotFound">조건에 만족하는 레시피를 찾지 못했어요</p>
                      <div className="searchNotFound">
                        <SearchNotFoundLottie />
                      </div>
                    </>
                  ) : (
                    <Slider {...settings}>
                      {recipeList.map((content, key) => (
                        <>
                          <div
                            className="recipeContentCard event1"
                            key={content.recipeNo}
                            onClick={() => openModal(content)}>
                            <div className="recipeCardImgWrap" id="imgHoverEvent">
                              <img src={content.imagePath} alt="..." />
                            </div>
                            <div className="hoverBox">
                              <p className="p1">{content.recipeName}</p>
                            </div>
                          </div>
                        </>
                      ))}
                    </Slider>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="container">
          <div className="LoadingWrap">
            <div className="LoadingLottie">
              <LoadingLottie />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

const LoadingLottie = (props) => (
  <Lottie
    {...props}
    data-testid="completeLottie"
    src="https://assets9.lottiefiles.com/packages/lf20_6yhhrbk6.json"
  />
);

const SearchNotFoundLottie = (props) => (
  <Lottie
    {...props}
    data-testid="searchNotFound"
    src="https://assets6.lottiefiles.com/packages/lf20_uqfbsoei.json"
  />
);

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 720,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 320,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
