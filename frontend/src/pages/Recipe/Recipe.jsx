import { useEffect, useState } from 'react';
import { RecipeModal } from '../../components/Recipe/RecipeModal';
import Slider from 'react-slick';
import { settings } from '../../constants/slider';
import './Recipe.scss';
import sample from '../../assets/images/Initimage.PNG';
import { display } from '@mui/system';

export const Recipe = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="container">
      <RecipeModal open={modalOpen} close={closeModal}></RecipeModal>
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
                {contents.map((content, key) => (
                  <>
                    <div className="imgHoverEvent event1" key={key} onClick={openModal}>
                      <div className="imgWrap">
                        <img className="imgBox" src={content.imagePath} alt="..." />
                      </div>
                      <div className="hoverBox">
                        <p className="p1">{content.recipeName}</p>
                        <p className="p2">{content.recipe[0].description}</p>
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

const contents = [
  {
    imagePath: sample,
    ingredients: [
      {
        name: 'string',
        weight: 'string',
      },
    ],
    recipe: [
      {
        description:
          '돼지고기 항정살 김치찌개 간단하지만 맛있게 끓이는법 (feat.시크릿코인 활용요리)',
        imagePath: 'string',
      },
    ],
    recipeName: '김치찌개',
    recipeNo: 0,
    referenceNo: 0,
  },
  {
    imagePath: sample,
    ingredients: [
      {
        name: 'string',
        weight: 'string',
      },
    ],
    recipe: [
      {
        description: '(집에서 즐기는 술안주) 참치김치전 / 김치전 - 간단 술안주 전 만들기',
        imagePath: 'string',
      },
    ],
    recipeName: '김치전',
    recipeNo: 0,
    referenceNo: 0,
  },
  {
    imagePath: sample,
    ingredients: [
      {
        name: 'string',
        weight: 'string',
      },
    ],
    recipe: [
      {
        description: '(아이밥) 치즈김치밥 김치볶음밥 매워서 못먹는 아이 이 레시피 주목하세요!!',
        imagePath: 'string',
      },
    ],
    recipeName: '치즈김치밥',
    recipeNo: 0,
    referenceNo: 0,
  },
  {
    imagePath: sample,
    ingredients: [
      {
        name: 'string',
        weight: 'string',
      },
    ],
    recipe: [
      {
        description: '김치 볶음밥 완전 새로운 방식!',
        imagePath: 'string',
      },
    ],
    recipeName: '김치볶음밥',
    recipeNo: 0,
    referenceNo: 0,
  },
  {
    imagePath: sample,
    ingredients: [
      {
        name: 'string',
        weight: 'string',
      },
    ],
    recipe: [
      {
        description: 'string',
        imagePath: 'string',
      },
    ],
    recipeName: 'string',
    recipeNo: 0,
    referenceNo: 0,
  },
  {
    imagePath: sample,
    ingredients: [
      {
        name: 'string',
        weight: 'string',
      },
    ],
    recipe: [
      {
        description: 'string',
        imagePath: 'string',
      },
    ],
    recipeName: 'string',
    recipeNo: 0,
    referenceNo: 0,
  },
  {
    imagePath: sample,
    ingredients: [
      {
        name: 'string',
        weight: 'string',
      },
    ],
    recipe: [
      {
        description: 'string',
        imagePath: 'string',
      },
    ],
    recipeName: 'string',
    recipeNo: 0,
    referenceNo: 0,
  },
];
