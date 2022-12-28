import React from "react";

import { SearchContext } from "../../App";

import style from "./Search.module.scss";
import closeSvg from "../../assets/img/removeTextInput.svg";

function Search() {
  const { searchValue, setSearchValue } = React.useContext(SearchContext);

  function onClickSearchClear() {
    setSearchValue("");
  }

  return (
    <div className={style.root}>
      <input
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