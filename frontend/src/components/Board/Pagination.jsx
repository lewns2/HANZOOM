import { SwapCallsTwoTone } from '@mui/icons-material';
import { useState, useEffect } from 'react';

export const Pagination = (props) => {
  const [selectedPage, setSelectedPage] = useState(1);

  const showAlert = (status) => {
    switch (status) {
      case 'first':
        swal('페이지가 없어요', '첫번째 페이지입니다', 'error');
        break;
      case 'last':
        swal('페이지가 없어요', '마지막 페이지입니다', 'error');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // console.log(props.totalPage, props.totalElements);
    props.setPage(selectedPage);
  });

  const renderPagiantion = (tot) => {
    const result = [];
    for (let i = 1; i <= tot; i++) {
      result.push(
        <li key={i} className="page-item">
          <a
            className="page-link"
            onClick={() => setSelectedPage(i)}
            aria-current={selectedPage === i ? 'selectedPage' : null}>
            {i}
          </a>
        </li>,
      );
    }
    return result;
  };

  return (
    <div className="paginationWrap d-flex justify-content-center mt-3">
      <nav className="paginationReposive">
        <ul className="pagination">
          <li className="page-item">
            <a
              className="page-link"
              aria-label="Previous"
              onClick={() =>
                selectedPage != 1 ? setSelectedPage(selectedPage - 1) : showAlert('first')
              }>
              <span aria-hidden="true">&lt;</span>
            </a>
          </li>

          {props.totalPage != null ? renderPagiantion(props.totalPage) : null}

          <li className="page-item">
            <a
              className="page-link"
              aria-label="Next"
              onClick={() =>
                selectedPage != props.totalPage
                  ? setSelectedPage(selectedPage + 1)
                  : showAlert('last')
              }>
              <span aria-hidden="true">&gt;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
