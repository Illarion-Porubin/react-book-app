import React from "react";
import LoaderImg from "../../assets/svg/loader.svg";
import s from "./Loader.module.scss";

export const Loader:React.FC = () => {
  return (
    <div className={`${s.loader} ${s.flex}`}>
      <img src={LoaderImg} alt="loader" />
    </div>
  );
};
