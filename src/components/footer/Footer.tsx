import React from "react";
import s from "./Footer.module.scss";
import logo from "../../assets/png/footerLogo.png";
import facebook from "../../assets/svg/facebook2.svg";
import twitter from "../../assets/svg/twitter2.svg";
import youtoob from "../../assets/svg/youtoob2.svg";

export const Footer = () => {
  return (
    <div className="container">
      <div className={s.footer}>
        <div className={s.footer__main_info}>
          <div className={s.footer__main_info_wrap}>
            <img className={s.footer__logo} src={logo} alt="logo" />
            <p className={s.footer__text}>
              Nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </p>
          </div>
          <div className={s.footer__icons}>
            <a className={s.footer__icon_link} href="/#">
              <img className={s.footer__icon} src={facebook} alt="facebook" />
            </a>
            <a className={s.footer__icon_link} href="/#">
              <img className={s.footer__icon} src={twitter} alt="twitter" />
            </a>
            <a className={s.footer__icon_link} href="/#">
              <img className={s.footer__icon} src={youtoob} alt="youtoob" />
            </a>
          </div>
        </div>
        <div className={s.footer__dop_info}>
          <p className={s.footer__copyright}>© 2022 Arihant. All Rights Reserved.</p>
          <p className={s.footer__optins}>
            <span>Privacy</span> | Terms of Service
          </p>
        </div>
      </div>
    </div>
  );
};
