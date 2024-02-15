import React from "react";
import s from "./ExtraInfoBook.module.scss";
import { useCustomDispatch, useCustomSelector } from "../../hooks/store";
import { selectBookData } from "../../redux/selectors";
import { ReactSwiper } from "../swiper/ReactSwiper";
import noPhoto from "../../assets/png/no_photo.png";
import SadSmiley from "../../assets/png/sad_smiley.png";
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
  const data = useCustomSelector(selectBookData);
  const dispatch = useCustomDispatch();
  const [shelves, setShelves] = React.useState<ShelvesType>();
  const [ratings, setRatings] = React.useState<RatingsType>();
  const authorKey =
    data.bookInfo?.authors[0].author.key.replace("/authors/", "") || "";

  const subjects = React.useMemo(
    () =>
      data.bookInfo?.subjects?.slice(0, 3).map((item: string) => {
        return item.replace(/\s+/g, "_").toLowerCase();
      }),
    [data.bookInfo?.subjects]
  );

  const getBooksRatings = React.useCallback(async () => {
    if (typeof data.bookKey === "string") {
      const res = await dispatch(fetchBooksRatings(data.bookKey));
      if (res.payload) {
        setRatings(res.payload);
      }
    }
  }, [dispatch, data.bookKey]);

  const getBookshelves = React.useCallback(async () => {
    if (typeof data.bookKey === "string") {
      const res = await dispatch(fetchBookshelves(data.bookKey));
      if (res.payload) {
        setShelves(res.payload);
      }
    }
  }, [dispatch, data.bookKey]);

  React.useEffect(() => {
    getBooksRatings();
    getBookshelves();
    dispatch(fetchBookAuthor(authorKey));
  }, [dispatch, getBookshelves, getBooksRatings, authorKey]);

  return (
    <>
      <section className={s.extra}>
        <aside className={s.extra__book_info}>
          <div className={s.extra__book_wrap}>
            <img className={s.extra__img} src={bookImg} alt="bookImg" />
          </div>
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
              <li className={s.extra__item_li}>
                <p className={s.extr}>
                  {String(ratings?.summary.average).slice(0, 3)} - рэйтинг книги
                </p>
              </li>
            </div>
            <div className={s.extra__item}>
              <li className={s.extra__item_li}>
                <p className={s.extr}>
                  <span className={s.extra__info_span}></span>
                  {shelves?.counts.currently_reading || 0} - уже читают
                </p>
              </li>
            </div>
            <div className={s.extra__item}>
              <li className={s.extra__item_li}>
                <p className={s.extr}>
                  <span className={s.extra__info_span}></span>
                  {shelves?.counts?.already_read || 0} - уже прочли
                </p>
              </li>
            </div>
            <div className={s.extra__item}>
              <li className={s.extra__item_li}>
                <p className={s.extr}>
                  <span className={s.extra__info_span}></span>
                  {shelves?.counts.want_to_read || 0} - хотят прочесть
                </p>
              </li>
            </div>
          </div>

          <section className={s.extra__book_author}>
            <h3 className={s.extra__book_author_title}>
              Краткая биография автора
            </h3>
            <div className={s.extra__book_author_wrap}>
              <img
                className={s.extra__book_picture}
                src={
                  `https://covers.openlibrary.org/a/olid/${authorKey}.jpg` ||
                  noPhoto
                }
                alt="authorPicture"
              />
              <p className={s.extra__book_author_name}>
                {data.bookAuthor?.personal_name}
              </p>
              <p className={s.extra__book_author_date}>{`${
                data.bookAuthor?.birth_date?.slice(-4) || ""
              } ${
                data.bookAuthor?.death_date
                  ? "-" + data.bookAuthor?.death_date?.slice(-4)
                  : ""
              }`}</p>
            </div>
            <p className={s.extra__book_author_bio}>
              {data.bookAuthor?.bio?.replace(
                /(?:https?|ftp):\/\/[\n\S]+/g,
                ""
              ) || "There is no biography for this author."}
            </p>
            {data.bookAuthor?.wikipedia ? (
              <a
                className={s.extra__book_author_wiki}
                href={data.bookAuthor?.wikipedia}
              >
                Link to Wikipedia
              </a>
            ) : null}
          </section>

          <h3 className={s.extra__title_desc}>Описание</h3>
          <p className={s.extra__text}>
            {data.bookInfo?.description?.replace(
              /(?:https?|ftp):\/\/[\n\S]+/g,
              ""
            )}
          </p>
          <details className={s.extra__info_details}>
            <summary className={s.extra__categories}>Рубрики</summary>
            {data.bookInfo?.subjects ? (
              data.bookInfo?.subjects.map((item: string, id: number) => (
                <a
                  className={s.extra__info_link}
                  href={`https://openlibrary.org/subjects/${item
                    .replace(/\s+/g, "_")
                    .toLowerCase()}`}
                  key={id}
                >
                  {item}
                </a>
              ))
            ) : (
              <p>Categories not found.</p>
            )}
          </details>
        </main>
      </section>
      <div className={s.swiper}>
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
      </div>
    </>
  );
};
