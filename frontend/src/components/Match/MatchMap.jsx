import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import marketimage from '../../assets/images/supermarket.png';

const BASE_IMG_URL = 'https://hanzoom-bucket.s3.ap-northeast-2.amazonaws.com/';

export const MatchMap = (props) => {
  const matchingArr = props.matchArr;
  const { userInfo } = useSelector((state) => state.user);
  const [resMarker, setResMarker] = useState([]);
  const [martMarker, setMartMarker] = useState([]);

  var markerList = [];

  useEffect(() => {
    /*1. 지도 객체 생성*/
    const container = document.getElementById('matchMap');
    const options = {
      center: new kakao.maps.LatLng(userInfo.lat, userInfo.lng),
      level: 8,
    };
    const map = new kakao.maps.Map(container, options);

    /* 2. 내 위치 마커 생성 */

    var myImgUrl;
    if (userInfo.userImage == null) {
      myImgUrl = '/img/basicProfile.png';
    } else {
      myImgUrl = `${BASE_IMG_URL}${userInfo.userImage}`;
    }
    var content = '<img class="userImg" src=' + myImgUrl + '></img>';
    var markerPosition = new kakao.maps.LatLng(userInfo.lat, userInfo.lng);
    var customOverlay = new kakao.maps.CustomOverlay({
      position: markerPosition,
      content: content,
    });
    customOverlay.setMap(map);

    /* 3. 상대방 마커 생성 */

    matchingArr.userIngredientMatchingRes.map((findUser) => {
      var otherImgUrl;
      if (findUser.userImage == 'null') {
        otherImgUrl = '/img/basicProfile.png';
      } else {
        otherImgUrl = `${BASE_IMG_URL}${findUser.userImage}`;
      }

      var content = '<img class="userImg" src=' + otherImgUrl + '></img>';
      var markerPosition = new kakao.maps.LatLng(findUser.lat, findUser.lng);

      var otherMarker = new kakao.maps.Marker({
        position: markerPosition,
        content: `${BASE_IMG_URL}${findUser.userImage}`,
      });

      otherMarker.setMap(map);

      var ingredientImg = BASE_IMG_URL + findUser.imagePath;
      var dist = findUser.distance.toFixed(1);

      var contents = `
        <div class="matchInfo_wrap">
          <div class="matchInfo">
            <div class="title">
              <img class="matchIngredientImg" src=${ingredientImg}>
            </div>

              <div class="matchNickname"> <img class="matchingUserImg" src=${otherImgUrl}>&nbsp;${findUser.userNickname}</div>
            <div class="matchType">거래 구분 : ${findUser.type}</div>
            <div class="matchPurchaseDate">구매일 : ${findUser.purchaseDate}</div>
            <div class="matchExpirationDate">유통 기한 : ${findUser.expirationDate}</div>
            <div class="matchDistance">나와 떨어진 거리 : 약 ${dist} KM</div>
          </div>
        </div>
        `;

      var infoInfowindow = new kakao.maps.CustomOverlay({
        position: markerPosition,
        content: contents, // 인포윈도우에 표시할 내용
      });

      kakao.maps.event.addListener(otherMarker, 'click', function (mouseEvent) {
        infoInfowindow.setMap(map);
      });
      kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
        infoInfowindow.setMap(null);
      });
      // kakao.maps.event.addListener(otherMarker, 'mouseout', function (mouseEvent) {
      //   infowindow.setMap(null);
      // });
    });

    /* 4. 마트 표시 */
    // var imageSrc = marketimage, // 마커이미지의 주소입니다
    //   imageSize = new kakao.maps.Size(45, 50), // 마커이미지의 크기입니다
    //   imageOption = { offset: new kakao.maps.Point(26, 49) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    // // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    // var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

    // // 장소 검색 객체를 생성합니다
    // map.setLevel(3);
    // const ps = new kakao.maps.services.Places(map);

    // ps.categorySearch('MT1', placesSearchCB, { useMapBounds: true });
    // ps.categorySearch('CS2', placesSearchCB, { useMapBounds: true });
    // function placesSearchCB(data, status, pagination) {
    //   if (status === kakao.maps.services.Status.OK) {
    //     for (let i = 0; i < 1; i++) {
    //       displayMarker(data[i]);
    //     }
    //   }
    // }

    // var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    // function displayMarker(place) {
    //   let martMarker = new kakao.maps.Marker({
    //     map: map,
    //     image: markerImage, // 마커이미지 설정
    //     position: new kakao.maps.LatLng(place.y, place.x),
    //   });

    //   var content =
    //     '<div class="placeinfo onClick={onSocialLogin}">' +
    //     '   <a class="title" href="' +
    //     place.place_url +
    //     '" target="_blank" title="' +
    //     place.place_name +
    //     '">' +
    //     place.place_name +
    //     '</a>';

    //   if (place.road_address_name) {
    //     content +=
    //       '    <span class="type">' +
    //       '종류: ' +
    //       place.category_group_name +
    //       '</span>' +
    //       '    <span title="' +
    //       place.road_address_name +
    //       '">' +
    //       place.road_address_name +
    //       '</span>' +
    //       '  <span class="jibun" title="' +
    //       place.address_name +
    //       '">(지번 : ' +
    //       place.address_name +
    //       ')</span>';
    //   } else {
    //     content += '    <span title="' + place.address_name + '">' + place.address_name + '</span>';
    //   }

    //   content +=
    //     '    <span class="tel">' + place.phone + '</span>' + '</div>' + '<div class="after"></div>';

    //   kakao.maps.event.addListener(martMarker, 'click', function () {
    //     infowindow.setContent(content);
    //     infowindow.open(map, martMarker);
    //   });
    //   kakao.maps.event.addListener(map, 'click', function () {
    //     infowindow.close();
    //   });
    // }

    // map.setLevel(8);
  }, [matchingArr]);

  return (
    <>
      <div id="matchMap" style={{ width: '100vw', height: '70vh' }}></div>
    </>
  );
};
