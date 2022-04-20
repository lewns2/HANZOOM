import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { settings } from '../../../constants/slider';

export const FavoriteList = () => {
  return (
    <>
      <div className="container favoriteList">
        <Slider {...settings}>
          <div className="box">test</div>
          <div className="box">test</div>
          <div className="box">test</div>
          <div className="box">test</div>
          <div className="box">test</div>
        </Slider>
      </div>
    </>
  );
};
