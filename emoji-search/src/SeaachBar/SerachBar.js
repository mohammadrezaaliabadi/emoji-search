import { useCallback, useContext, useState } from "react";
import SearchContext from "../Context/SearchContext";

const SearchBar = ({ searchChangeInputHandler }) => {
  const searchValue = useContext(SearchContext);
  const [searchClassName, setSearchClassName] = useState("");

  const searchIconHandler = useCallback(() => {
    if (searchClassName == "") {
      setSearchClassName("active");
    } else {
      setSearchClassName("");
    }
  }, [searchClassName]);

  const clearHandlerClick = useCallback(
    (e) => {
      e.preventDefault();
      searchValue.search.setSearchValue("");
    },
    [searchValue.search.searchValue]
  );
  return (
    <div className={`search ${searchClassName}`}>
      <div onClick={searchIconHandler} className="icon"></div>
      <div className="input">
        <input
          type="text"
          placeholder="Search"
          onChange={searchChangeInputHandler}
          value={searchValue.search.searchValue}
          className="input-search"
        />
      </div>
      <span onClick={clearHandlerClick} className="clear"></span>
    </div>
  );
};

export default SearchBar;
