import { useEffect, useState } from 'react';
import { SearchBar } from '../../components/Board/SearchBar';
import { Contents } from '../../components/Board/Contents';
import { Pagination } from '../../components/Board/Pagination';
import { ContentCreate } from '../../components/Board/ContentCreate';
import { MyLocation } from '../../components/Board/MyLocation';

import './Board.scss';

export const Board = () => {
  /* 모달을 여닫기 상태를 확인 */
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  /* 버튼 클릭 상태 여부를 확인 */
  const [selectedFilter, setSelectedFilter] = useState('boardNo');
  const [isClickDist, setIsClickDist] = useState(false);
  const [isClickRecent, setIsClickRecent] = useState(false);
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
  // const offset = (page - 1) * limit;
  const [totalPage, setTotalPage] = useState();
  const [totalElements, setTotalElements] = useState();

  /* 검색 내용 */
  const [searchKeyword, setSearchKeyword] = useState('');
  /* 검색 테스트용 */
  useEffect(() => {
    // console.log(searchKeyword);
    setOffset((page - 1) * limit);
    console.log(page, offset);
  }, [searchKeyword, page]);

  return (
    <section className="container mt-1 px-2 py-3">
      <div className="header">
        <h1>게시판</h1>
        <button onClick={openModal}>글쓰기</button>
      </div>

      <SearchBar setSearchKeyword={setSearchKeyword} />

      <ContentCreate open={modalOpen} close={closeModal}></ContentCreate>

      <div className="body row px-4">
        <div className="col-5">
          <MyLocation />
        </div>
        <div className="filter col-3 d-flex justify-content-end">
          <button
            className="col-3 px-1"
            id={isClickDist ? 'selectedFilterBtn' : 'filterBtn'}
            onClick={() => clickButton('dist')}>
            거리순
          </button>
          <button
            className="col-3 px-1"
            id={isClickRecent ? 'selectedFilterBtn' : 'filterBtn'}
            onClick={() => clickButton('recent')}>
            최신순
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
