import React, { useEffect, useState } from 'react';
import './KakaoMap.scss';
import marketimage from '../../assets/images/supermarket.png';
import mylocation from '../../assets/images/mylocation.png';
const { kakao } = window;
export const NearbyMartMap = () => {
  const [userLat, setUserLat] = useState(36.19318389301);
  const [userLng, setUserLng] = useState(129.014529045975);
  const [userLoc, setUserLoc] = useState(null);

  const myLocationInfo = (map) => {
    var user_imageSrc = mylocation, // 마커이미지의 주소입니다
      imageSize = new kakao.maps.Size(64, 60), // 마커이미지의 크기입니다
      imageOption = { offset: new kakao.maps.Point(26, 49) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    var user_markerImage = new kakao.maps.MarkerImage(user_imageSrc, imageSize, imageOption);
    // 자신의 위치 마커를 생성합니다
    let user_marker = new kakao.maps.Marker({
      position: userLoc, // 자신의 위치 마커가 표시될 위치입니다
      image: user_markerImage, // 마커이미지 설정
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    user_marker.setMap(map);
  };
  // 20km 반경
  const getMartInfo = async () => {
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    var markers = [];
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(userLat, userLng),
      level: 5,
    };

    // 지도를 생성
    var map = new kakao.maps.Map(container, options);

    myLocationInfo(map); //  자기 현재 위치 마커 표시 부분

    var imageSrc = marketimage, // 마커이미지의 주소입니다
      imageSize = new kakao.maps.Size(45, 50), // 마커이미지의 크기입니다
      imageOption = { offset: new kakao.maps.Point(26, 49) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

    // 장소 검색 객체를 생성합니다
    const ps = new kakao.maps.services.Places(map);

    ps.categorySearch('MT1', placesSearchCB, { useMapBounds: true });
    ps.categorySearch('CS2', placesSearchCB, { useMapBounds: true });
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
        }
      }
    }

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        image: markerImage, // 마커이미지 설정
        position: new kakao.maps.LatLng(place.y, place.x),
      });
      //   console.log(marker);
      var content =
        '<div class="placeinfo onClick={onSocialLogin}">' +
        '   <a class="title" href="' +
        place.place_url +
        '" target="_blank" title="' +
        place.place_name +
        '">' +
        place.place_name +
        '</a>';

      if (place.road_address_name) {
        content +=
          '    <span class="type">' +
          '종류: ' +
          place.category_group_name +
          '</span>' +
          '    <span title="' +
          place.road_address_name +
          '">' +
          place.road_address_name +
          '</span>' +
          '  <span class="jibun" title="' +
          place.address_name +
          '">(지번 : ' +
          place.address_name +
          ')</span>';
      } else {
        content += '    <span title="' + place.address_name + '">' + place.address_name + '</span>';
      }

      content +=
        '    <span class="tel">' + place.phone + '</span>' + '</div>' + '<div class="after"></div>';

      kakao.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(content);
        console.log(marker);
        infowindow.open(map, marker);
      });
    }
  };

  // 현재 위치 정보 받아오는 함수
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        // 현 위치 정보가 받아와질 때
        function (position) {
          console.log(position);
          // 실수형으로 형 변환 해 주지 않으면 정확한 자기 위치 안됨
          var lat = parseFloat(position.coords.latitude);
          var lng = parseFloat(position.coords.longitude);
          let locPosition = new kakao.maps.LatLng(lat, lng);
          console.log('현재 위도 경도' + lat + ' ' + lng);
          setUserLat(lat);
          setUserLng(lng);
          setUserLoc(locPosition);
        },
      );
    } else {
      alert('GPS를 지원하지 않습니다');
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    getMartInfo();
  }, [userLat, userLng]);

  return (
    <div>
      <div
        id="myMap"
        style={{
          width: '100%',
          height: '1100px',
        }}></div>
    </div>
  );
};
