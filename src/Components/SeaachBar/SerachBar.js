import "./SearchBar.css";
import { useCallback, useState } from "react";

const SearchBar = ({ searchChangeInputHandler, search }) => {
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
      search.setSearchValue("");
    },
    [search]
  );
  return (
    <div className={`search ${searchClassName}`}>
      <div onClick={searchIconHandler} className="icon"></div>
      <div className="input">
        <input
          type="text"
          placeholder="Search"
          onChange={searchChangeInputHandler}
          value={search?.searchValue}
          className="input-search"
        />
      </div>
      <span onClick={clearHandlerClick} className="clear"></span>
    </div>
  );
};

export default SearchBar;
