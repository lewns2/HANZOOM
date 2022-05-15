import './BoardCreate.scss';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';

import Initimage from '../../assets/images/Initimage.PNG';
import { Axios } from '../../core/axios';

export const BoardCreate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const [ingredients, setIngredients] = useState([]);

  const setInfo = () => {
    let ingreList = [];
    let noList = [];
    location.state.ingre.map((info) => {
      noList.push(info.userIngredientNo);
      ingreList.push(info.ingredientName);
    });
    setState({ ...state, userIngredientNo: noList });
    setIngredients(ingreList);
  };

  useEffect(() => {
    setInfo();
    if (location.state.type === '필요') {
      setIsNeed(true);
    }
  }, []);
  /* POST 요청 보낼 이미지 */
  const [postImg, setPostImg] = useState();

  /* 이미지 미리보기 */
  const [uploadImg, setUploadImg] = useState(Initimage);

  const saveUploadImg = (e) => {
    setUploadImg(URL.createObjectURL(e.target.files[0]));
    setPostImg(e.target.files[0]);
    return;
  };

  const deleteUploadImg = () => {
    URL.revokeObjectURL(uploadImg);
    setUploadImg(Initimage);
  };

  /* 버튼 선택에 따라 거래 종류 바꾸기 */
  const [isShare, setIsShare] = useState(false);
  const [isExchange, setIsExchange] = useState(false);
  const [isNeed, setIsNeed] = useState(false);
  const selectedType = (selected) => {
    switch (selected) {
      case '나눔':
        setIsShare(true);
        setIsExchange(false);
        setIsNeed(false);
        break;
      case '교환':
        setIsShare(false);
        setIsExchange(true);
        setIsNeed(false);
        break;
      case '필요':
        setIsShare(false);
        setIsExchange(false);
        setIsNeed(true);
        break;
    }

    return setState({ ...state, type: selected });
  };

  /* post 요청 보낼 데이터들 */
  const [state, setState] = useState({
    title: null,
    // 유저의 식재료에 등록된 user_ingredient_no 등록
    userIngredientNo: null,
    type: null,
    description: null,
    // sellByDate: { year: null, month: null, day: null },
  });

  /* 게시글 등록 */
  const handleSubmit = () => {
    // console.log(state);
    const token = sessionStorage.getItem('jwt-token');
    const header = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };
    const formData = new FormData();
    formData.append(
      'key',
      new Blob([JSON.stringify(state)], {
        type: 'application/json',
      }),
    );
    formData.append('file', postImg);

    /* 공란 에러 발생 */
    let errorKeyword = null;
    const keys = Object.keys(state); // 객체의 key 추출
    keys.map((key) => {
      if (state[key] == null) {
        console.log(state[key]);
        errorKeyword = key;
      } else if (uploadImg == Initimage) {
        errorKeyword = 'img';
        console.log(errorKeyword);
      }
    });

    switch (errorKeyword) {
      case 'title':
        errorKeyword = '제목을 입력해주세요!';
        break;
      case 'img':
        errorKeyword = '이미지를 등록해주세요!';
        break;
      case 'type':
        errorKeyword = '거래 종류를 선택해주세요!';
        break;
      case 'description':
        errorKeyword = '내용을 입력해주세요!';
        break;
      default:
        break;
    }

    if ((errorKeyword === '이미지를 등록해주세요!' && isNeed) || errorKeyword === null) {
      console.log(errorKeyword, isNeed);
      Axios.post('/board/register', formData, header)
        .then((res) =>
          swal('등록 성공', '게시글이 성공적으로 등록되었습니다', 'success', {
            buttons: false,
            timer: 1800,
          }).then(navigate('/board')),
        )
        .catch((err) => console.log(err));
    } else {
      console.log(errorKeyword, isNeed);
      swal('등록 실패', `${errorKeyword}`, 'error');
      return;
    }
  };

  const handleCancel = () => {
    swal({
      title: '글 작성을 취소하시겠습니까?',
      text: '변경사항이 저장되지 않을 수 있습니다.',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        navigate(-1);
      } else return;
    });
  };

  return (
    <>
      <section className="container">
        <div className="createFormWrap">
          <h2 className="d-flex justify-content-center mb-4">게시글 등록</h2>

          <div className="row mb-4">
            <div className="col-3">제목</div>
            <div className="col-9">
              <input
                className="form-control"
                type="text"
                placeholder="제목"
                onChange={(e) => {
                  setState({
                    ...state,
                    title: e.target.value,
                  });
                }}
              />
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-3">거래 종류</div>
            <div className="col-9">
              {location.state.type === '교환/나눔' ? (
                <>
                  <button
                    type="button"
                    id={isShare ? 'selectedtradeTypeBtn' : 'tradeTypeBtn'}
                    onClick={() => selectedType('나눔')}>
                    나눔
                  </button>
                  <button
                    type="button"
                    id={isExchange ? 'selectedtradeTypeBtn' : 'tradeTypeBtn'}
                    onClick={() => selectedType('교환')}>
                    교환
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  id={isNeed ? 'selectedtradeTypeBtn' : 'tradeTypeBtn'}
                  onClick={() => selectedType('필요')}>
                  필요
                </button>
              )}
            </div>
          </div>

          <div className="alterImgPlace row mb-4" style={{ display: isNeed ? '' : 'none' }}>
            <div className="col-3"></div>
            <div className="col-9">
              <p>원하시는 식재료에 대해 상세히 기입해주세요 </p>
            </div>
          </div>

          <div className="row mb-4" style={{ display: isNeed ? 'none' : '' }}>
            <div className="col-3">거래 품목</div>
            <div className="col-9">
              <div className="uploadImg">
                {uploadImg && (
                  <img
                    src={uploadImg}
                    alt="sample"
                    style={{ margin: 'auto', width: '200px', height: '200px' }}></img>
                )}
              </div>
              <input type="file" className="imgInput" accept="image/*" onChange={saveUploadImg} />
              <button onClick={deleteUploadImg}>삭제</button>
              <button>이미지 촬영</button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-3">식재료 명</div>
            <div className="col-9">
              <input
                className="form-control"
                type="text"
                placeholder="식재료 명"
                value={ingredients}
                readOnly
              />
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-3">내용</div>
            <div className="col-9">
              <input
                className="form-control"
                type="text"
                placeholder="내용"
                onChange={(e) => {
                  setState({
                    ...state,
                    description: e.target.value,
                  });
                }}
              />
            </div>
          </div>

          <div className="d-flex justify-content-center">
            <button type="button" id="createCancelBtn" onClick={handleCancel}>
              취소
            </button>
            <button type="submit" id="createBtn" onClick={handleSubmit}>
              등록
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
