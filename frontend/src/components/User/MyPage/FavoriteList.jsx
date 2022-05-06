import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { settings } from '../../../constants/slider';
import { useEffect, useState } from 'react';
import { Axios } from '../../../core/axios';
import { axios_apis } from '../../../core/axios';

import { FavoriteListItem } from './FavoriteListItem';

export const FavoriteList = () => {
  const [likeList, setLikeList] = useState();

  const getLikeList = () => {
    const token = sessionStorage.getItem('jwt-token');
    Axios.get(`${axios_apis.users.user}/likeList`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      console.log(res.data);
      setLikeList(res.data);
    });
  };

  useEffect(() => {
    getLikeList();
  }, []);

  return (
    <>
      {console.log(likeList)}
      <div className="container favoriteList">
        {likeList && likeList.length != 0 ? (
          <Slider {...settings}>
            {likeList.map((like, index) => (
              <FavoriteListItem key={index} like={like} />
            ))}
          </Slider>
        ) : (
          <div className="text-center mt-5">찜한 게시글이 없습니다.</div>
        )}
      </div>
    </>
  );
};
