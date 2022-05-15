import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BASE_IMG_URL } from '../../core/s3';
import { Axios, axios_apis } from '../../core/axios';
import './Schedule.scss';
import { max } from 'moment';
import CloseIcon from '@mui/icons-material/Close';
import swal from 'sweetalert';

export const ScheduleMap = (props) => {
  const { otherEmail, lat, lng } = props;
  const { userInfo, otherImage } = useSelector((state) => state.user);
  const [myImg, setMyImg] = useState(null);
  const [myLat, setMyLat] = useState(null);
  const [myLng, setMyLng] = useState(null);
  // todo : 상대방 위치 정보 받아오기
  const [otherImg, setOtherImg] = useState(null);
  // const [otherLat, setOtherLat] = useState(35.094068611669925);
  // const [otherLng, setOtherLng] = useState(128.85567290875736);
  const [otherLat, setOtherLat] = useState(null);
  const [otherLng, setOtherLng] = useState(null);

  const [middleLat, setMiddleLat] = useState(null);
  const [middleLng, setMiddleLng] = useState(null);
  const [usersRadius, setUsersRadius] = useState(null);

  const [kakaoMap, setKakaoMap] = useState(null);
  const [kakaoMarker, setKakaoMarker] = useState(null);
  const [kakaoInfoWindow, setKakaoInfoWindow] = useState(null);
  const [kakaoCustomOverlay, setKakaoCustomOverlay] = useState(null);

  const [placesService, setPlacesService] = useState(null);

  const [recommendState, setRecommendState] = useState(false);

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

    let infoWindow = new kakao.maps.InfoWindow();
    setKakaoInfoWindow(infoWindow);

    let customOverlay = new kakao.maps.CustomOverlay({ xAnchor: 0.5, yAnchor: 2.1 });
    setKakaoCustomOverlay(customOverlay);

    var imageSrc = 'img/meetIcon.png';
    var imageSize = new kakao.maps.Size(50, 55);
    var imageOption = { offset: new kakao.maps.Point(24, 51) };
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

    if (lat && lng) {
      var promiseLoc = new kakao.maps.LatLng(lat, lng);
      let marker = new kakao.maps.Marker({
        map: map,
        position: promiseLoc,
        image: markerImage,
        zIndex: 1,
      });
      setKakaoMarker(marker);
      map.setCenter(promiseLoc);
    } else {
      let marker = new kakao.maps.Marker({
        map: map,
        image: markerImage,
        zIndex: 1,
      });
      setKakaoMarker(marker);
    }

    var places = new kakao.maps.services.Places();
    setPlacesService(places);
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
      if (myImg.includes('kakao')) {
        myImgUrl = `${myImg}`;
      } else {
        myImgUrl = `${BASE_IMG_URL}${myImg}`;
      }
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
      if (otherImg.includes('kakao')) {
        otherImgUrl = `${otherImg}`;
      } else {
        otherImgUrl = `${BASE_IMG_URL}${otherImg}`;
      }
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

  const handler = (mouseEvent) => {
    mapClickListener(mouseEvent);
  };

  // load될 때 이벤트 추가
  const addEventListener = () => {
    // 맵 클릭 이벤트 추가
    kakao.maps.event.addListener(kakaoMap, 'click', handler);

    let mapEvent = document.getElementById('scheduleMap');
    mapEvent.addEventListener('mousedown', (event) => {
      mapClickListenerSet(event);
    });
  };

  // 장소 상세 정보를 클릭하기 위한 함수
  const mapClickListenerSet = (e) => {
    if (e.target.getAttribute('class') === 'placeUrl') {
      kakao.maps.event.removeListener(kakaoMap, 'click', handler);
    } else {
      kakao.maps.event.addListener(kakaoMap, 'click', handler);
    }
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

    if (!props.lat && !props.lng) {
      const tag1 = document.getElementsByClassName('cafe');
      const tag2 = document.getElementsByClassName('subway');
      if (tag1.length !== 0 && tag2.length !== 0) {
        tag1[0].classList.remove('selected');
        tag2[0].classList.remove('selected');
        kakaoCustomOverlay.setMap(null);
        // kakaoInfoWindow.close();
      }
    }
  };

  // 두 유저 위치의 중간 지점 구하는 함수
  const getMiddleLocation = () => {
    if (myLat && myLng && otherLat && otherLng) {
      const newLat1 = (myLat * Math.PI) / 180;
      const newLat2 = (otherLat * Math.PI) / 180;
      const newLng1 = (myLng * Math.PI) / 180;
      const newLng2 = (otherLng * Math.PI) / 180;

      const Bx = Math.cos(newLat2) * Math.cos(newLng2 - newLng1);
      const By = Math.cos(newLat2) * Math.sin(newLng2 - newLng1);
      const newLat3 = Math.atan2(
        Math.sin(newLat1) + Math.sin(newLat2),
        Math.sqrt((Math.cos(newLat1) + Bx) * (Math.cos(newLat1) + Bx) + By * By),
      );
      const newLng3 = newLng1 + Math.atan2(By, Math.cos(newLat1) + Bx);

      const lat3 = (newLat3 * 180) / Math.PI;
      let lng3 = (newLng3 * 180) / Math.PI;

      setMiddleLat(lat3);
      setMiddleLng(lng3);
    }
  };

  const radians = (degrees) => {
    return (degrees * Math.PI) / 180;
  };
  // 두 유저 거리의 반지름을 구하는 함수
  const getRadius = () => {
    let radius =
      6371 *
      Math.acos(
        Math.cos(radians(myLat)) *
          Math.cos(radians(middleLat)) *
          Math.cos(radians(middleLng) - radians(myLng)) +
          Math.sin(radians(myLat)) * Math.sin(radians(middleLat)),
      );

    radius *= 1000; // 미터로 변환
    setUsersRadius(radius);
  };

  const recommendMiddleLoc = () => {
    kakaoCustomOverlay.setMap(null);
    const tag1 = document.getElementsByClassName('subway');
    tag1[0].classList.remove('selected');
    const tag2 = document.getElementsByClassName('cafe');
    tag2[0].classList.remove('selected');
    const tag3 = document.getElementsByClassName('middleLocation');
    tag3[0].classList.add('selected');

    var middleLoc = new kakao.maps.LatLng(middleLat, middleLng);

    kakaoMarker.setPosition(middleLoc);

    props.setLat(middleLat);
    props.setLng(middleLng);
  };

  // 추천 장소(역) 구하는 함수
  const recommendStation = () => {
    placesService.categorySearch('SW8', recommendCallback, {
      location: new kakao.maps.LatLng(middleLat, middleLng),
    });

    const tag1 = document.getElementsByClassName('subway');
    tag1[0].classList.add('selected');
    const tag2 = document.getElementsByClassName('cafe');
    tag2[0].classList.remove('selected');
    const tag3 = document.getElementsByClassName('middleLocation');
    tag3[0].classList.remove('selected');
  };

  // 추천 장소(카페) 구하는 함수
  const recommendCafe = () => {
    placesService.categorySearch('CE7', recommendCallback, {
      location: new kakao.maps.LatLng(middleLat, middleLng),
    });

    const tag1 = document.getElementsByClassName('cafe');
    tag1[0].classList.add('selected');
    const tag2 = document.getElementsByClassName('subway');
    tag2[0].classList.remove('selected');
    const tag3 = document.getElementsByClassName('middleLocation');
    tag3[0].classList.remove('selected');
  };

  const recommendCallback = (result, status) => {
    if (status === kakao.maps.services.Status.OK) {
      console.log(result);
      var nearPlace = null;

      // 일정 반경에 장소가 있는지, 가장 가까운 장소 구하기
      if (result[0].distance <= usersRadius) nearPlace = result[0];
      for (let i = 1; i < result.length; i++) {
        if (
          result[i].distance <= usersRadius &&
          Number(result[i].distance) < Number(nearPlace.distance)
        ) {
          nearPlace = result[i];
        }
      }

      if (nearPlace === null) {
        swal('근처에 추천 장소가 없습니다.', '  ', 'error', {
          buttons: false,
          timer: 1000,
        });
        return;
      }

      var placeLoc = new kakao.maps.LatLng(nearPlace.y, nearPlace.x);
      var placeName = nearPlace.place_name;
      var placeUrl = nearPlace.place_url;
      var content =
        '<div class="placeInfo"><span class="placeName">' +
        placeName +
        '</span><a class="placeUrl" href="' +
        placeUrl +
        '" target="_blank">상세보기</a></div>';

      kakaoMarker.setPosition(placeLoc);
      kakaoMap.setCenter(placeLoc);

      kakaoCustomOverlay.setPosition(placeLoc);
      kakaoCustomOverlay.setContent(content);
      kakaoCustomOverlay.setMap(kakaoMap);

      // kakaoInfoWindow.setContent(content);
      // kakaoInfoWindow.open(kakaoMap, kakaoMarker);

      props.setLat(nearPlace.y);
      props.setLng(nearPlace.x);
    }
  };

  useEffect(() => {
    setMyImg(userInfo.userImage);
    setMyLat(userInfo.lat);
    setMyLng(userInfo.lng);
    setOtherImg(otherImage);
    if (otherEmail) setOtherPosition();
  }, []);

  useEffect(() => {
    initMap();
    getMiddleLocation();
  }, [myLat, myLng, otherLat, otherLng]);

  useEffect(() => {
    getRadius();
  }, [middleLat, middleLng]);

  useEffect(() => {
    if (kakaoMap && kakaoMarker && otherLat && otherLng) {
      setMarker();
    }
    if (kakaoMap && kakaoMarker) {
      if (props.authority) addEventListener();
    }
  }, [kakaoMap]);

  return (
    <>
      {console.log(otherImage)}

      <div id="scheduleMap">
        {!lat && !lng && (
          <>
            {!recommendState ? (
              <button className="recommendBtn" onClick={() => setRecommendState(true)}>
                장소 추천
              </button>
            ) : (
              <div className="recommendPlace d-flex justify-content-center align-items-center">
                <div className="place middleLocation" onClick={recommendMiddleLoc}>
                  중간 지점
                </div>
                <div className="place subway" onClick={recommendStation}>
                  지하철역
                </div>
                <div id="cafe" className="place cafe" onClick={recommendCafe}>
                  카페
                </div>
                <CloseIcon
                  className="closeIcon"
                  style={{ fontSize: '20px' }}
                  onClick={() => setRecommendState(false)}
                />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};
