import React from "react";
import s from "./Book.module.scss";
import { Link } from "react-router-dom";
import bookNotFound from "../../assets/jpg/cover_not_found.jpg";
import { useCustomDispatch } from "../../hooks/store";
import { bookSlice } from "../../redux/slices/bookSlice";
import { BookType } from "../../types/types";

interface Props {
  book: BookType;
  id: number;
}

export const Book: React.FC<Props> = ({ book, id }) => {
  const dispatch = useCustomDispatch();
  const BookImg = book.cover_edition_key
    ? `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`
    : bookNotFound;


  return (
    <>
      <article className={s.book}>
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
            onClick={() => dispatch(bookSlice.actions.addId(id))}
          >
            Read more
          </Link>
          <h4 className={s.book__title}>{book.title}</h4>
          <p className={s.book__subtitle}>{book.subtitle || null}</p>
        </div>
      </article>
    </>
  );
};
