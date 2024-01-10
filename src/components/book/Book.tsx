import React from "react";
import s from "./Book.module.scss";
import { Link } from "react-router-dom";

interface Props {
  book: any;
}

export const Book: React.FC<Props> = ({ book }) => {
  const BookImg = `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}.jpg`;

  return (
    <>
      <div className={s.book} key={book.cover_i}>
        <div className={s.book__wrap}>
          <img className={s.book__picture} src={BookImg} alt="book__picture" />
          <Link className={s.book__popup_btn} to={`/book/${book.cover_edition_key || ''}`}>Read more</Link>
        </div>
        <p className={s.book__itle}>{book.title}</p>
        <p className={s.book__author}>{`Авторы: ${book.author_name[0]}`  }</p>
      </div>
    </>
  );
};
