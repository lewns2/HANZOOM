import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const MatchMap = () => {
  useEffect(() => {
    // 1. 지도 객체 생성
    const container = document.getElementById('matchMap');
    const options = {
      center: new kakao.maps.LatLng(37.56690518860781, 126.97808628226417),
      level: 8,
    };
    const map = new kakao.maps.Map(container, options);
  }, []);

  return (
    <>
      <div id="matchMap" style={{ width: '40vw', height: '70vh' }}></div>
    </>
  );
};
