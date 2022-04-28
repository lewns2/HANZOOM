import { useState, useEffect } from 'react';

export const SearchBar = (props) => {
  const [keyword, setKeyWord] = useState();
  return (
    <div className="searchBar d-flex justify-content-end px-4">
      <input
        className="form-control mx-1"
        id="text-area"
        type="text"
        placeholder="찾으시는 식재료명을 입력해주세요"
        onChange={(e) => {
          setKeyWord(e.target.value);
        }}></input>
      <button id="searchBtn" onClick={() => props.setSearchKeyword(keyword)}>
        검색
      </button>
    </div>
  );
};
