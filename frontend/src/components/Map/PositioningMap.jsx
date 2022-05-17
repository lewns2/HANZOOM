import { height } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Axios } from '../../core/axios';
import { useDispatch } from 'react-redux';
import { getUserInfo } from '../../Reducer/userSlice';
import './KakaoMap.scss';
import DaumPostcode from 'react-daum-postcode';
import CloseIcon from '@mui/icons-material/Close';
import swal from 'sweetalert';

export const PositioningMap = (props) => {
  const [userLat, setUserLat] = useState(35.094068611669925);
  const [userLng, setUserLng] = useState(128.85567290875736);
  const [userLoc, setUserLoc] = useState(null);

  const [isOpenPost, setIsOpenPost] = useState(false);

  const [kakaoMap, setKakaoMap] = useState(null);
  const [kakaoGeocoder, setKakaoGeocoder] = useState(null);
  const [kakaoMarker, setKakaoMarker] = useState(null);
  const [kakaoInfoWindow, setKakaoInfoWindow] = useState(null);
  const [kakaoCustomOverlay, setKakaoCustomOverlay] = useState(null);

  const dispatch = useDispatch();

  const onCompletePost = async (data) => {
    console.log(data);
    console.log(data.jibunAddress);
    setIsOpenPost(false);
    addrSearch(data.jibunAddress);
  };
  // 유저 위치 정보 업데이트
  const toggle = () => {
    setIsOpenPost(true);
    console.log(isOpenPost);
  };
  const postCodeStyle = {
    display: 'block',
    position: 'relative',
    top: '0%',
    width: '82%',
    height: '370px',
    padding: '0px',
  };

  ///////////////////
  const initMap = () => {
    let container = document.getElementById('map');

    let options = {
      center: new window.kakao.maps.LatLng(userLat, userLng),
      level: 4,
    };

    // 맵 객체 생성
    let map = new window.kakao.maps.Map(container, options);
    setKakaoMap(map);
    // geocoder 객체 생성
    var geocoder = new kakao.maps.services.Geocoder();
    setKakaoGeocoder(geocoder);

    // 마커 객체 생성
    let marker = new kakao.maps.Marker({
      map: map,
    });
    setKakaoMarker(marker);

    //  인포윈도우 객체 생성
    let infowindow = new kakao.maps.InfoWindow();
    setKakaoInfoWindow(infowindow);

    // // 커스텀 오버레이 객체 생성
    // let customOverlay = new kakao.maps.CustomOverlay();
    // setKakaoCustomOverlay(customOverlay);
  };

  // 현재 위치 정보 받아오는 함수
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        // 현 위치 정보가 받아와질 때
        function (position) {
          let lat = position.coords.latitude;
          let lng = position.coords.longitude;
          let locPosition = new kakao.maps.LatLng(lat, lng);
          setUserLat(lat);
          setUserLng(lng);
          setUserLoc(locPosition);
        },
        // 현 위치 정보가 안 받아와질 때
        function () {
          let locPosition = new kakao.maps.LatLng(userLat, userLng);
          setUserLoc(locPosition);
        },
      );
    }
  };

  // 마커 생성 함수
  const initMarkerAndInfoWindow = () => {
    console.log(kakaoMarker);
    kakaoMarker.setPosition(userLoc);

    // 상세 주소 요청
    kakaoGeocoder.coord2Address(userLng, userLat, displayDetailAddr);
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
    // 기존 infowindow 없애기
    kakaoInfoWindow.close();

    // 클릭한 위도, 경도 정보를 가져옵니다
    var latlng = mouseEvent.latLng;

    // 마커 위치를 클릭한 위치로 옮깁니다
    kakaoMarker.setPosition(latlng);

    let lat = latlng.getLat();
    let lng = latlng.getLng();
    setUserLat(lat);
    setUserLng(lng);

    // 상세 주소 요청
    kakaoGeocoder.coord2Address(lng, lat, displayDetailAddr);
  };

  // 상세 주소를 표시하는 함수
  const displayDetailAddr = (result, status) => {
    if (status === kakao.maps.services.Status.OK) {
      // 지번
      var detailAddr = result[0].address.address_name;
      var content = '<div class="bAddr"><div class="adrrName">' + detailAddr + '</div></div>';
      kakaoInfoWindow.setContent(content);
      kakaoInfoWindow.open(kakaoMap, kakaoMarker);

      // // 커스텀 오버레이
      // var content =
      //   '<div class="customoverlay">' + '<span class="title">' + detailAddr + '</span>' + '</div>';
      // var position = kakaoMarker.getPosition();
      // kakaoCustomOverlay.setContent(content);
      // kakaoCustomOverlay.setPosition(position);
      // kakaoCustomOverlay.setMap(kakaoMap);
    }
  };

  // 유저 위치 정보 업데이트
  const updateUserLocInfo = async () => {
    const token = sessionStorage.getItem('jwt-token');
    await Axios.put(
      '/users/update/latAndlng',
      {
        lat: userLat,
        lng: userLng,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then(() => {
        swal('위치 정보가 등록 되었습니다.', '  ', 'success', {
          buttons: false,
          timer: 1800,
        });
        dispatch(getUserInfo());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addrSearch = (data) => {
    kakaoGeocoder.addressSearch(data, function (result, status) {
      // consol.log('들어옴' + searchAddr);
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        // consol.log('들어옴' + searchAddr);
        kakaoInfoWindow.close();

        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        kakaoMarker.setPosition(coords);
        kakaoMap.setCenter(coords);

        let lat = coords.getLat();
        let lng = coords.getLng();
        setUserLat(lat);
        setUserLng(lng);

        // 상세 주소 요청
        kakaoGeocoder.coord2Address(lng, lat, displayDetailAddr);
      } else {
        alert('해당 주소는 없는 주소입니다.');
      }
    });
  };

  const onKeyPress = (e) => {
    if (e.key == 'Enter') {
      addrSearch();
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    initMap();
  }, [userLoc]);

  useEffect(() => {
    if (kakaoMap && kakaoGeocoder && userLoc) {
      addEventListener();
      initMarkerAndInfoWindow();
    }
  }, [kakaoMarker]);

  return (
    <section className="mapWrap">
      <div className="searchInput">
        {isOpenPost ? (
          <span>
            <CloseIcon
              className="closeIcon"
              title="닫기"
              onClick={() => setIsOpenPost(false)}
              style={{ cursor: 'pointer' }}>
              닫기
            </CloseIcon>
            <DaumPostcode
              // className="postCode"
              style={postCodeStyle}
              autoClose
              onComplete={onCompletePost}
            />
          </span>
        ) : (
          <button className="searchButton" onClick={toggle}>
            주소로 검색
          </button>
        )}
      </div>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>

      <div className="d-flex justify-content-end">
        <button className="updateButton" onClick={updateUserLocInfo}>
          선택완료
        </button>
      </div>
    </section>
  );
};
