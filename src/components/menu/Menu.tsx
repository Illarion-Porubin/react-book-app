import React from "react";
import s from "./Menu.module.scss";

export const Menu:React.FC = () => {
  return (
    <nav className={s.menu}>
      <ul className={s.menu__list}>
        <li className={s.menu__item}>
          <a className={s.menu__link} href="/#">
            HOME
          </a>
        </li>
        <li className={s.menu__item}>
          <a className={s.menu__link} href="/#">
            ABOUT US
          </a>
        </li>
        <li className={s.menu__item}>
          <a className={s.menu__link} href="/#">
            NEW RELEASE
          </a>
        </li>
        <li className={s.menu__item}>
          <a className={s.menu__link} href="/#">
            CONTACT US
          </a>
        </li>
      </ul>
    </nav>
  );
};
