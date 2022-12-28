import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";

const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

function Categories() {
  const categoryId = useSelector((state) => state.filters.categoryId);
  const dispatch = useDispatch();

  function handleActiveCategory(index) {
    dispatch(setCategoryId(index));
  }

  return (
    <div className="categories">
      <ul>
        {categories.map((value, index) => {
          return (
            <li
              className={categoryId === index ? "active" : ""}
              onClick={() => handleActiveCategory(index)}
              key={index}
            >
              {value}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
