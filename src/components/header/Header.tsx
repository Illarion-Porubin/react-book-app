import React from "react";
import s from "./Header.module.scss";
import { Icons } from "../icons/Icons";
import logo from '../../assets/png/logo.png';
import { BurgerMenu } from "../burgerMenu/BurgerMenu";

export const Header: React.FC = () => {
  return (
    <section className={s.header}>
      <a href="/#" className={s.header__logo}>
        <img className={s.header__logo_img} src={logo} alt="logo" />
      </a>
      <div className={s.header__assets}>
        <Icons/>
        <BurgerMenu/>
      </div>
    </section>
  );
};
