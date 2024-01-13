import React from "react";
import s from "./Book.module.scss";
import { Link } from "react-router-dom";

interface Props {
  book: any;
}

export const Book: React.FC<Props> = ({ book }) => {
  const BookImg = `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}.jpg`;
  const authors = book.author_name?.slice(0, 3).map((item: string) => {
    return " " + item;
  });

  console.log(book.key.slice(7));

  return (
    <>
      <div className={s.book} key={book.cover_i}>
        <div className={s.book__wrap}>
          <img className={s.book__picture} src={BookImg} alt="book__picture" />
          <Link
            className={s.book__popup_btn}
            to={`/book/${book.key.slice(7) || ""}`}
          >
            Read more
          </Link>
          <p className={s.book__title}>{book.title}</p>
          <p className={s.book__subtitle}>{book.subtitle || book.title}</p>
          <p className={s.book__author}>{`Авторы: ${authors}`}</p>
        </div>
      </div>
    </>
  );
};
