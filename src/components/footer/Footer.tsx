import React from "react";
import s from "./Footer.module.scss";
import logo from "../../assets/png/logo.png";

export const Footer = () => {
  return (
    <div className="container">
      <div className={s.footer}>
        <div className={s.footer__info}>
          <img src={logo} alt="logo" />
          <p>Nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <div className={s.footer__icons}></div>
        </div>
        <div className={s.footer__right}>
          <p>© 2022 Arihant. All Rights Reserved.</p>
          <p> <span>Privacy</span> | Terms of Service</p>
        </div>
      </div>
    </div>
  );
};
