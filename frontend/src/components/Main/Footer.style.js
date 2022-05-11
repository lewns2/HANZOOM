import styled from 'styled-components';

const footerBackground = {
  backgroundColor: 'rgb(241, 241, 241)',
  color: '#fff',
};

const MyFooter = styled.div`
  width: 100%;
  height: 240px;
  bordertop: '1px solid rgb(241, 241, 241)';
  backgroundcolor: '#f7c343';
  paddingbottom: '100%';
  color: '#fff';
  @media (max-width: 868px) and (max-width: 991px) {
    height: 410px;
  }
`;

export { footerBackground, MyFooter };
