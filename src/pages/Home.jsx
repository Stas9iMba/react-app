import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import PizzaBlock from "../components/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import Sort, { sortItems } from "../components/Sort";

import {
  setCategoryId,
  setSortType,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { SearchContext } from "../App";

function Home() {
  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const { categoryId, sortType, currentPage } = useSelector(
    (state) => state.filters
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onChangePages(number) {
    dispatch(setCurrentPage(number));
  }

  function handleActiveCategory(index) {
    dispatch(setCategoryId(index));
  }

  function handleActiveSort(obj) {
    dispatch(setSortType(obj));
  }

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortItems.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(setFilters({ ...params }));
    }
  }, []);

  React.useEffect(() => {
    try {
      setIsLoading(true);
      const category = categoryId > 0 ? `category=${categoryId}` : "";
      const sortBy = sortType.sortProperty.replace("-", "");
      const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
      const search = searchValue ? `&search=${searchValue}` : "";

      axios
        .get(
          `https://639c41cc16d1763ab14412f9.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        )
        .then(({ data }) => {
          setItems(data);
          setIsLoading(false);
        });
    } catch (error) {
      alert("Ошибка при запросе данных! ;(");
      console.error(error);
    }
  }, [categoryId, sortType.sortProperty, searchValue, currentPage]);

  React.useEffect(() => {
    const queryString = qs.stringify({
      sortProperty: sortType.sortProperty,
      categoryId,
      currentPage,
    });
    navigate(`?${queryString}`);
  }, [categoryId, sortType.sortProperty, currentPage]);

  return (
    <>
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
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
