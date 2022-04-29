import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import sample from '../../assets/images/Initimage.PNG';
import { Axios } from '../../core/axios';
import Lottie from '../../components/Lottie';

const BASE_IMG_URL = 'https://hanzoom-bucket.s3.ap-northeast-2.amazonaws.com/';
export const Contents = (props) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('jwt-token');

  const [totalElements, setTotalElements] = useState(48);
  const [totalPages, setTotalPages] = useState(6);
  const [contents, setContents] = useState([]);

  useEffect(() => {
    Axios.get(
      `/board/findAll?page=${props.page}&size=${props.size}&sort=${props.selectedFilter}%2CDESC&ingredient=${props.searchKeyword}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )
      .then((res) => {
        console.log(`${props.page} 페이지 조회한다!`, res);
        setContents(res.data.content);
        props.setTotalPage(res.data.totalPages);
        props.setTotalElements(res.data.totalElements);
      })
      .catch((err) => console.log(err));
    console.log(props.searchKeyword.length);
  }, [props.page, props.size, props.selectedFilter, props.searchKeyword]);

  const moveToDetail = (num) => {
    navigate(`/board/${num}`);
  };

  return (
    <>
      {contents.length != 0 || props.searchKeyword.length == 0 ? (
        <section className="contentsContainer">
          {contents.map((content, key) => (
            <div
              className="contentCard mx-2 mb-3"
              key={content.boardNo}
              onClick={() => moveToDetail(content.boardNo)}>
              {/*  이미지  */}
              <div className="cardImgWrap">
                <img src={`${BASE_IMG_URL}${content.imagePath}`} className="cardImg" alt="..." />
              </div>
              {/* 본문 */}
              <div className="card-body">
                {/* 제목, 거래 상태 */}
                <div className="cardBodyHeader row">
                  <div className="cardTitle col-8">
                    <p>{content.title}</p>
                  </div>
                  <div className="col-4">
                    <p className="status">{content.status}</p>
                  </div>
                </div>

                {/* 설명 */}
                {/* <div className="contentDescription">{content.description}</div> */}

                {/* 나와의 거리 */}
                <p>약 {content.distance}km</p>

                {/* 식재료 명 */}
                <div className="boardIngredientResList">
                  {content.boardFindIngredientResList.map((ingre, index) => (
                    <div key={index}>
                      <p>#{ingre.ingredientName}&nbsp;</p>
                    </div>
                  ))}
                </div>

                <div className="cardBodyCounts">
                  <p>조회 {content.viewCnt} ∙</p>
                  &nbsp;
                  <p> 관심 {content.likeCnt}</p>
                </div>

                {/* 좋아요 표시 */}
                <div
                  className="likeBtn"
                  style={{ visibility: content.like ? 'visible' : 'hidden' }}>
                  좋아요 버튼
                </div>
              </div>
            </div>
          ))}
        </section>
      ) : (
        <>
          <div className="searchNotFoundText">
            <h4>검색 결과를 찾을 수 없어요</h4>
          </div>
          <div className="searchNotFound">
            <SearchNotFoundLottie />
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
