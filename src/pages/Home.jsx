import React from "react";

import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import PizzaBlock from "../components/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";

import { SearchContext } from "../App";

function Home() {
  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryIdId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: "популярности  (DESC)",
    sortProperty: "rating",
  });
  const [currentPage, setCurrentPage] = React.useState(1);

  function onChangePages(number) {
    setCurrentPage(number);
  }

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
      const search = searchValue ? `&search=${searchValue}` : "";

      fetch(
        `https://639c41cc16d1763ab14412f9.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
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
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <>
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
              ? [...new Array(4)].map((_, index) => {
                  return <Skeleton key={index} />;
                })
              : items.map((obj) => {
                  return <PizzaBlock {...obj} key={obj.id} />;
                })}
          </div>
        </div>
      </div>
      <Pagination currentPage={currentPage} onChangePages={onChangePages} />
    </>
  );
}

export default Home;
