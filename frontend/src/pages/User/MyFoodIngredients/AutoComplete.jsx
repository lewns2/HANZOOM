import { useEffect, useState } from 'react';
import { Axios } from '../../../core/axios';

export const AutoComplete = (props) => {
  const [allIngredient, setAllIngredient] = useState();
  const [keyword, setKeyword] = useState('');
  const [keyList, setKeyList] = useState([]);

  const getIngredient = () => {
    Axios.get('/ingredient/findAll')
      .then((res) => {
        setAllIngredient(res.data);
      })
      .catch((err) => console.log(err));
  };

  // 입력된 텍스트로 data 배열에서 찾아 매칭되는 결과들을 저장
  const onSearch = (text) => {
    var results = allIngredient.filter((item) => true === matchName(item.ingredientName, text));
    console.log(results);
    setKeyList(results);
  };

  // 검색해야할 문자열을 키워드와 비교하여 매칭이 되는지 체크
  const matchName = (name, keyword) => {
    var keyLen = keyword.length;
    name = name.toLowerCase().substring(0, keyLen);
    if (keyword === '') return false;
    return name === keyword.toString().toLowerCase();
  };

  useEffect(() => {
    getIngredient();
  }, []);

  return (
    <>
      <input
        className="form-control"
        type="text"
        placeholder="식재료 명"
        onChange={(event) => {
          props.setNeeds({
            ingredient: event.target.value,
          }),
            onSearch(event.target.value),
            setKeyword(event.target.value);
        }}
        value={keyword}
      />
      {keyList.length !== 0 && (
        <>
          {keyList.map(
            (word, index) =>
              index < 10 && (
                <div
                  key={index}
                  onClick={() => setKeyword(word.ingredientName)}
                  style={{ cursor: 'pointer' }}>
                  {word.ingredientName}
                </div>
              ),
          )}
        </>
      )}
    </>
  );
};
