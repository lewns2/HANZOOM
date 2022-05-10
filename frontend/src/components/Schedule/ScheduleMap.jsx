import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BASE_IMG_URL } from '../../core/s3';
import { Axios, axios_apis } from '../../core/axios';
import './Schedule.scss';

export const ScheduleMap = (props) => {
  const { otherEmail } = props;
  const { userInfo } = useSelector((state) => state.user);
  const [myImg, setMyImg] = useState(null);
  const [myLat, setMyLat] = useState(null);
  const [myLng, setMyLng] = useState(null);
  // todo : 상대방 위치 정보 받아오기
  const [otherImg, setOtherImg] = useState(null);
  // const [otherLat, setOtherLat] = useState(35.094068611669925);
  // const [otherLng, setOtherLng] = useState(128.85567290875736);
  const [otherLat, setOtherLat] = useState(null);
  const [otherLng, setOtherLng] = useState(null);

  const [middelLat, setMiddleLat] = useState(null);
  const [middelLng, setMiddleLng] = useState(null);

  const [kakaoMap, setKakaoMap] = useState(null);
  const [kakaoMarker, setKakaoMarker] = useState(null);

  const setOtherPosition = () => {
    Axios.get(`${axios_apis.plans.findPosition}?opponentEmail=${otherEmail}`)
      .then((data) => {
        console.log(data.data);
        setOtherLat(data.data.lat);
        setOtherLng(data.data.lng);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const initMap = () => {
    let container = document.getElementById('scheduleMap');

    let options = {
      center: new window.kakao.maps.LatLng(myLat, myLng),
      level: 4,
    };

    // 맵 객체 생성
    let map = new window.kakao.maps.Map(container, options);
    setKakaoMap(map);

    if (props.lat && props.lng) {
      var promiseLoc = new kakao.maps.LatLng(props.lat, props.lng);
      let marker = new kakao.maps.Marker({
        map: map,
        position: promiseLoc,
      });
      setKakaoMarker(marker);
    } else {
      let marker = new kakao.maps.Marker({
        map: map,
      });
      setKakaoMarker(marker);
    }
  };

  const setMarker = () => {
    var myLoc = new kakao.maps.LatLng(myLat, myLng);

    // var imageSrc = `${BASE_IMG_URL}${myImg}`, // 마커이미지의 주소입니다
    //   imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
    //   imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    // var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

    // 커스텀 오버레이
    var myImgUrl;
    if (myImg) {
      myImgUrl = `${BASE_IMG_URL}${myImg}`;
    } else {
      myImgUrl = '/img/basicProfile.png';
    }
    var content = '<img class="userImg" src=' + myImgUrl + '></img>';
    var customOverlay = new kakao.maps.CustomOverlay({
      position: myLoc,
      content: content,
    });
    customOverlay.setMap(kakaoMap);

    var otherLoc = new kakao.maps.LatLng(otherLat, otherLng);
    var otherMarker = new kakao.maps.Marker({
      map: kakaoMap,
      position: otherLoc,
    });

    // if (middelLat && middelLng) kakaoMarker.setPosition(middelLat, middelLng);
    var middleLoc = new kakao.maps.LatLng(middelLat, middelLng);
    console.log(middelLat);
    new kakao.maps.Marker({
      map: kakaoMap,
      position: middleLoc,
    });

    var otherImgUrl;
    if (otherImg) {
      otherImgUrl = `${BASE_IMG_URL}${otherImg}`;
    } else {
      otherImgUrl = '/img/basicProfile.png';
    }
    var content = '<img class="userImg" src=' + otherImgUrl + '></img>';
    var customOverlay = new kakao.maps.CustomOverlay({
      position: otherLoc,
      content: content,
    });
    customOverlay.setMap(kakaoMap);

    // LatLngBounds 객체에 추가된 좌표들을 기준으로 지도의 범위를 재설정합니다
    var bounds = new kakao.maps.LatLngBounds();
    bounds.extend(myLoc).extend(otherLoc);
    kakaoMap.setBounds(bounds);
  };

  // load될 때 이벤트 추가
  const addEventListener = () => {
    // 맵 클릭 이벤트 추가
    kakao.maps.event.addListener(kakaoMap, 'click', (mouseEvent) => {
      mapClickListener(mouseEvent);
    });
  };

  // 맵 클릭 함수
  const mapClickListener = (mouseEvent) => {
    // 클릭한 위도, 경도 정보를 가져옵니다
    var latlng = mouseEvent.latLng;

    // 마커 위치를 클릭한 위치로 옮깁니다
    kakaoMarker.setPosition(latlng);

    let lat = latlng.getLat();
    let lng = latlng.getLng();

    props.setLat(lat);
    props.setLng(lng);
  };

  useEffect(() => {
    setMyImg(userInfo.userImage);
    setMyLat(userInfo.lat);
    setMyLng(userInfo.lng);
    setOtherPosition();
  }, []);

  useEffect(() => {
    initMap();
    // if (myLat && myLng && otherLat && otherLng) {
    //   const newLat1 = (myLat * Math.PI) / 180;
    //   const newLat2 = (otherLat * Math.PI) / 180;
    //   const newLng1 = (myLng * Math.PI) / 180;
    //   const newLng2 = (otherLng * Math.PI) / 180;

    //   const Bx = Math.cos(newLat2) * Math.cos(newLng2 - newLng1);
    //   const By = Math.cos(newLat2) * Math.sin(newLng2 - newLng1);
    //   const newLat3 = Math.atan2(
    //     Math.sin(newLat1) + Math.sin(newLat2),
    //     Math.sqrt((Math.cos(newLat1) + Bx) * (Math.cos(newLat1) + Bx) + By * By),
    //   );
    //   const newLng3 = newLng1 + Math.atan2(By, Math.cos(newLat1) + Bx);

    //   const lat3 = (newLat3 * 180) / Math.PI;
    //   let lng3 = (newLng3 * 180) / Math.PI;

    //   setMiddleLat(lat3);
    //   setMiddleLng(lng3);
    // }
  }, [myLat, myLng, otherLat, otherLng]);

  useEffect(() => {
    if (kakaoMap && kakaoMarker && otherLat && otherLng) {
      setMarker();
      addEventListener();
    }
  }, [kakaoMap]);

  return (
    <>
      <div id="scheduleMap"></div>
    </>
  );
};
