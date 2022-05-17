import AOS from 'aos';
import 'aos/dist/aos.css';

import './Main.scss';
import { Feature1 } from '../../components/Main/Feature1';
import { Feature2 } from '../../components/Main/Feature2';
import { Feature3 } from '../../components/Main/Feature3';
import { Feature4 } from '../../components/Main/Feature4';
import { Line } from '../../components/Main/Line';
import { Banner } from '../../components/Main/Banner';
import { BestBoard } from '../../components/Main/BestBoard';
import { useEffect } from 'react';

export const Main = () => {
  useEffect(() => {
    AOS.init();
  });
  return (
    <>
      <Banner />
      <div data-aos="fade-left" data-aos-duration="1600">
        <Feature1 />
      </div>
      <Line />
      <div data-aos="fade-right" data-aos-duration="1600">
        <Feature2 />
      </div>
      <Line />
      <div data-aos="fade-left" data-aos-duration="1600">
        <Feature3 />
      </div>
      <Line />
      <div data-aos="fade-right" data-aos-duration="1600">
        <Feature4 />
      </div>
      <BestBoard />
    </>
  );
};
