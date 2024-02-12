import React from "react";
import s from "./BurgerMenu.module.scss";

export const BurgerMenu: React.FC = () => {
  return (
    <>
      <div className={s.menu} >
        <span className={s.menu__burger_line}></span>
        <span className={s.menu__burger_line}></span>
        <span className={s.menu__burger_line_last}></span>
      </div>
    </>
  );
};
