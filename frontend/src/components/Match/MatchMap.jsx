import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import mylocation from '../../assets/images/mylocation.png';

const BASE_IMG_URL = 'https://hanzoom-bucket.s3.ap-northeast-2.amazonaws.com/';

export const MatchMap = (props) => {
  const matchingArr = props.matchArr;
  const { userInfo } = useSelector((state) => state.user);

  var markerList = [];

  useEffect(() => {
    console.log(matchingArr);
    // 1. 지도 객체 생성
    const container = document.getElementById('matchMap');
    const options = {
      center: new kakao.maps.LatLng(userInfo.lat, userInfo.lng),
      level: 8,
    };
    const map = new kakao.maps.Map(container, options);

    // 2. 내 위치 마커 생성
    var markerPosition = new kakao.maps.LatLng(userInfo.lat, userInfo.lng);
    var marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);

    // 3. 상대방 마커 생성
    matchingArr.map((value) => {
      value.userIngredientMatchingRes.map((findUser) => {
        // console.log(findUser);
        var imgSrc = BASE_IMG_URL + findUser.imagePath;
        console.log(imgSrc);
        var markerPosition = new kakao.maps.LatLng(findUser.lat, findUser.lng);
        var marker = new kakao.maps.Marker({
          position: markerPosition,
        });
        var contents = ` 
                    <style>
                        .wrap {position: absolute;left: 0;bottom: 40px;width: 288px;height: 132px;margin-left: -144px;text-align: left;overflow: hidden;font-size: 12px;font-family: 'Malgun Gothic', dotum, '돋움', sans-serif;line-height: 1.5;}
                        .wrap .info {width: 286px;height: 120px;border-radius: 5px;border-bottom: 2px solid #ccc;border-right: 1px solid #ccc;overflow: hidden;background: #fff;}
                        .wrap .info:nth-child(1) {border: 0;box-shadow: 0px 1px 2px #888;}
                        .info .title {padding: 5px 0 0 10px;height: 30px;background: #eee;border-bottom: 1px solid #ddd;font-size: 18px;font-weight: bold;}
                        .info .body {position: relative;overflow: hidden;}
                        .info .desc {position: relative;margin: 10px 0 0 90px;height: 75px;}
                        .desc .ellipsis {overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
                        .body .img {position: absolute;top: 6px;left: 5px;width: 73px;height: 71px;border: 1px solid #ddd;color: #888;overflow: hidden;}
                        .body .link {color: #5085BB;}
                    </style>
                    <div class="wrap" style="background: #fff">
                        <div class = "info">
                            <div class="title"> 
                            ${findUser.ingredientName}
                            </div>
                        <div>
                        <div class="body">
                            <div class="img">
                            <img src=${imgSrc} width="73" height ="70">
                            </div>
                            <div class="desc">
                            <div class="detail">닉네임 :${findUser.userNickname}</div>
                            <div class="detail">거래 구분 :${findUser.type}</div>
                            <div class="detail">구매일 :${findUser.purchaseDate}</div>
                            <div class="detail">유통기한 :${findUser.expirationDate}</div>
                            <div class="detail">나와 떨어진 거리 :${findUser.distance} KM</div>
                            </div>
                        </div>
                    </div>

                    `;
        var infowindow = new kakao.maps.CustomOverlay({
          position: markerPosition,
          content: contents, // 인포윈도우에 표시할 내용
        });
        (function (marker, infowindow) {
          kakao.maps.event.addListener(marker, 'mouseover', function () {
            infowindow.setMap(map);
          });
          kakao.maps.event.addListener(marker, 'mouseout', function () {
            infowindow.setMap(null);
          });
        })(marker, infowindow);

        marker.setMap(map);
        markerList.push(marker);
      });
    });
  }, []);

  return (
    <>
      <div id="matchMap" style={{ width: '100vw', height: '70vh' }}></div>
    </>
  );
};
