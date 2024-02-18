import React from "react";
import s from "./Header.module.scss";
import { Icons } from "../icons/Icons";
import logo from "../../assets/png/logo.png";
import { BurgerMenu } from "../burgerMenu/BurgerMenu";
import { Toggle } from "../switch/Toggle";
import { bookSlice } from "../../redux/slices/bookSlice";
import { useCustomDispatch, useCustomSelector } from "../../hooks/store";
import { selectBookData } from "../../redux/selectors";
import { Theme } from "../../types/types";

export const Header: React.FC = () => {
  const { theme } = useCustomSelector(selectBookData);
  const dispatch = useCustomDispatch();

  const changeTheme = React.useCallback((): void => {
    dispatch(
      bookSlice.actions.changeTheme(
        theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
      )
    );
  }, [theme, dispatch]);

  return (
    <section className={s.header}>
      <div className="container">
        <div className={s.header__wrap}>
          <a href="/#" className={s.header__logo}>
            <img className={s.header__logo_img} src={logo} alt="logo" />
          </a>
          <div className={s.header__assets}>
            <div className={s.header__assets_item}>
              <Icons />
            </div>
            <Toggle changeTheme={changeTheme} />
            <div className={s.header__assets_item}>
              <BurgerMenu />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
