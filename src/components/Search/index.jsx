import React from "react";

import { SearchContext } from "../../App";

import style from "./Search.module.scss";
import closeSvg from "../../assets/img/removeTextInput.svg";

function Search() {
  const { searchValue, setSearchValue } = React.useContext(SearchContext);
  const inputRef = React.useRef();

  function onClickSearchClear() {
    setSearchValue("");
    inputRef.current.focus();
  }

  return (
    <div className={style.root}>
      <input
        ref={inputRef}
        className={style.input}
        type="text"
        placeholder="Поиск пиццы..."
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />
      {searchValue && (
        <img
          className={style.remove}
          src={closeSvg}
          alt="remove"
          onClick={onClickSearchClear}
        />
      )}
    </div>
  );
}

export default Search;
