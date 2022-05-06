import { useState } from 'react';
import { BASE_IMG_URL } from '../../../core/s3';
import { useNavigate } from 'react-router';
import { Axios } from '../../../core/axios';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export const FavoriteListItem = (props) => {
  const { like } = props;

  const [likeState, setLikeState] = useState(true);
  const navigate = useNavigate();

  const moveToDetail = () => {
    navigate(`/board/${like.boardNo}`);
  };

  const clickLike = async () => {
    console.log('😀😀');
    const token = sessionStorage.getItem('jwt-token');
    await Axios.post(
      `/board/like/${like.boardNo}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )
      .then(() => {
        setLikeState(!likeState);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="imgBox">
      {console.log(like)}
      <img
        className=""
        src={like.imagePath && `${BASE_IMG_URL}${like.imagePath}`}
        alt=""
        onClick={moveToDetail}
      />
      {likeState ? (
        <FavoriteIcon className="likeIcon" style={{ color: 'red' }} onClick={clickLike} />
      ) : (
        <FavoriteBorderIcon className="likeIcon" onClick={clickLike} />
      )}
    </div>
  );
};
