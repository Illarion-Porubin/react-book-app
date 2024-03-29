import React from "react";
import s from "./BookMainInfo.module.scss";
import { Link, useParams } from "react-router-dom";
import { Loader } from "../loader/Loader";
import { useCustomDispatch, useCustomSelector } from "../../hooks/store";
import { selectBookData } from "../../redux/selectors";
import { fetchBookInfo } from "../../redux/slices/bookSlice";
import { ExtraInfoBook } from "../extraInfoBook/ExtraInfoBook";
import { bookSlice } from "../../redux/slices/bookSlice";
import bookNotFound from "../../assets/jpg/cover_not_found.jpg";

export const BookMainInfo: React.FC = () => {
  const dispatch = useCustomDispatch();
  const data = useCustomSelector(selectBookData);
  const { id } = useParams();

  React.useEffect(() => {
    dispatch(bookSlice.actions.addKey(id));
    if (id) dispatch(fetchBookInfo(id));
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

  if (data.isLoading === "loading") return <Loader />;

  return (
    <>
      <div className="container">
        <section className={s.book__wrap}>
          <Link className={s.back} to="/">
            Go Back
          </Link>
          <main className={s.book}>
            <div className={s.book__img_wrap}>
              <img
                className={s.book__img}
                src={data.bookInfo?.covers || bookNotFound}
                alt="book__img"
              />
            </div>
            <div className={s.book__info}>
              <h1 className={s.book__info_title}>{data.bookInfo?.title}</h1>
              <p className={s.book__info_text}>{`Жанры: ${checkGenres()}`}</p>
              <p className={s.book__info_text}>{`Издание: ${
                data.bookInfo?.created || "No data available"
              }`}</p>
              <p className={s.book__info_text}>{`Обновление: ${
                data.bookInfo?.last_modified || "No data available"
              }`}</p>
            </div>
          </main>
        </section>
        <ExtraInfoBook bookImg={data.bookInfo?.covers || ""} />
      </div>
    </>
  );
};
