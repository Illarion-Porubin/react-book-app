import React from "react";
import s from "./BookInfo.module.scss";
import { Link, useParams } from "react-router-dom";
import { Loader } from "../loader/Loader";
import { useCustomDispatch, useCustomSelector } from "../../hooks/store";
import { selectBookData } from "../../redux/selectors";
import { fetchBookInfo } from "../../redux/slices/bookSlice";
import { ExtraInfoBook } from "../extraInfoBook/ExtraInfoBook";
import { bookSlice } from "../../redux/slices/bookSlice";

export const BookInfo: React.FC = () => {
  const dispatch = useCustomDispatch();
  const data = useCustomSelector(selectBookData);
  const { id } = useParams();

  React.useEffect(() => {
    dispatch(bookSlice.actions.addKey(id));
    dispatch(fetchBookInfo(id));
  }, [dispatch, id]);

  const checkGenres = () => {
    if (data.bookInfo?.subjects) {
      const genres =
        data.bookInfo.subjects.length < 4
          ? data.bookInfo.subjects
          : data.bookInfo.subjects.slice(0, 4);
      return genres.map((item: string, id: number) => {
        return genres.length !== id + 1 ? " " + item : " " + item + ".";
      });
    } else {
      return "The author is not specified";
    }
  };

  const checDesc = () => {
    if (data.bookInfo?.description) {
      return data.bookInfo?.description?.slice(0, 500) + "...";
    } else {
      return "There is no description";
    }
  };


  if (data.isLoading === "loading") return <Loader />;

  return (
    <>
      <Link className={s.back} to="/">
        Go Back
      </Link>
      <div className="container">
        <section>
          <main className={s.book}>
            <div className={s.book__img_wrap}>
              <img className={s.book__img} src={data.bookInfo?.covers} alt="book__img" />
            </div>
            <div className={s.book__info}>
              <h1 className={s.book__info_title}>{data.bookInfo?.title}</h1>
              <p className={s.book__info_text}>{`Жанры: ${checkGenres()}`}</p>
              <p className={s.book__info_text}>{`Издание: ${data.bookInfo?.created}`}</p>
              <p className={s.book__info_text}>{`Обновление: ${data.bookInfo?.last_modified}`}</p>
              <p className={s.book__info_desc}>{checDesc()}</p>
            </div>
          </main>
        </section>
        <ExtraInfoBook bookImg={data.bookInfo?.covers || ''} />
      </div>
    </>
  );
};
