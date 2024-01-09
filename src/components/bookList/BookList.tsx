import React from "react";
import s from "./BookList.module.scss";
import { Title } from "../title/Title";
import { Book } from "../book/Book";
import { useSearch } from "../../provider/SearchProvider";


export const BookList = () => {
  const search: any = useSearch();

  return (
    <div className="container">
      <Title />
      <div className={s.booklist}>
        {search.books.map((item: any, id: number) => (
          <Book book={item} key={id} />
        ))}
      </div>
    </div>
  );
};
