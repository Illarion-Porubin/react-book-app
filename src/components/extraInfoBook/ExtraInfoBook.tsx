import React from "react";
import s from "./ExtraInfoBook.module.scss";
import { useCustomSelector } from "../../hooks/store";
import { selectBookData } from "../../redux/selectors";
import { SlickSlider } from "../slider/SlickSlider";

interface Props {
  bookImg: string;
}

export const ExtraInfoBook: React.FC<Props> = ({ bookImg }) => {
  const data = useCustomSelector(selectBookData);
  const extraInfo =
    data.bookId !== null ? data.bookList[data.bookId] : "ID не найден";

  console.log(extraInfo);


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
        <h2 className={s.extra__title}>{extraInfo.title}</h2>
        <h3 className={s.extra__title}>
          {extraInfo.title_sort !== extraInfo.title
            ? extraInfo.title_sort
            : null}
        </h3>
        <h4 className={s.extra__title}>
          {extraInfo.title_suggest !== extraInfo.title
            ? extraInfo.title_suggest
            : null}
        </h4>
        <div className={s.extra__items}>
          <div className={s.extra__item}>
            <li className={s.extra__item_text}>
              {String(extraInfo.ratings_average).slice(0, 4)} - рэйтинг книги
            </li>
          </div>
          <div className={s.extra__item}>
            <li className={s.extra__item_text}>
              <span className={s.extra__info_span}></span>
              {extraInfo.ratings_count} - рэйтинг поиска
            </li>
          </div>
          <div className={s.extra__item}>
            <li className={s.extra__item_text}>
              <span className={s.extra__info_span}></span>
              {extraInfo.readinglog_count} - уже прочли
            </li>
          </div>
          <div className={s.extra__item}>
            <li className={s.extra__item_text}>
              <span className={s.extra__info_span}></span>
              {extraInfo.want_to_read_count} - хотят прочеть{" "}
            </li>
          </div>
        </div>
        <details className={s.extra__info_details}>
          <summary>Рубрики</summary>
          {extraInfo.subject.map((item: any) => (
            <a className={s.extra__info_link} href="/#">
              {item}
            </a>
          ))}
        </details>
        <p className={s.extra__info}>
          <span className={s.extra__info_span}>Издатели: </span>
          {`${extraInfo.publisher}`}
        </p>
        <p className={s.extra__info}>
          <span className={s.extra__info_span}>Авторы: </span>
          {`${extraInfo.author_name}`}
        </p>
        <p className={s.extra__info}>
          <span className={s.extra__info_span}>Года публикаций: </span>
          {`${extraInfo.publish_year}`}
        </p>
        <p className={s.extra__info}>
          <span className={s.extra__info_span}>Места публикаций: </span>
          {extraInfo.publish_place}
        </p>
        <p className={s.extra__text}>
          <span className={s.extra__info_span}></span>
          {data.bookInfo?.description.value}
        </p>

        {/* <Paginate/> */}
        <p>You might also like</p>
        <SlickSlider/>
      </main>
    </section>
  );
};
