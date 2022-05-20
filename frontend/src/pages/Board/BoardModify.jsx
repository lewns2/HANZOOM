import { useState, useRef, useEffect } from 'react';
import Initimage from '../../assets/images/Initimage.PNG';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { Axios } from '../../core/axios';

import { Camera } from 'react-camera-pro';

const BASE_IMG_URL = 'https://hanzoom-bucket.s3.ap-northeast-2.amazonaws.com/';

export const BoardModify = () => {
  const location = useLocation();
  const navigate = useNavigate();

  /* POST 요청 보낼 이미지 */
  const [postImg, setPostImg] = useState();

  /* 이미지 미리보기 */
  const [uploadImg, setUploadImg] = useState(BASE_IMG_URL + location.state.imagePath);

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
    title: location.state.title,
    userIngredientNo: location.state.userIngreNo,
    type: location.state.type,
    description: location.state.description,
    boardNo: location.state.boardNo,
    imagePath: location.state.imagePath,
    status: location.state.status,
  });

  /* 게시글 등록 */
  const handleSubmit = () => {
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
    if (postImg != null) {
      formData.append('file', postImg);
    }

    /* 공란 에러 발생 */
    let errorKeyword = null;
    const keys = Object.keys(state); // 객체의 key 추출
    keys.map((key) => {
      if (state[key] == null) {
        errorKeyword = key;
      } else if (uploadImg == Initimage) {
        errorKeyword = 'img';
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
      Axios.put('/board/update', formData, header)
        .then((res) =>
          swal('등록 성공', '게시글이 성공적으로 수정되었습니다', 'success', {
            buttons: false,
            timer: 1800,
          }).then(navigate('/board'), location.reload()),
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

  useEffect(() => {
    if (location.state.type === '교환') {
      setIsExchange(true);
    } else if (location.state.type === '나눔') {
      setIsShare(true);
    } else if (location.state.type === '필요') {
      setIsNeed(true);
    }
  }, []);

  const camera = useRef(null);
  const [cameraState, setCameraState] = useState(false);
  const [numberOfCameras, setNumberOfCameras] = useState(0);

  const cameraTakePhoto = (e) => {
    const dataurl = camera.current.takePhoto();
    setCameraState(false);
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    const file = new File([u8arr], 'camera.jpg', { type: mime });
    setUploadImg(URL.createObjectURL(file));
    setPostImg(file);
  };

  return (
    <>
      <section className="container">
        <div className="createFormWrap">
          <h2 className="d-flex justify-content-center mb-4">게시글 수정</h2>

          <div className="row mb-4">
            <div className="col-3">제목</div>
            <div className="col-9">
              <input
                className="form-control"
                type="text"
                placeholder="제목"
                value={state.title}
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
              {location.state.type === '필요' ? (
                <button
                  type="button"
                  id={isNeed ? 'selectedtradeTypeBtn' : 'tradeTypeBtn'}
                  onClick={() => selectedType('필요')}>
                  필요
                </button>
              ) : (
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
              {cameraState ? (
                <>
                  <div style={{ width: '260px', height: '200px' }}>
                    <Camera
                      ref={camera}
                      aspectRatio={4 / 3}
                      numberOfCamerasCallback={setNumberOfCameras}
                    />
                  </div>
                  <button className="imageSelect" onClick={cameraTakePhoto}>
                    촬영
                  </button>
                  <button
                    className="imageSelect"
                    hidden={numberOfCameras <= 1}
                    onClick={() => {
                      camera.current.switchCamera();
                    }}>
                    전환
                  </button>
                  <button className="imageSelect" onClick={() => setCameraState(false)}>
                    취소
                  </button>
                </>
              ) : (
                <>
                  <div className="uploadImg">
                    {uploadImg && (
                      <img
                        src={uploadImg}
                        alt="sample"
                        style={{ margin: 'auto', width: '200px', height: '200px' }}></img>
                    )}
                  </div>
                  <label className="imageSelect" htmlFor="input-file">
                    이미지 선택
                  </label>
                  <input
                    onChange={saveUploadImg}
                    type="file"
                    id="input-file"
                    style={{ display: 'none' }}></input>
                  <button className="imageSelect" onClick={() => setCameraState(true)}>
                    이미지 촬영
                  </button>
                  <button className="imageSelect" onClick={deleteUploadImg}>
                    삭제
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-3">식재료 명</div>
            <div className="col-9">
              <input
                className="form-control"
                type="text"
                placeholder="식재료 명"
                value={location.state.ingredient}
                readOnly
              />
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-3">내용</div>
            <div className="col-9">
              <textarea
                className="form-control"
                type="text"
                placeholder="내용"
                value={state.description}
                onChange={(e) => {
                  setState({
                    ...state,
                    description: e.target.value,
                  });
                }}
                style={{ height: '100px' }}
              />
            </div>
          </div>

          <div className="d-flex buttonClass">
            <button type="button" id="createCancelBtn" onClick={handleCancel}>
              취소
            </button>
            <button type="submit" id="createBtn" onClick={handleSubmit}>
              수정
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
