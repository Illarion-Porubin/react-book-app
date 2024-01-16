import React from "react";
import s from "./Book.module.scss";
import { Link } from "react-router-dom";
import notFoundImg from "../../assets/jpg/cover_not_found.jpg";

interface Props {
  book: any;
}

export const Book: React.FC<Props> = ({ book }) => {
  const BookImg = book.cover_edition_key
    ? `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`
    : notFoundImg;
  const Authors =
    book.author_name.length > 2
      ? book.author_name?.slice(0, 2)
      : book.author_name;

  return (
    <>
      <div className={s.book} key={book.cover_i}>
        <div className={s.book__wrap}>
          <img
            className={s.book__picture}
            src={BookImg}
            alt="book__picture"
            loading="lazy"
          />
          <Link
            className={s.book__popup_btn}
            to={`/book/${book.key.replace("/works/", "")}`}
          >
            Read more
          </Link>
          <p className={s.book__title}>{book.title}</p>
          <p className={s.book__subtitle}>{book.subtitle || book.title}</p>
          <p className={s.book__author}>{`Авторы: ${Authors}`}</p>
     
        </div>
      </div>
    </>
  );
};
