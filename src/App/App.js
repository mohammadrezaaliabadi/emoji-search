import "./App.css";
import { useCallback, useEffect, useState } from "react";
import EMOJI from "./EMOJI.json";
import SearchContext from "../Context/SearchContext";
import SearchBar from "../SeaachBar/SerachBar";
function App() {
  const [data, setData] = useState([]);
  const [resultData, setResultData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [pageCounts, setPageCounts] = useState(0);
  const [activePageNumber, setActivePageNumber] = useState(1);

  // const loadData = async () => {
  //   const responseData = await fetch(
  //     "https://github.com/ahfarmer/emoji-search/blob/master/src/emojiList.json"
  //   );
  //   setData(await responseData.json());
  // };
  const loadData = () => {
    setData(EMOJI);
  };
  useEffect(loadData, [data]);

  const searchChangeInputHandler = useCallback(
    (e) => {
      e.preventDefault();
      setSearchValue(e.target.value);
      setResultData(data.filter((item) => item.keywords.includes(searchValue)));
    },
    [searchValue, resultData]
  );

  const calculatePageCounts = useCallback(() => {
    if (resultData.length % 19 > 0) {
      return parseInt(resultData.length / 10 + 1);
    }
    return parseInt(resultData.length / 10);
  }, [resultData]);

  useEffect(() => {
    setPageCounts(calculatePageCounts());
  }, [resultData, calculatePageCounts]);

  const handleClickOnPages = useCallback((pageNumber) => {
    setActivePageNumber(pageNumber);
  }, []);
  const paginationArrowHandler = useCallback(
    (direction) => {
      if (direction) {
        if (activePageNumber < pageCounts)
          setActivePageNumber(activePageNumber + 1);
      } else {
        if (activePageNumber > 1) setActivePageNumber(activePageNumber - 1);
      }
    },
    [activePageNumber, pageCounts]
  );
  return (
    <SearchContext.Provider
      value={{
        search: { searchValue: searchValue, setSearchValue: setSearchValue },
      }}
    >
      <div className="App">
        <SearchBar searchChangeInputHandler={searchChangeInputHandler} />
        <div className="search-result">
          {resultData
            .slice(10 * (activePageNumber - 1), 10 * activePageNumber)
            .map((item) => (
              <div className="search-item">
                <h2>{item.title}</h2>
                <h4>{item.symbol}</h4>
                <p>{item.keywords}</p>
              </div>
            ))}
        </div>
        {resultData.length !== 0 && (
          <ul className="pagination">
            <button
              onClick={paginationArrowHandler.bind(this, false)}
              className="page"
            >
              ◀
            </button>
            {new Array(pageCounts).fill(0).map((item, index) => (
              <button
                onClick={handleClickOnPages.bind(this, index + 1)}
                className="page"
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={paginationArrowHandler.bind(this, true)}
              className="page"
            >
              ▶
            </button>
          </ul>
        )}
      </div>
    </SearchContext.Provider>
  );
}

export default App;
