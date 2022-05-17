import React, { useEffect, useState } from 'react';
import { ScheduleDetailMap } from './ScheduleDetailMap';
import moment from 'moment';
import { Axios } from '../../core/axios';
import { axios_apis } from '../../core/axios';
import { useNavigate } from 'react-router';
import { changeShow } from '../../Reducer/chatSlice';
import { useDispatch, useSelector } from 'react-redux';
import { CalendarAndMap } from './CalendarAndMap';

import swal from 'sweetalert';

export const ScheduleDetail = (props) => {
  const { boardNo } = props;
  const [scheduleInfo, setScheduleInfo] = useState([]);
  const [authority, setAuthority] = useState(false);
  const [myEmail, setMyEmail] = useState('');
  const [address, setAddress] = useState('');

  const [updateState, setUpdateState] = useState(false);
  const [updateSignal, setUpdateSignal] = useState(false);

  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getSchedule = async () => {
    await Axios.get(`${axios_apis.plans.find}/${boardNo}`).then((res) => {
      console.log(res);
      setScheduleInfo(res.data);
    });
  };

  const moveToDetail = () => {
    navigate(`/board/${scheduleInfo.boardNo}`);
    props.show(false); // 일정 상세 조회 모달 숨기기
    dispatch(changeShow(false)); // 채팅창 모달 숨기기
    props.setShow(false); // 채팅 리스트 모달 숨기기
  };

  const token = sessionStorage.getItem('jwt-token');
  // 게시글 작성자가 일정 수정 권한 갖기
  const checkAuthority = () => {
    Axios.get(`board/find/${scheduleInfo.boardNo}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((data) => {
        console.log(data);
        let writer = data.data.userEmail;
        if (myEmail === writer) {
          setAuthority(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removePlan = () => {
    Axios.delete(`${axios_apis.plans.remove}/${scheduleInfo.boardNo}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        swal('일정 취소 완료', '  ', 'success', {
          buttons: false,
          timer: 1000,
        });
        props.show(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const shareKakao = () => {
    const sharedUrl = 'https://k6e103.p.ssafy.io';
    console.log(window.location.href);
    const imgUrl = user.userInfo.userImage;

    const scheduleTitle = scheduleInfo.opponent + '님과의 일정';

    const date = moment(scheduleInfo.scheduleDatetime).format('YYYY년 MM월 DD일 LT');
    const scheduleDescription = '날짜: ' + date + '\n장소: ' + address;
    Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: scheduleTitle,
        description: scheduleDescription,
        imageUrl: '',
        link: {
          webUrl: sharedUrl,
          mobileWebUrl: sharedUrl,
        },
      },
      buttons: [
        {
          title: '한줌 바로가기',
          link: {
            webUrl: sharedUrl,
            mobileWebUrl: sharedUrl,
          },
        },
      ],
    });
  };

  useEffect(() => {
    getSchedule();
    setMyEmail(user.userInfo.userEmail);
    console.log(props);
  }, []);

  useEffect(() => {
    if (scheduleInfo.boardNo) checkAuthority();
  }, [myEmail, scheduleInfo]);

  return (
    <div className="scheduleWrap d-flex align-items-center">
      {console.log(scheduleInfo)}
      {console.log(address)}
      <div className="schedule">
        {!updateState ? (
          <h3 className="text-center">일정 상세정보</h3>
        ) : (
          <h3 className="text-center">일정 수정</h3>
        )}

        <button className="boardButton" onClick={moveToDetail}>
          게시글로 이동
        </button>
        <div
          className={
            !updateState
              ? 'scheduleItems scheduleDetails'
              : 'scheduleItems d-flex justify-content-center align-items-center'
          }>
          {!updateState ? (
            <>
              <div className="text-center mb-2">
                {moment(scheduleInfo.scheduleDatetime).format('YYYY년 MM월 DD일 LT')}
              </div>
              <div className="scheduleDetailMap d-flex justify-content-center">
                {scheduleInfo.lat && scheduleInfo.lng && (
                  <ScheduleDetailMap
                    lat={scheduleInfo.lat}
                    lng={scheduleInfo.lng}
                    setAddress={setAddress}
                  />
                )}
              </div>
            </>
          ) : (
            <>
              <CalendarAndMap
                lat={scheduleInfo.lat}
                lng={scheduleInfo.lng}
                dateTime={scheduleInfo.scheduleDatetime}
                update={updateSignal}
                updateSignal={setUpdateSignal}
                show={props.show}
                boardNo={boardNo}
              />
            </>
          )}
        </div>
        <div className="d-flex justify-content-center" style={{ marginTop: '8px' }}>
          {!updateState ? (
            <>
              <button className="btn cancelBtn" onClick={() => props.show(false)}>
                닫기
              </button>
              <button className="btn removeBtn" onClick={removePlan}>
                일정 취소
              </button>
              {authority && (
                <button className="btn updateBtn" onClick={() => setUpdateState(true)}>
                  일정 수정
                </button>
              )}
              <button className="btn shareBtn" onClick={shareKakao}>
                <img src="img/kakaolink_btn_medium.png" alt="" />
                공유하기
              </button>
            </>
          ) : (
            <>
              <button className="btn cancelBtn" onClick={() => setUpdateState(false)}>
                취소
              </button>
              {authority && (
                <button className="btn updateBtn" onClick={() => setUpdateSignal(true)}>
                  수정 완료
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
