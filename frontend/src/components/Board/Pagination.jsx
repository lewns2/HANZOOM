import { useState, useEffect } from 'react';

export const Pagination = (props) => {
  const [selectedPage, setSelectedPage] = useState(1);

  useEffect(() => {
    // console.log(props.totalPage, props.totalElements);
    props.setPage(selectedPage);
  });

  const renderPagiantion = (tot) => {
    const result = [];
    for (let i = 1; i <= tot; i++) {
      result.push(
        <li key={i} className="page-item">
          <a className="page-link" onClick={() => setSelectedPage(i)}>
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
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>

          {props.totalPage != null ? renderPagiantion(props.totalPage) : null}

          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
