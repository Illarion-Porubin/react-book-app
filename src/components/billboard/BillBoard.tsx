import React from "react";
import s from "./BillBoard.module.scss";
import poster from "../../assets/png/poster4.png";
import { Search } from "../search/Search";

export const BillBoard: React.FC = () => {
  return (
    <div className={s.billboard}>
      <div className={s.billboard__content}>
        <h1 className={s.billboard__title}>Find your book!</h1>
        <p className={s.billboard__text}>
          Hi! Here you can find the book you are interested in and learn
          something about it. This is a project using react and DB openlibrary
          to search for books.
        </p>
        <Search />
      </div>
      <div className={s.billboard__img_wrap}>
        <img className={s.billboard__img} src={poster} alt="billboard" />
      </div>
    </div>
  );
};
