import React from "react";

import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";

function Home() {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    try {
      fetch("https://639c41cc16d1763ab14412f9.mockapi.io/pizzas")
        .then((response) => response.json())
        .then((arr) => {
          setItems(arr);
          setIsLoading(false);
        });
    } catch (error) {
      alert("Ошибка при запросе данных! ;(");
      console.error(error);
    }
  }, []);

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading
            ? [...new Array(6)].map((_, index) => {
                return <Skeleton key={index} />;
              })
            : items.map((obj) => {
                return <PizzaBlock {...obj} key={obj.id} />;
              })}
        </div>
      </div>
    </div>
  );
}

export default Home;
