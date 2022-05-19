import { useState } from 'react';
import { Axios } from '../../core/axios';

export const MyLocation = () => {
  const [location, setLocation] = useState('X');

  getLocation(setLocation);

  return (
    <>
      <button className="locationBtn px-1">우리동네 : {location}</button>
    </>
  );
};

function getLocation(setLocation) {
  let latitude, long;
  if (navigator.geolocation) {
    // GPS를 지원하면
    navigator.geolocation.getCurrentPosition(
      function (position) {
        latitude = position.coords.latitude;
        long = position.coords.longitude;
        Axios.get(
          `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${long}&y=${latitude}`,
          { headers: { Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_ADDRESS}` } },
        )
          .then((res) => {
            let now = res.data.documents[0].region_3depth_name;
            setLocation(now);
          })
          .catch((e) => console.log(e));
        // return alert('위도 : ' + lat + ' 경도 : ' + long);
      },
      function (error) {
        console.error(error);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity,
      },
    );
  } else {
    alert('GPS를 지원하지 않습니다');
    return;
  }
}
