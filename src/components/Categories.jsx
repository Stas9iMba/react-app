import React from "react";

function Categories() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  function activeCategory(index) {
    setActiveIndex(index);
  }

  return (
    <div className="categories">
      <ul>
        {categories.map((value, index) => {
          return (
            <li
              className={activeIndex === index ? "active" : ""}
              onClick={() => activeCategory(index)}
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
