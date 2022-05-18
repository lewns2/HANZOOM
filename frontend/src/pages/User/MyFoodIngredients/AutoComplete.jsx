import { useEffect, useState } from 'react';
import { Axios } from '../../../core/axios';
import './AutoComplete.scss';

export const AutoComplete = (props) => {
  const [allIngredient, setAllIngredient] = useState();
  const [keyList, setKeyList] = useState([]);
  const [keyword, setKeyword] = useState('');

  const getIngredient = () => {
    Axios.get('/ingredient/findAll')
      .then((res) => {
        setAllIngredient(res.data);
      })
      .catch((err) => console.log(err));
  };

  // 입력된 텍스트로 allIngredient 배열에서 찾아 매칭되는 결과들을 저장
  const onSearch = (text) => {
    var results = allIngredient.filter((item) => true === matchName(item.ingredientName, text));

    setKeyList(results);
  };

  // 검색해야할 문자열을 키워드와 비교하여 매칭이 되는지 체크
  const matchName = (name, keyword) => {
    var keyLen = keyword.length;
    name = name.toLowerCase().substring(0, keyLen);
    if (keyword === '') return false;
    return name === keyword.toString().toLowerCase();
  };

  const [closeContainer, setCloseContainer] = useState(false);

  useEffect(() => {
    getIngredient();
    if (props.header === '필요목록 수정') {
      setKeyword(props.needsName);
    } else if (props.header === '식재료 수정') {
      setKeyword(props.ingreName);
    }
  }, []);
  useEffect(() => {
    if (props.header === '필요목록 등록' || props.header === '필요목록 수정') {
      props.setNeeds({
        ingredient: keyword,
      });
    } else if (props.header === '식재료 등록' || props.header === '식재료 수정') {
      props.setFoods({
        ...props.foods,
        ingredient: keyword,
      });
    }
  }, [keyword]);
  return (
    <>
      <input
        className="form-control"
        type="text"
        placeholder={keyword ? keyword : '식재료 명'}
        onChange={(event) => {
          onSearch(event.target.value), setKeyword(event.target.value), setCloseContainer(false);
        }}
        value={keyword}
      />

      {keyList.length !== 0 && !closeContainer && (
        <div className="autoCompleteContainer">
          {keyList.map((word, index) => (
            <div
              key={index}
              onClick={() => {
                setKeyword(word.ingredientName),
                  onSearch(word.ingredientName),
                  setCloseContainer(true);
              }}
              style={{ cursor: 'pointer' }}>
              {word.ingredientName}
            </div>
          ))}
        </div>
      )}
    </>
  );
};
