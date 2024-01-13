import React, { useState } from "react";
import s from "./BookList.module.scss";
import { Title } from "../title/Title";
import { Book } from "../book/Book";
import { useSearch } from "../../provider/SearchProvider";
import { Loader } from "../loader/Loader";



export const BookList = () => {
  const search: any = useSearch();

  if(search.loading) return <Loader/>


  return (
    search.books.length ?
    <div className="container">
      <div className={s.booklist}>
      <Title />
        {search.books.map((item: any, id: number) => (
          <Book book={item} key={id} />
        ))}
      </div>
    </div>
    : null
  );
};
