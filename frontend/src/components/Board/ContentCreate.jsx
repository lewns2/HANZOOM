import { ConstructionOutlined, ConstructionRounded } from '@mui/icons-material';
import { width } from '@mui/system';
import { useState, useRef, useEffect } from 'react';
import Initimage from '../../assets/images/Initimage.PNG';
import { Calendar } from './Calendar';

export const ContentCreate = (props) => {
    
    /* 모달 여닫기 */
    const { open, close } = props;

    /* 이미지 미리보기 */
    const [uploadImg, setUploadImg] = useState(Initimage);

    const saveUploadImg = (e) => {
        setUploadImg(URL.createObjectURL(e.target.files[0]));
        return setState({...state, img : e});
    };

    const deleteUploadImg = () => {
        URL.revokeObjectURL(uploadImg);
        setUploadImg(Initimage);
    };

    /* 버튼 선택에 따라 거래 종류 바꾸기 */
    const selectedType = (selected) => {
        return setState({...state, tradeType : selected});
    };

    /* 날짜 선택에 따른 기한 변경 */
    const setSelectedDate = (date) => {
        return setState({...state, sellByDate : date});
    };

    /* post 요청 보낼 데이터들 */
    const [state, setState] = useState({
        title : null,
        img : null,
        ingredient : null,
        sellByDate : {year: null, month: null, day: null},
        tradeType : null,
        description : null,
    });

    /* 게시글 등록 */
    const handleSubmit = () => {
        console.log(state);
        const keys = Object.keys(state); // 객체의 key 추출
        let errorKeyword = null;

        keys.map((key) => { 
            if(state[key] == null) {
                errorKeyword = key;
            }
        });

        switch(errorKeyword) {
            case 'title':
                errorKeyword = '제목을 입력해주세요!';
                break;
            case 'img':
                errorKeyword = '이미지를 등록해주세요!';
                break;
            case 'ingredient':
                errorKeyword = '식재료를 선택해주세요!';
                break;
            case 'tradeType':
                errorKeyword = '거래 종류를 선택해주세요!';
                break;
            case 'description':
                errorKeyword = '내용을 입력해주세요!';
                break;
            default:
                break;
        }

        errorKeyword == null ? (alert('게시글이 성공적으로 등록되었습니다. SweetAlert2로 나중에 바꿔야지'), {close}) : alert(`${errorKeyword}`);

        /* 성공했다면, 모달 창 닫기 */

    };


    return(
        <div className={open ? 'content-create-form openModal' : 'content-create-form'}>
            {open ? (
                <>
                <section className="formWrap"> 

                    <h2 className="d-flex justify-content-center mb-4">식재료 등록</h2>
                    
                    <div className="row mb-4">
                        <div className="col-3">제목</div>
                        <div className="col-9">
                            <input className="form-control" type="text" placeholder="제목" 
                                onChange={(e) => {
                                    setState({
                                        ...state,
                                        title : e.target.value,
                                    });
                                }}
                            />
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-3">거래 품목</div>
                        <div className="col-9">
                            <div className="uploadImg">
                                {uploadImg && (<img src={uploadImg} alt="sample" style={{margin:'auto', width:'200px', height:'200px'}}></img>)}
                            </div>
                            <input type="file" className="imgInput" accept="image/*" onChange={saveUploadImg}/>
                            <button onClick={deleteUploadImg}>삭제</button>
                            <button>이미지 촬영</button>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-3">식재료 명</div>
                        <div className="col-9">
                            <input className="form-control" type="text" placeholder="식재료 명" 
                                onChange={(e) => {
                                    setState({
                                        ...state,
                                        ingredient : e.target.value,
                                    });
                                }}
                            />
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-3">구매일/유통기한</div>
                        <div className="col-9">
                            <Calendar setSelectedDate = {setSelectedDate} />
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-3">거래 종류</div>
                        <div className="col-9">
                            <button type="button" className="btn btn-outline-warning" id="tradeTypeBtn1" onClick={ () => selectedType('나눔') }>나눔</button>
                            <button type="button" className="btn btn-outline-warning" id="tradeTypeBtn2" onClick={ () => selectedType('교환') } >교환</button>
                            <button type="button" className="btn btn-outline-warning" id="tradeTypeBtn3" onClick={ () => selectedType('원해요') } >원해요</button>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-3">내용</div>
                        <div className="col-9">
                            <input className="form-control" type="text" placeholder="내용" 
                                onChange={(e) => {
                                    setState({
                                        ...state,
                                        description : e.target.value,
                                    });
                                }}
                            />
                        </div>
                    </div>

                    <div className="d-flex justify-content-center">
                        <button onClick={close} type="button" className="btn btn-outline-warning" id="yellowbtn">취소</button>
                        <button type="submit" className="btn btn-outline-warning" id="yellowbtn" onClick={handleSubmit}>등록</button>
                    </div>

                </section>
                </>
            ) : null}
            
        </div>
    );
};
