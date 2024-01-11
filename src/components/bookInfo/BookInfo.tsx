import React from "react";
import { Link, useParams } from "react-router-dom";
import s from "./BookInfo.module.scss";
// import bookImg from "../../assets/png/book.png";
import axios, { AxiosResponse } from "axios";
import { Loader } from "../loader/Loader";

export const BookInfo = () => {
  const { id } = useParams();
  const [bookInfo, setBookInfo] = React.useState<any>();

  const fetchBookInfo = async () => {
    const res: AxiosResponse = await axios.get(
      `https://openlibrary.org/works/${id}.json`
    );
    try {
      if (res.status === 200) {
        return setBookInfo(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchBookInfo();
  }, []);

  console.log(bookInfo);

  if (bookInfo?.status !== 200) return <Loader />;

  const authors = bookInfo.data.subjects
    .slice(0, 5)
    .map((item: string, id: number) => {
      return id !== 4 ? item + ", " : item + ".";
    });

  return (
    <div className="container">
      <Link className={s.back} to="/">
        Go Back
      </Link>
      <div className={s.book}>
        <div className={s.book__img_wrap}>
          <img
            className={s.book__img}
            src={`https://covers.openlibrary.org/b/id/${bookInfo.data.covers[0]}-L.jpg`}
            alt="book__img"
          />
        </div>
        <div className={s.book__info}>
          <h1 className={s.book__info_title}>{bookInfo.data.title}</h1>
          <p className={s.book__info_authors}>{authors}</p>
          <p className={s.book__info_desc}>
            {bookInfo?.data?.description?.value ? bookInfo?.data?.description?.value?.slice(0, 500) + '...' : bookInfo?.data?.description?.slice(0, 500) + '...' || ''}
          </p>
        </div>
      </div>
    </div>
  );
};
