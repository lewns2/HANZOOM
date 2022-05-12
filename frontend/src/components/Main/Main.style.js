import styled from 'styled-components';

const BannerWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const FunctionWrapper = styled.div`
  background-color: #2e7d32;
  padding: 60px 0px;
`;

const EffectWrapper = styled.div`
  margin: 50px 0px;
  padding: 20px 0px;
`;

const SubTitle = styled.div`
  margin-bottom: 30px;
  font-size: 30px;
  font-weight: 500;
`;

const SubGreenTitle = styled.div`
  margin-bottom: 30px;
  font-size: 30px;
  font-weight: 500;
  color: #fff;
`;

const BannerImage = styled.img`
  width: 100vw;
  height: auto;
`;

const mainButton = {
  fontSize: 18,
  backgroundColor: '#f7c343',
  color: '#000',
  padding: '18px',
  borderRadius: '8px',
  border: '1px solid #f7c343',
};

const content = {
  fontFamily: 'KOTRA_GOTHIC',
  wordBreak: 'break-all',
};

// Function Component
const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

const number = {
  fontSize: 20,
  // color: '#2b802f',
  fontWeight: 'medium',
};

const Featurejs = styled.div`
  width: 100%;
  height: 500px;
  bordertop: '1px solid rgb(241, 241, 241)';
  backgroundcolor: '#f7c343';
  paddingbottom: '100%';
  color: '#fff';
  @media (max-width: 868px) and (max-width: 991px) {
    height: 410px;
  }
`;
const image = {
  height: 450,
  my: 1,
};
const BoardImage = styled.img`
  @media screen and (max-width: 1244px) {
    width: 278px;
    height: 250px;
  }
  @media screen and (min-width: 1245px) and (max-width: 1560px) {
    width: 200px;
    height: 200px;
  }
  @media screen and (min-width: 1561px) {
    width: 389px;
    height: 310px;
  }
  cursor: pointer;
  border-radius: 15px;
`;
const BestDietWrapper = styled.div`

  width: 100%;
  height: 100%;
  padding: 20px 0;
  margin: 0 auto;
 
  @media screen and (min-width: 1025px) {
    width: 80%;
`;
export {
  BestDietWrapper,
  BoardImage,
  Featurejs,
  BannerWrapper,
  FunctionWrapper,
  EffectWrapper,
  SubTitle,
  SubGreenTitle,
  BannerImage,
  mainButton,
  item,
  number,
  image,
  content,
};
