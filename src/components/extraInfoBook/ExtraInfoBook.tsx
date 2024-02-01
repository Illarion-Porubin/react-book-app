import React from "react";
import s from "./ExtraInfoBook.module.scss";
import { useCustomDispatch, useCustomSelector } from "../../hooks/store";
import { selectBookData } from "../../redux/selectors";
import { ReactSwiper } from "../swiper/ReactSwiper";
import noPhoto from "../../assets/png/no_photo.png";
import SadSmiley from "../../assets/png/sad_smiley.png";
import axios from "axios";
import {
  fetchBookAuthor,
  fetchBooksRatings,
  fetchBookshelves,
} from "../../redux/slices/bookSlice";
import { RatingsType, ShelvesType } from "../../types/types";

interface Props {
  bookImg: string;
}

export const ExtraInfoBook: React.FC<Props> = ({ bookImg }) => {
  // const extraInfo = data.bookId !== null ? data.bookList[data.bookId] : "ID не найден";
  const data = useCustomSelector(selectBookData);
  const dispatch = useCustomDispatch();
  const [shelves, setShelves] = React.useState<ShelvesType>();
  const [ratings, setRatings] = React.useState<RatingsType>();
  const [authorInf, setAuthorInf] = React.useState<any>();
  const authorKey =
    data.bookInfo?.authors[0].author.key.replace("/authors/", "") || "";

  const subjects = React.useMemo(
    () =>
      data.bookInfo?.subjects.slice(0, 3).map((item: string) => {
        return item.replace(/\s+/g, "_").toLowerCase();
      }),
    [data.bookInfo?.subjects]
  );

  const getBooksRatings = React.useCallback(async () => {
    const res = await dispatch(fetchBooksRatings(data.bookKey));
    if (res.payload) {
      setRatings(res.payload);
    }
  }, [dispatch, data.bookKey]);

  const getBookshelves = React.useCallback(async () => {
    const res = await dispatch(fetchBookshelves(data.bookKey));
    if (res.payload) {
      setShelves(res.payload);
    }
  }, [dispatch, data.bookKey]);

  const getAuthorInfo = React.useCallback(async () => {
    if (authorKey) {
      const res = await dispatch(fetchBookAuthor(authorKey));
      setAuthorInf(res.payload);
    }
  }, [dispatch, authorKey]);

  React.useEffect(() => {
    getBooksRatings();
    getBookshelves();
    getAuthorInfo();
  }, [getBookshelves, getBooksRatings, getAuthorInfo]);

  console.log(authorInf);

  return (
    <section className={s.extra}>
      <aside className={s.extra__book_info}>
        <img className={s.extra__img} src={bookImg} alt="bookImg" />
        <div className={s.extra__find_book}>
          <ul className={s.extra__find_list}>
            <span className={s.extra__note}>
              Проверьте ближайшие библиотеки
            </span>
            <li className={s.extra__li}>
              <a className={s.extra__link} href="/#">
                Library.link
              </a>
            </li>
            <li className={s.extra__li}>
              <a className={s.extra__link} href="/#">
                WorldCat
              </a>
            </li>
            <span className={s.extra__note}>Купить эту книгу</span>
            <li className={s.extra__li}>
              <a className={s.extra__link} href="/#">
                Better World Books
              </a>
            </li>
            <li className={s.extra__li}>
              <a className={s.extra__link} href="/#">
                Amazon
              </a>
            </li>
          </ul>
        </div>
      </aside>
      <main className={s.extra__block}>
        <h2 className={s.extra__title}>{data.bookInfo?.title}</h2>
        <div className={s.extra__items}>
          <div className={s.extra__item}>
            <li className={s.extra__item_text}>
              {String(ratings?.summary.average).slice(0, 3)} - рэйтинг книги
            </li>
          </div>
          <div className={s.extra__item}>
            <li className={s.extra__item_text}>
              <span className={s.extra__info_span}></span>
              {shelves?.counts.currently_reading || 0} - уже читают
            </li>
          </div>
          <div className={s.extra__item}>
            <li className={s.extra__item_text}>
              <span className={s.extra__info_span}></span>
              {shelves?.counts?.already_read || 0} - уже прочли
            </li>
          </div>
          <div className={s.extra__item}>
            <li className={s.extra__item_text}>
              <span className={s.extra__info_span}></span>
              {shelves?.counts.want_to_read || 0} - хотят прочеть{" "}
            </li>
          </div>
        </div>
        <article>
          <h3>Краткая биография автора</h3>
          <img
            className={s.extra__book_picture}
            src={`https://covers.openlibrary.org/a/olid/${authorKey}.jpg` || noPhoto}
            alt="authorPicture"
          />
          <p>
            {data.bookAuthor?.bio || "There is no biography for this author."}
          </p>
        </article>
        

        {/* <p className={s.extra__info}>
          <span className={s.extra__info_span}>Издатели: </span>
        </p>
        <p className={s.extra__info}>
          <span className={s.extra__info_span}>Авторы: </span>
        </p>
        <p className={s.extra__info}>
          <span className={s.extra__info_span}>Года публикаций: </span>
        </p>
        <p className={s.extra__info}>
          <span className={s.extra__info_span}>Места публикаций: </span>
        </p> */}
        <h3>Описание</h3>
        <p className={s.extra__text}>
          <span className={s.extra__info_span}></span>
          {data.bookInfo?.description}
        </p>
        <details className={s.extra__info_details}>
          <summary>Рубрики</summary>
          {data.bookInfo?.subjects.map((item: string, id: number) => (
            <a className={s.extra__info_link} href="/#" key={id}>
              {item}
            </a>
          ))}
        </details>
        {subjects ? (
          <>
            <p className={s.extra__title2}>You might also like</p>
            <ReactSwiper subject={subjects} />
          </>
        ) : (
          <>
            <p className={s.extra__title2}>
              Unfortunately, there is nothing like it.
            </p>
            <div className={s.extra__sad_smile_wrap}>
              <img
                className={s.extra__sad_smile}
                src={SadSmiley}
                alt="SadSmiley"
              />
            </div>
          </>
        )}
      </main>
    </section>
  );
};
