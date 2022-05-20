import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Main.scss';
import { Feature1 } from '../../components/Main/Feature1';
import { Feature2 } from '../../components/Main/Feature2';
import { Feature3 } from '../../components/Main/Feature3';
import { Feature4 } from '../../components/Main/Feature4';
import { Line } from '../../components/Main/Line';
import { Banner } from '../../components/Main/Banner';
import { BestBoard } from '../../components/Main/BestBoard';

export const Main = () => {
  return (
    <>
      <Banner />
      <div className="regualrWrapper">
        <Fade left>
          <Feature1 />
        </Fade>
        <Line />
        <Fade right>
          <Feature2 />
        </Fade>
        <Line />
        <Fade left>
          <Feature3 />
        </Fade>
        <Line />
        <Fade right>
          <Feature4 />
        </Fade>
        <Fade top>
          <BestBoard />
        </Fade>
      </div>
      <div className="mobileWrapper">
        <Zoom>
          <Feature1 />
        </Zoom>
        <Line />
        <Zoom>
          <Feature2 />
        </Zoom>
        <Line />
        <Zoom>
          <Feature3 />
        </Zoom>
        <Line />
        <Zoom>
          <Feature4 />
        </Zoom>
        <Zoom>
          <BestBoard />
        </Zoom>
      </div>
    </>
  );
};
