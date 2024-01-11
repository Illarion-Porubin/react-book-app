import React from "react";
import s from "./Title.module.scss";

export const Title = () => {
  return (
    <div className={s.title}>
      <span className={s.title__span}/>
      <h1 className={s.title__text}>Your search</h1>
      <span className={s.title__span}/>
    </div>
  );
};
