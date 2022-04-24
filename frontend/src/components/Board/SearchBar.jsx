export const SearchBar = () => {
  return (
    <div className="searchBar d-flex justify-content-end px-4">
      <input
        className="form-control mx-1"
        id="text-area"
        type="text"
        placeholder="찾으시는 식재료명을 입력해주세요"></input>
      <button id="searchBtn">검색</button>
    </div>
  );
};
