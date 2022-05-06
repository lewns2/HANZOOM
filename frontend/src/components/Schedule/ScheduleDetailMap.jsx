import { height } from '@mui/system';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BASE_IMG_URL } from '../../core/s3';
import './Schedule.scss';

export const ScheduleDetailMap = (props) => {
  const [promiseLat, setPromiseLat] = useState(null);
  const [promiseLng, setPromiseLng] = useState(null);

  const { lat, lng } = props;

  const initMap = async () => {
    let container = document.getElementById('scheduleDetailMap');
    let options = {
      center: new window.kakao.maps.LatLng(promiseLat, promiseLng),
      level: 4,
    };

    // 맵 객체 생성
    let map = new window.kakao.maps.Map(container, options);

    // 마커 이미지 세팅
    var imageSrc = 'img/promiseLocation.png'; // 마커이미지의 주소입니다
    var imageSize = new kakao.maps.Size(50, 55); // 마커이미지의 크기입니다
    var imageOption = { offset: new kakao.maps.Point(24, 51) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

    var loc = new kakao.maps.LatLng(promiseLat, promiseLng);
    let marker = new kakao.maps.Marker({
      map: map,
      position: loc,
      image: markerImage,
    });

    let infowindow = new kakao.maps.InfoWindow();
    var geocoder = new kakao.maps.services.Geocoder();

    // 해당 위치 주소 표시
    if (promiseLat && promiseLng) {
      await geocoder.coord2Address(promiseLng, promiseLat, (result, status) => {
        console.log(result);
        if (status === kakao.maps.services.Status.OK) {
          // 지번
          var detailAddr = result[0].address.address_name;
          var content = '<div class="bAddr"><div class="adrrName">' + detailAddr + '</div></div>';
          infowindow.setContent(content);
          infowindow.open(map, marker);
        }
      });
    }
  };

  useEffect(() => {
    setPromiseLat(lat);
    setPromiseLng(lng);
  }, []);

  useEffect(() => {
    initMap();
  }, [promiseLat, promiseLng]);

  return (
    <>
      <div id="scheduleDetailMap"></div>
    </>
  );
};
