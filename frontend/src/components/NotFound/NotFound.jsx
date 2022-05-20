import hanzoomImg from '../../assets/images/hanzoomLogo.png';
import './NotFound.scss';

export const NotFound = () => {
  return (
    <div className="container">
      <div className="d-flex justify-content-center align-items-center notFound">
        <img src={hanzoomImg} alt="img" />
        <div className="row">
          <h1 className="row mx-2">404 Not Found</h1>
          <h1 className="row mx-2">페이지를 찾을 수 없습니다.</h1>
        </div>
      </div>
    </div>
  );
};
