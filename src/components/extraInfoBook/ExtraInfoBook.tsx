import React from "react";
import s from "./ExtraInfoBook.module.scss";
import { useCustomSelector } from "../../hooks/store";
import { selectBookData } from "../../redux/selectors";

interface Props {
  bookImg: string;
}

export const ExtraInfoBook: React.FC<Props> = ({ bookImg }) => {
  const data = useCustomSelector(selectBookData);
  const extraInfo =
    data.bookId !== null ? data.bookList[data.bookId] : "ID не найден";

  return (
    <div className={s.extra}>
      <div className={s.extra__img_wrap}>
        <img className={s.extra__img} src={bookImg} alt="bookImg" />
      </div>
      <div className={s.extra__block}>
        <p>Издатели: {extraInfo.publisher}</p>
        <h2 className={s.extra__title}>{extraInfo.title}</h2>
          <p>Авторы: {extraInfo.author_name}</p>
          <p>Места публикаций: {extraInfo.publish_place}</p>
        <div className={s.extra__info_list}>
          <p className={s.extra__info}>{`Рэйтинг книги: ${String(extraInfo.ratings_average).slice(0, 4)}`}</p>
          <p className={s.extra__info}>Рэйтинг поиска: {extraInfo.ratings_count} </p>
          <p className={s.extra__info}>Уже прочитали: {extraInfo.readinglog_count} </p>
          <p className={s.extra__info}>Хотят прочесть: {extraInfo.want_to_read_count} </p>
        </div>
        <div className={s.extra__categories}>
          <span>Рубрики:</span>
          <ul>
            {extraInfo.subject.map((item: string) => (
              <li>
                <a className={s.extra__subject_li} href="#/">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className={s.extra__book_desc}>{data.bookInfo?.description.value}</p>
        {/* <Paginate/> */}
        <p>You might also like</p>
        {/* <Slicer/> */}
      </div>
    </div>
  );
};
