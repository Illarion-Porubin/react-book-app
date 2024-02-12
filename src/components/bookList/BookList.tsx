import React from "react";
import s from "./BookList.module.scss";
import { Title } from "../title/Title";
import { Book } from "../book/Book";
import { Loader } from "../loader/Loader";
import { useCustomSelector } from "../../hooks/store";
import { selectBookData } from "../../redux/selectors";
import { SearchType } from "../../types/types";

export const BookList: React.FC = () => {
  const data = useCustomSelector(selectBookData)

  if(data.isLoading === 'loading') return <Loader/>

  return (
    data.bookList.length ?
    <div className="container">
      <section className={s.booklist}>
      <Title />
        {data.bookList.map((item: SearchType, id: number) => (
          <Book book={item} id={id} key={id} />
        ))}
      </section>
    </div>
    : null
  );
};
