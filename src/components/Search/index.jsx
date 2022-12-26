import React from "react";

import style from "./Search.module.scss";
import closeSvg from "../../assets/img/removeTextInput.svg";

function Search() {
  return (
    <div className={style.root}>
      <input className={style.input} type="text" placeholder="Поиск пиццы..." />
      <img className={style.remove} src={closeSvg} alt="remove" />
    </div>
  );
}

export default Search;
