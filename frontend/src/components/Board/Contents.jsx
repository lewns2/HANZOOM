import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import needSample from '../../assets/images/need.PNG';
import { Axios } from '../../core/axios';
import Lottie from '../../components/Lottie';

const BASE_IMG_URL = 'https://hanzoom-bucket.s3.ap-northeast-2.amazonaws.com/';

export const Contents = (props) => {
  const navigate = useNavigate();
  const [contents, setContents] = useState([]);
  const token = sessionStorage.getItem('jwt-token');

  const getBoardList = () => {
    Axios.get(
      `/board/findAll?page=${props.page}&size=8&sort=${props.selectedFilter}%2CDESC&ingredient=${props.searchKeyword}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )
      .then((res) => {
        setContents(res.data.content);
        props.setTotalPage(res.data.totalPages);
        props.setTotalElements(res.data.totalElements);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getBoardList();
  }, []);

  useEffect(() => {
    getBoardList();
  }, [props.page, props.size, props.selectedFilter, props.searchKeyword]);

  const moveToDetail = (num) => {
    navigate(`/board/${num}`);
  };

  return (
    <>
      {contents.length !== 0 || props.searchKeyword.length === 0 ? (
        <section className="contentsContainer">
          {contents.map((content) => (
            <div
              className="contentCard mx-2 mb-3"
              key={content.boardNo}
              onClick={() => moveToDetail(content.boardNo)}>
              {/*  이미지  */}
              <div className="cardImgWrap">
                {content.status === '거래완료' || content.status === '거래중' ? (
                  <span className="status">{content.status}</span>
                ) : null}

                <img
                  src={
                    content.imagePath === 'need.jpg'
                      ? needSample
                      : `${BASE_IMG_URL}${content.imagePath}`
                  }
                  className="cardImg"
                  alt="..."
                  style={content.status === '거래완료' ? { filter: 'brightness(50%)' } : null}
                />
              </div>
              {/* 본문 */}
              <div className="cardBody">
                {/* 제목, 거래 상태 */}
                <div className="cardBodyHeader row">
                  <div className="cardTitle col-8">
                    <p>{content.title}</p>
                  </div>
                  <div className="col-4">
                    <p className="ingreType">{content.type}</p>
                  </div>
                </div>

                {/* 나와의 거리 */}
                {content.distance == null ? (
                  <h6>나와 떨어진 거리 확인을 위해선 위치 정보 설정이 필요합니다.</h6>
                ) : (
                  <p>약 {content.distance.toFixed(1)}km</p>
                )}

                {/* 식재료 명 */}
                <div className="boardIngredientResList">
                  {content.boardFindIngredientResList.length == 0 ? (
                    <p>-</p>
                  ) : (
                    content.boardFindIngredientResList.map((ingre, index) => (
                      <div key={index}>
                        <p className="ingredientname">#{ingre.ingredientName}&nbsp;</p>
                      </div>
                    ))
                  )}
                </div>

                <div className="cardBodyCounts">
                  <p>조회 {content.viewCnt} ∙</p>
                  &nbsp;
                  <p> 관심 {content.likeCnt}</p>
                </div>
              </div>
            </div>
          ))}
        </section>
      ) : (
        <>
          <div className="searchNotFound">
            <SearchNotFoundLottie />
          </div>
          <div className="searchNotFoundText">
            <h4>검색 결과를 찾을 수 없어요</h4>
          </div>
        </>
      )}
    </>
  );
};

const SearchNotFoundLottie = (props) => (
  <Lottie
    {...props}
    data-testid="searchNotFound"
    src="https://assets6.lottiefiles.com/packages/lf20_uqfbsoei.json"
  />
);
