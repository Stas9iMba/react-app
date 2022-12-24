import React from "react";
import styles from "./NotFound.module.scss";

function NotFoundBlock() {
  return (
    <div className="container">
      <div className="content">
        <div className={styles.root}>
          <span>😕</span>
          <h1>Ничего не найдено</h1>
          <p className={styles.description}>
            К сожалени данная страница отсутствует в нашем интернет-магазине
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotFoundBlock;
