import { useEffect, useState } from 'react';
import { SearchBar } from '../../components/Board/SearchBar';
import { Contents } from '../../components/Board/Contents';
import { Pagination } from '../../components/Board/Pagination';
import { MyLocation } from '../../components/Board/MyLocation';
import './Board.scss';

export const Board = () => {
  /* 버튼 클릭 상태 여부를 확인 */
  const [selectedFilter, setSelectedFilter] = useState('boardNo');
  const [isClickDist, setIsClickDist] = useState(false);
  const [isClickRecent, setIsClickRecent] = useState(true);
  const [isClickView, setIsClickView] = useState(false);

  const clickButton = (type) => {
    switch (type) {
      case 'dist':
        if (isClickDist) setIsClickDist(false);
        else {
          setSelectedFilter('distance');
          setIsClickDist(true);
          setIsClickRecent(false);
          setIsClickView(false);
        }
        break;

      case 'recent':
        if (isClickRecent) setIsClickRecent(false);
        else {
          setSelectedFilter('boardNo');
          setIsClickDist(false);
          setIsClickRecent(true);
          setIsClickView(false);
        }
        break;

      case 'view':
        if (isClickView) setIsClickView(false);
        else {
          setSelectedFilter('viewCnt');
          setIsClickDist(false);
          setIsClickRecent(false);
          setIsClickView(true);
        }
        break;

      default:
        break;
    }
  };

  /* 조회(페이지네이션) */
  const limit = 5;
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [totalPage, setTotalPage] = useState();
  const [totalElements, setTotalElements] = useState();

  /* 검색 내용 */
  const [searchKeyword, setSearchKeyword] = useState('');
  /* 검색 테스트용 */
  useEffect(() => {
    setOffset((page - 1) * limit);
  }, [searchKeyword, page]);

  return (
    <section className="container mt-1">
      <div className="pageTitle">
        <h1>게시판</h1>
      </div>

      <SearchBar setSearchKeyword={setSearchKeyword} />

      <div className="body row px-4">
        <div className="col-5">
          <MyLocation />
        </div>
        <div className="filter col-3 d-flex justify-content-end">
          <button
            className="col-3 px-1"
            id={isClickRecent ? 'selectedFilterBtn' : 'filterBtn'}
            onClick={() => clickButton('recent')}>
            최신순
          </button>
          <button
            className="col-3 px-1"
            id={isClickDist ? 'selectedFilterBtn' : 'filterBtn'}
            onClick={() => clickButton('dist')}>
            거리순
          </button>
          <button
            className="col-3 px-1"
            id={isClickView ? 'selectedFilterBtn' : 'filterBtn'}
            onClick={() => clickButton('view')}>
            조회순
          </button>
        </div>
      </div>

      <Contents
        page={page}
        size={limit}
        selectedFilter={selectedFilter}
        searchKeyword={searchKeyword}
        setTotalPage={setTotalPage}
        setTotalElements={setTotalElements}
      />

      <Pagination setPage={setPage} totalPage={totalPage} totalElements={totalElements} />
    </section>
  );
};
