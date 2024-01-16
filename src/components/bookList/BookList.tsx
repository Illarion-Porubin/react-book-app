import React, { useState } from "react";
import s from "./BookList.module.scss";
import { Title } from "../title/Title";
import { Book } from "../book/Book";
import { Loader } from "../loader/Loader";
import { useCustomSelector } from "../../hooks/store";
import { selectBookData } from "../../redux/selectors";



export const BookList = () => {
  const data = useCustomSelector(selectBookData)

  if(data.isLoading === 'loaded') return <Loader/>

  console.log(data); 

  return (
    data.bookList.length ?
    <div className="container">
      <div className={s.booklist}>
      <Title />
        {data.bookList.map((item: any, id: number) => (
          <Book book={item} key={id} />
        ))}
      </div>
    </div>
    : null
  );
};
