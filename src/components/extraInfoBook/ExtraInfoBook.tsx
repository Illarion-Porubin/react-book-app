import React from "react";
import s from "./ExtraInfoBook.module.scss";
import { useCustomDispatch, useCustomSelector } from "../../hooks/store";
import { selectBookData } from "../../redux/selectors";
import { ReactSwiper } from "../swiper/ReactSwiper";
import SadSmiley from "../../assets/png/sad_smiley.png";
import axios from "axios";
import { fetchBooksRatings, fetchBookshelves } from "../../redux/slices/bookSlice";
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

  const subjects = React.useMemo(() => data.bookInfo?.subjects.slice(0, 3).map((item: string) => {
    return item.replace(/\s+/g, "_").toLowerCase()
  }), [])


  const booksRatings = React.useCallback( async () => {
    const res = await dispatch(fetchBooksRatings(data.bookKey))
    if(res.payload){
      setRatings(res.payload);
    }
  },[dispatch,data.bookKey])

  const bookshelves = React.useCallback( async () => {
    const res = await dispatch(fetchBookshelves(data.bookKey))
    if(res.payload){
      setShelves(res.payload);
    }
  },[dispatch,data.bookKey])

  const authorInfo = React.useCallback(async  (authorKey: string) => {
    const res = await axios.get(`https://openlibrary.org${authorKey}.json`)
  }, [])

  const authorPicture = async (authorKey: string) => {
    const res = await axios.get(`https://covers.openlibrary.org/a/olid/${authorKey}-M.jpg`)
  }


  React.useEffect(() => {
    booksRatings()
    bookshelves()
    if(data.bookInfo?.authors){
      authorInfo(data.bookInfo?.authors[0].author.key)
    }
  }, [bookshelves, booksRatings, authorInfo, data.bookInfo?.authors])

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
        <details className={s.extra__info_details}>
          <summary>Рубрики</summary>
          {
            data.bookInfo?.subjects ?
            data.bookInfo?.subjects.map((item: string, id: number) => (
              <a className={s.extra__info_link} href="/#" key={id}>
                {item}
              </a>
            ))
            :
            <p className={s.extra__info_link}>No data available</p>
          }
        </details>
        <p className={s.extra__info}>
          <span className={s.extra__info_span}>Издатели: </span>
          {/* {`${extraInfo.publisher}`} */}
        </p>
        <p className={s.extra__info}>
          <span className={s.extra__info_span}>Авторы: </span>
          {/* {`${extraInfo.author_name}`} */}
        </p>
        <p className={s.extra__info}>
          <span className={s.extra__info_span}>Года публикаций: </span>
          {/* {`${extraInfo.publish_year}`} */}
        </p>
        <p className={s.extra__info}>
          <span className={s.extra__info_span}>Места публикаций: </span>
          {/* {extraInfo.publish_place} */}
        </p>
        <p className={s.extra__text}>
          <span className={s.extra__info_span}></span>
          {data.bookInfo?.description}
        </p>
        {
          //  lowerCase and use replace for change shift 
          subjects ?
          <>
            <p className={s.extra__title2}>You might also like</p>
            <ReactSwiper subject={subjects}/>
          </>
          :
          <>
            <p className={s.extra__title2}>Unfortunately, there is nothing like it.</p>
            <div className={s.extra__sad_smile_wrap}>
              <img className={s.extra__sad_smile} src={SadSmiley} alt="SadSmiley" />
            </div>
          </>
        }
      </main>
    </section>
  );
};
