import React from "react";

import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";

function Home() {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryIdId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: "популярности  (DESC)",
    sortProperty: "rating",
  });

  function handleActiveCategory(index) {
    setCategoryIdId(index);
  }

  function handleActiveSort(obj) {
    setSortType(obj);
  }

  React.useEffect(() => {
    try {
      setIsLoading(true);
      const category = categoryId > 0 ? `category=${categoryId}` : "";
      const sortBy = sortType.sortProperty.replace("-", "");
      const order = sortType.sortProperty.includes("-") ? "asc" : "desc";

      fetch(
        `https://639c41cc16d1763ab14412f9.mockapi.io/pizzas?${category}&sortBy=${sortBy}&order=${order}`
      )
        .then((response) => response.json())
        .then((arr) => {
          setItems(arr);
          setIsLoading(false);
        });
    } catch (error) {
      alert("Ошибка при запросе данных! ;(");
      console.error(error);
    }
  }, [categoryId, sortType]);

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories
            categoryId={categoryId}
            handleActiveCategory={handleActiveCategory}
          />
          <Sort value={sortType} handleActiveSort={handleActiveSort} />
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
