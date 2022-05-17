import { SwapCallsTwoTone } from '@mui/icons-material';
import { createMuiTheme, getDialogActionsUtilityClass } from '@mui/material';
import { handleBreakpoints } from '@mui/system';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import marketimage from '../../assets/images/supermarket.png';

const BASE_IMG_URL = 'https://hanzoom-bucket.s3.ap-northeast-2.amazonaws.com/';

export const MatchMap = (props) => {
  const matchingArr = props.matchArr;
  const martView = props.martView;
  const { userInfo } = useSelector((state) => state.user);
  const [resMarker, setResMarker] = useState([]);
  const [martMarker, setMartMarker] = useState([]);

  const [userLat, setUserLat] = useState(null);
  const [userLng, setUserLng] = useState(null);
  const [userLoc, setUserLoc] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        // 현 위치 정보가 받아와질 때
        function (position) {
          // console.log(position);
          // 실수형으로 형 변환 해 주지 않으면 정확한 자기 위치 안됨
          var lat = parseFloat(position.coords.latitude);
          var lng = parseFloat(position.coords.longitude);
          let locPosition = new kakao.maps.LatLng(lat, lng);
          // console.log('현재 위도 경도' + lat + ' ' + lng);
          setUserLat(lat);
          setUserLng(lng);
          setUserLoc(locPosition);
        },
      );
    } else {
      alert('GPS를 지원하지 않습니다');
    }
  };

  var markerList = [];

  useEffect(() => {
    console.log(matchingArr);
    getLocation();

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

    /* 중복된 위치 갯수 세기 */
    var cnt = new Map();
    for (let i = 0; i < matchingArr.userIngredientMatchingRes.length; i++) {
      var it = matchingArr.userIngredientMatchingRes[i].userEmail;
      if (!cnt.has(it)) {
        cnt.set(it, 1);
      } else {
        var temp = cnt.get(it);
        temp++;
        cnt.delete(it);
        cnt.set(it, temp);
      }
    }

    /* 유저 이메일로 Map 만들기({마커 위치, 인포윈도우 배열}) */
    var viewInfo = new Map();

    /* 유저 위치를 찾기 위한 Map 객체 */
    var userLocation = new Map();

    /* 3. 상대방 마커 생성 */
    matchingArr.userIngredientMatchingRes.map((findUser, index) => {
      var otherImgUrl;
      if (findUser.userImage == null) {
        otherImgUrl = '/img/basicProfile.png';
      } else if (findUser.userImage.includes('kakao')) {
        otherImgUrl = findUser.userImage;
      } else {
        otherImgUrl = `${BASE_IMG_URL}${findUser.userImage}`;
      }

      var content = '<img class="userImg" src=' + otherImgUrl + '></img>';
      var markerPosition = new kakao.maps.LatLng(findUser.lat, findUser.lng);
      var pos = [findUser.lat, findUser.lng];
      userLocation.set(findUser.userEmail, markerPosition);

      var imageSrc = otherImgUrl; // 마커이미지의 주소입니다
      var imageSize = new kakao.maps.Size(40, 40); // 마커이미지의 크기입니다

      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      var otherMarker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });

      otherMarker.setMap(map);

      /* 지도에 동일한 사용자의 게시글이 몇개 있는지 알려주는 인포윈도우 */
      var count = cnt.get(findUser.userEmail);
      var countContents = `
        <div class="matchCount">
          <p>${count}</p>
        </div>
      `;
      var infoCount = new kakao.maps.CustomOverlay({
        position: new kakao.maps.LatLng(findUser.lat, findUser.lng),
        content: countContents,
        xAnchor: -0.4,
        yAnchor: 2.25,
      });
      infoCount.setMap(map);

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
      // 유저 이메일 배열에다가 contents를 쌓아두고 한꺼번에 출력해야함.
      if (!viewInfo.has(findUser.userEmail)) {
        var infoArr = [];
        infoArr.push(contents);
        viewInfo.set(findUser.userEmail, infoArr);
      } else {
        var temp = viewInfo.get(findUser.userEmail);
        temp.push(contents);
        viewInfo.delete(findUser.userEmail);
        viewInfo.set(findUser.userEmail, temp);
      }

      handleInfo(otherMarker);

      // var infoInfowindow = new kakao.maps.CustomOverlay({
      //   position: markerPosition,
      //   content: contents, // 인포윈도우에 표시할 내용
      // });

      // kakao.maps.event.addListener(otherMarker, 'click', function (mouseEvent) {
      //   infoInfowindow.setMap(map);
      // });
      // kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
      //   infoInfowindow.setMap(null);
      // });
      // kakao.maps.event.addListener(otherMarker, 'mouseout', function (mouseEvent) {
      //   infowindow.setMap(null);
      // });
    });

    function handleInfo(mark) {
      /* 인포윈도우 한꺼번에 표시*/
      for (var [key, value] of viewInfo) {
        var InfoPos = userLocation.get(key);

        var infoStr = '';
        for (let i = 0; i < value.length; i++) {
          infoStr += value[i];
        }
        // console.log(infoStr);
        var customContent = `
            <div className="matchWrapWrap" style="display:flex;">
              ${infoStr}
            </div>
          `;

        var infoInfowindow = new kakao.maps.CustomOverlay({
          position: InfoPos,
          content: customContent,
          xAnchor: 0.5,
          yAnchor: 1.1,
        });
        kakao.maps.event.addListener(mark, 'click', function (mouseEvent) {
          infoInfowindow.setMap(map);
        });
        kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
          infoInfowindow.setMap(null);
        });
      }
    }
    // console.log(userLocation.entries());
    // console.log(viewInfo.entries());

    /* 4. 마트 표시 */

    if (martView) {
      if (userLat != null && userLng != null) {
        map.setCenter(new kakao.maps.LatLng(userLat, userLng));

        /* 2. 내 위치 마커 위치 재설정 */

        var myImgUrl;
        if (userInfo.userImage == null) {
          myImgUrl = '/img/basicProfile.png';
        } else {
          myImgUrl = `${BASE_IMG_URL}${userInfo.userImage}`;
        }
        var content = '<img class="userImg" src=' + myImgUrl + '></img>';
        var markerPosition = new kakao.maps.LatLng(userLat, userLng);
        var customOverlay = new kakao.maps.CustomOverlay({
          position: markerPosition,
          content: content,
        });
        customOverlay.setMap(map);

        var imageSrc = marketimage, // 마커이미지의 주소입니다
          imageSize = new kakao.maps.Size(45, 50), // 마커이미지의 크기입니다
          imageOption = { offset: new kakao.maps.Point(26, 49) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

        // 장소 검색 객체를 생성합니다
        map.setLevel(4);
        const ps = new kakao.maps.services.Places(map);

        ps.categorySearch('MT1', placesSearchCB, { useMapBounds: true });
        ps.categorySearch('CS2', placesSearchCB, { useMapBounds: true });
        function placesSearchCB(data, status, pagination) {
          if (status === kakao.maps.services.Status.OK) {
            for (let i = 0; i < 3; i++) {
              displayMarker(data[i]);
            }
          }
        }

        var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

        function displayMarker(place) {
          let martMarker = new kakao.maps.Marker({
            map: map,
            image: markerImage, // 마커이미지 설정
            position: new kakao.maps.LatLng(place.y, place.x),
          });

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
            content +=
              '    <span title="' + place.address_name + '">' + place.address_name + '</span>';
          }

          content +=
            '    <span class="tel">' +
            place.phone +
            '</span>' +
            '</div>' +
            '<div class="after"></div>';

          kakao.maps.event.addListener(martMarker, 'click', function () {
            infowindow.setContent(content);
            infowindow.open(map, martMarker);
          });
          kakao.maps.event.addListener(map, 'click', function () {
            infowindow.close();
          });
        }
      } else {
        swal('위치 설정이 필요합니다');
        props.setChecked(false);
        // console.log('위치 설정이 필요합니다');
        map.setLevel(8);
      }
    }
  }, [matchingArr, martView]);

  return (
    <>
      <div id="matchMap"></div>
    </>
  );
};
