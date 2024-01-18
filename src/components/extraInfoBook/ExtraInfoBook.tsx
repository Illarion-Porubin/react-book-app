import React from "react";
import s from "./ExtraInfoBook.module.scss";
import { useCustomSelector } from "../../hooks/store";
import { selectBookData } from "../../redux/selectors";

interface Props {
  bookImg: string;
}

export const ExtraInfoBook: React.FC<Props> = ({ bookImg }) => {
  const data = useCustomSelector(selectBookData);
  const extraInfo = data.bookId !== null ? data.bookList[data.bookId] : "ID не найден";

  console.log(extraInfo);

  return (
    <div className={s.extra}>
      <div className={s.extra__book_info}>
        <img className={s.extra__img} src={bookImg} alt="bookImg" />
        <div className={s.extra__find_book}>
          <ul className={s.extra__find_list}>
            <span className={s.extra__note}>Проверьте ближайшие библиотеки</span>
            <li className={s.extra__li}>
              <a className={s.extra__link} href="/#">Library.link</a>
            </li>
            <li className={s.extra__li}>
              <a className={s.extra__link} href="/#">WorldCat</a>
            </li>
            <span className={s.extra__note}>Купить эту книгу</span>
            <li className={s.extra__li}>
              <a className={s.extra__link} href="/#">Better World Books</a>
            </li>
            <li className={s.extra__li}>
              <a className={s.extra__link} href="/#">Amazon</a>
            </li>
          </ul>
        </div>
      </div>
      <div className={s.extra__block}>
        <h2 className={s.extra__title}>{extraInfo.title}</h2>
        <h3 className={s.extra__title}>{extraInfo.title_sort || null}</h3>
        <h4 className={s.extra__title}>{extraInfo.title_suggest || null}</h4>
        <div className={s.extra__info_main}>
          <p className={s.extra__info}><span className={s.extra__info_span}>Издатели: </span>{extraInfo.publisher}</p>
          <p className={s.extra__info}><span className={s.extra__info_span}>Авторы: </span>{extraInfo.author_name}</p>
          <p className={s.extra__info}><span className={s.extra__info_span}>Места публикаций: </span>{extraInfo.publish_place}</p>
        </div>
        <div className={s.extra__info_list}>
          <p className={s.extra__info}>{`рэйтинг книги: ${String(extraInfo.ratings_average).slice(0, 4)}`}</p>
          <p className={s.extra__info}><span className={s.extra__info_span}>рэйтинг поиска: </span>{extraInfo.ratings_count} </p>
          <p className={s.extra__info}><span className={s.extra__info_span}>уже прочитали: </span>{extraInfo.readinglog_count} </p>
          <p className={s.extra__info}><span className={s.extra__info_span}>хотят прочесть: </span>{extraInfo.want_to_read_count} </p>
        </div>
        <div className={s.extra__info_dop}>
          <p className={s.extra__info}><span className={s.extra__info_span}>Рубрики: </span>{extraInfo.subject}</p>
          <p className={s.extra__info}><span className={s.extra__info_span}>Описание: </span>{data.bookInfo?.description.value}</p>
        </div>
        {/* <Paginate/> */}
        <p>You might also like</p>
        {/* <Slicer/> */}
      </div>
    </div>
  );
};
