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
      <div className="container favoriteList">
        {likeList && (
          <Slider {...settings}>
            {likeList.map((like, index) => (
              <FavoriteListItem key={index} like={like} />
            ))}
          </Slider>
        )}
      </div>
    </>
  );
};
