import React from "react";
import s from "./Toggle.module.scss";
import { useCustomSelector } from "../../hooks/store";
import { selectBookData } from "../../redux/selectors";

interface Props {
  changeTheme: () => void;
}

export const Toggle: React.FC<Props> = ({ changeTheme }) => {
  const { theme } = useCustomSelector(selectBookData);
  return (
    <label className={s.switch}>
      <input
        type="checkBox"
        className={s.switch__input}
        onClick={() => changeTheme()}
        defaultChecked={theme === "dark" ? true : false}
      />
      <span className={s.switch__slider}></span>
    </label>
  );
};
