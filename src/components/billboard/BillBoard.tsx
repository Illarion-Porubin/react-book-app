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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu
          feugiat amet, libero ipsum enim pharetra hac. Urna commodo, la cus ut
          magna velit eleifend. Amet, quis urna, a eu.
        </p>
      </div>
      <div className={s.billboard__img_wrap}>
        <img className={s.billboard__img} src={billboard} alt="billboard" />
      </div>
      <Search />
    </div>
  );
};
