import React from "react";
import s from "./Icons.module.scss";
import facebook from "../../assets/svg/facebook.svg";
import instagram from "../../assets/svg/instagram.svg";
import twitter from "../../assets/svg/twitter.svg";

export const Icons: React.FC = () => {
  return (
    <div className={s.icons}>
      <a href="/#">
        <img className={s.icon} src={facebook} alt="facebook" />
      </a>
      <a href="/#">
        <img className={s.icon} src={instagram} alt="instagram" />
      </a>
      <a href="/#">
        <img className={s.icon} src={twitter} alt="twitter" />
      </a>
    </div>
  );
};
