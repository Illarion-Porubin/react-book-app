import React from "react";
import s from "./BurgerMenu.module.scss";
import {bookSlice} from "../../redux/slices/bookSlice";
import { useCustomDispatch, useCustomSelector } from "../../hooks/store";
import { selectBookData } from "../../redux/selectors";


export const BurgerMenu: React.FC = () => {
  // const [active, setActive] = React.useState<boolean>(false);
  const data = useCustomSelector(selectBookData);
  const dispatch = useCustomDispatch();

  return (
    <>
      <button className={data.menuActive ? `${s.menu} ${s.active}` : `${s.menu}`}  onClick={() => dispatch(bookSlice.actions.changeMenu(!data.menuActive))}>
        <span className={s.menu__burger_line_first}></span>
        <span className={s.menu__burger_line_second}></span>
        <span className={s.menu__burger_line_last}></span>
      </button>
    </>
  );
};
