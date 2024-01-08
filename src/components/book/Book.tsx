import React from "react";
import s from "./Book.module.scss";
import book from "../../assets/png/book.png";

export const Book = () => {
  const arr = new Array(4).fill('');

  return (
    <>
      {arr.map(() => (
        <div className={s.book}>
          <div className={s.book__wrap}>
            <img className={s.book__picture} src={book} alt="book__picture" />
            <button className={s.book__popup_btn}>Read more</button>
          </div>
          <p className={s.book__itle}>Simple way of piece life</p>
          <p className={s.book__author}>Armor Ramsey</p>
        </div>
      ))}
    </>
  );
};
