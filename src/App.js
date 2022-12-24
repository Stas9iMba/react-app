import React from "react";

import Categories from "./components/Categories";
import Header from "./components/Header";
import PizzaBlock from "./components/PizzaBlock";
import Sort from "./components/Sort";

import "./scss/app.scss";
import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  React.useEffect(() => {
    try {
      fetch("https://639c41cc16d1763ab14412f9.mockapi.io/pizzas")
        .then((response) => response.json())
        .then((arr) => setItems(arr));
    } catch (error) {
      alert("Ошибка при запросе данных! ;(");
      console.error(error);
    }
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {items.map((obj) => {
              return <PizzaBlock {...obj} key={obj.id} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
