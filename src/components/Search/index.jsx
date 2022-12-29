import React from "react";
import debounce from "lodash.debounce";
import { SearchContext } from "../../App";

import style from "./Search.module.scss";
import closeSvg from "../../assets/img/removeTextInput.svg";

function Search() {
  const [value, setValue] = React.useState("");
  const { setSearchValue } = React.useContext(SearchContext);
  const inputRef = React.useRef();

  function onClickSearchClear() {
    setSearchValue("");
    setValue("");
    inputRef.current?.focus();
  }

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 1000),
    []
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={style.root}>
      <input
        ref={inputRef}
        className={style.input}
        type="text"
        placeholder="Поиск пиццы..."
        value={value}
        onChange={onChangeInput}
      />
      {value && (
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
