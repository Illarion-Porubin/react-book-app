import React from "react";
import { Link, useParams } from "react-router-dom";
import s from "./BookInfo.module.scss";
import axios, { AxiosResponse } from "axios";
import { Loader } from "../loader/Loader";
import notFound from "../../assets/jpg/cover_not_found.jpg";

interface BookInfoType {
  data: {
    covers: number[];
    created: {
      type: string;
      value: string;
    };
    description: {
      type: string;
      value: string;
    };
    subjects: string[];
    title: string;
  };
  status: number;
}

export const BookInfo = () => {
  const { id } = useParams();
  const [bookInfo, setBookInfo] = React.useState<BookInfoType | null>(null);

  const fetchBookInfo = async () => {
    const res: AxiosResponse = await axios.get(
      `https://openlibrary.org/works/${id}.json`
    );
    try {
      if (res.status === 200) {
        const { subjects, title, description, created, covers } = res.data;
        console.log(res);

        const newBookInfo: BookInfoType = {
          data: { subjects, title, description, created, covers },
          status: res.status,
        };
        return setBookInfo(newBookInfo);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchBookInfo();
  }, []);

  if (bookInfo?.status !== 200) return <Loader />;

  const checkImg = bookInfo.data.covers[0]
    ? `https://covers.openlibrary.org/b/id/${bookInfo.data.covers[0]}-L.jpg`
    : notFound;

  const checkAuthor = () => {
    if (bookInfo.data.subjects) {
      return bookInfo.data.subjects
        // .slice(0, 5)
        .map((item: string, id: number) => {
          return id !== 4 ? item + ", " : item + ".";
        });
    } else {
      return "The author is not specified";
    }
  };

  const checDesc = () => {
    if (bookInfo?.data?.description) {
      return bookInfo?.data?.description?.value?.slice(0, 500) + "...";
    } else {
      return "There is no description";
    }
  };

  return (
    <div className="container">
      <Link className={s.back} to="/">
        Go Back
      </Link>
      <div className={s.book}>
        <div className={s.book__img_wrap}>
          <img className={s.book__img} src={checkImg} alt="book__img" />
        </div>
        <div className={s.book__info}>
          <h1 className={s.book__info_title}>{bookInfo.data.title}</h1>
          <p className={s.book__info_authors}>{checkAuthor()}</p>
          <p className={s.book__info_desc}>{checDesc()}</p>
        </div>
      </div>
    </div>
  );
};
