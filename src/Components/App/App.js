import "./App.css";
import { useCallback, useEffect, useState } from "react";
import EMOJI from "./EMOJI.json";
import SearchBar from "../SeaachBar/SerachBar";
import Pagination from "../Pagination/Pagination";
import usePagination from "../Pagination/usePagination";
import ResultSearch from "../ResultSearch/ResultSearch";
function App() {
  const [data, setData] = useState([]);
  const [resultData, setResultData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const PER_PAGE = 10;

  const _DATA = usePagination(resultData, PER_PAGE);
  const loadData = () => {
    setData(EMOJI);
  };
  useEffect(loadData, []);

  const searchChangeInputHandler = useCallback(
    (e) => {
      e.preventDefault();
      const value = e.target.value;
      setSearchValue(value);
      setResultData(
        data.filter(
          (item) => item.keywords.includes(value) || item.title.includes(value)
        )
      );
    },
    [searchValue, resultData, _DATA.currentData]
  );

  const handleChange = (e) => {
    _DATA.jump(e);
  };
  return (
    <div className="App">
      <SearchBar
        search={{ searchValue: searchValue, setSearchValue: setSearchValue }}
        searchChangeInputHandler={searchChangeInputHandler}
      />
      <ResultSearch resultData={_DATA.currentData()} />
      {resultData.length !== 0 && (
        <Pagination
          data={resultData}
          onChange={handleChange}
          prev={_DATA.prev}
          next={_DATA.next}
          count={_DATA.maxPage}
        />
      )}
    </div>
  );
}

export default App;
