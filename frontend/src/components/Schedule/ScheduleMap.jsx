import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BASE_IMG_URL } from '../../core/s3';
import './Schedule.scss';

export const ScheduleMap = (props) => {
  const { userInfo } = useSelector((state) => state.user);
  const [myImg, setMyImg] = useState(null);
  const [myLat, setMyLat] = useState(null);
  const [myLng, setMyLng] = useState(null);
  // todo : 상대방 위치 정보 받아오기
  const [otherImg, setOtherImg] = useState(null);
  const [otherLat, setOtherLat] = useState(35.094068611669925);
  const [otherLng, setOtherLng] = useState(128.85567290875736);

  const [kakaoMap, setKakaoMap] = useState(null);
  const [kakaoMarker, setKakaoMarker] = useState(null);

  const initMap = () => {
    let container = document.getElementById('scheduleMap');

    let options = {
      center: new window.kakao.maps.LatLng(myLat, myLng),
      level: 4,
    };

    // 맵 객체 생성
    let map = new window.kakao.maps.Map(container, options);
    setKakaoMap(map);

    let marker = new kakao.maps.Marker({
      map: map,
    });
    setKakaoMarker(marker);
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
  }, []);

  useEffect(() => {
    initMap();
  }, [myLat, myLng]);

  useEffect(() => {
    if (kakaoMap) {
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
