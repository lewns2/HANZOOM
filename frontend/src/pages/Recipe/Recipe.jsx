import { useEffect, useState } from 'react';
import { RecipeModal } from '../../components/Recipe/RecipeModal';
import Slider from 'react-slick';
import { settings } from '../../constants/slider';
import sample from '../../assets/images/Initimage.PNG';
import { display } from '@mui/system';
import { Axios } from '../../core/axios';
import qs from 'qs';
import { useLocation } from 'react-router';

const BASE_IMG_URL = 'https://hanzoom-bucket.s3.ap-northeast-2.amazonaws.com/';

import './Recipe.scss';

const query = '추천 레시피 식재료 정보';

export const Recipe = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetail, setRecipeDetail] = useState();
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
    Axios.get(`/userIngredient/recipe?${query}=${location.state}`)
      .then((res) => (setRecipeList(res.data.slice(0, 10)), console.log(res)))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="container">
      <RecipeModal open={modalOpen} close={closeModal} info={recipeDetail}></RecipeModal>
      <div style={modalOpen ? { display: 'none' } : { display: 'grid' }}>
        <div className="recipeTextWrap">
          <div className="recipeHeader">
            <div className="recipeTitle">추천 레시피</div>
            <div className="recipeDescription">
              MY식재료를 바탕으로 만개의 레시피 사이트를 참고하여 추천된 레시피들입니다. 솰라솰라
              여기 너무 허전해서 페이지 설명이라도 적자는 마인드
            </div>
          </div>
          <div className="recipeListWrap">
            <div className="container recipeContainer">
              <Slider {...settings}>
                {recipeList.map((content, key) => (
                  <>
                    <div
                      className="recipeContentCard event1"
                      key={content.recipeNo}
                      onClick={() => openModal(content)}>
                      <div className="recipeCardImgWrap">
                        <div className="imgHoverEvent">
                          <img src={content.imagePath} alt="..." />
                        </div>
                      </div>
                      <div className="hoverBox">
                        <p className="p1">{content.recipeName}</p>
                      </div>
                    </div>
                  </>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
