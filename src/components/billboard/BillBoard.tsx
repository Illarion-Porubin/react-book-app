import React from "react";
import s from "./BillBoard.module.scss";
import billboard from "../../assets/png/poster.png";
import { Search } from "../search/Search";

export const BillBoard = () => {
  return (
    <div className={s.billboard}>
      <div className={s.billboard__content}>
        <h1 className={s.billboard__title}>Find your book!</h1>
        <p className={s.billboard__text}>
          Hi! Here you can find the book you are interested in and learn
          something interesting about it. This is a small project using react
          and DB openlibrary to search for books.
        </p>
        <Search />
      </div>
      <div className={s.billboard__img_wrap}>
        <img className={s.billboard__img} src={billboard} alt="billboard" />
      </div>
    </div>
  );
};
