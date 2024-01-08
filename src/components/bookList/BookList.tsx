import React from "react";
import s from "./BookList.module.scss";
import { Title } from "../title/Title";
import { Book } from "../book/Book";

export const BookList = () => {
  return (
    <div className="container">
      <Title />
      <div className={s.booklist}>
          <Book/>
      </div>
    </div>
  );
};
