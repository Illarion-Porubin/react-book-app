import React from "react";
import s from "./BookInfo.module.scss";
import axios, { AxiosResponse } from "axios";
import { Link, useParams } from "react-router-dom";
import { Loader } from "../loader/Loader";
import notFoundImg from "../../assets/jpg/cover_not_found.jpg";
import { BookInfoType } from "../../types/types";



export const BookInfo = () => {
  const { id } = useParams();
  const [bookInfo, setBookInfo] = React.useState<BookInfoType | null>(null);



  const fetchBookInfo = React.useCallback( async () => {
    const res: AxiosResponse = await axios.get(
      `https://openlibrary.org/works/${id}.json`
    );
    try {
      if (res.status === 200) {
        const { subjects, title, description, created, covers, last_modified } = res.data;
        console.log(res.data);
        const newBookInfo: BookInfoType = {
          data: { subjects, title, description, created, last_modified, covers },
          status: res.status,
        };
        if(typeof(res.data.description) === 'string'){
          newBookInfo.data.description = {
            value: res.data.description
          }
          return setBookInfo(newBookInfo);
        }
        return setBookInfo(newBookInfo);
      }
    } catch (error) {
      console.log(error);
    }
  },[id]);


  React.useEffect(() => {
    fetchBookInfo();
  }, [fetchBookInfo]);

  if (bookInfo?.status !== 200) return <Loader/>;


  const checkImg = bookInfo.data.covers[0]
    ? `https://covers.openlibrary.org/b/id/${bookInfo.data.covers[0]}-M.jpg`
    : notFoundImg;

  const checkAuthor = () => {
    if (bookInfo.data.subjects) {
      // return bookInfo.data.subjects.map((item: string, id: number) => {
      //     return id !== 4 ? item + ", " : item + ".";
      //   });
      return bookInfo.data.subjects.length < 4 ? bookInfo.data.subjects : bookInfo.data.subjects.slice(0, 4)
    } else {
      return "The author is not specified";
    }
  };

  const checDesc = () => {
    if (bookInfo?.data?.description) {
      return bookInfo?.data?.description?.value?.slice(0, 500) + "..." 
    } else {
      return "There is no description";
    }
  };

  const created = new Date(bookInfo.data.created.value).toLocaleDateString();
  const modified = new Date(bookInfo.data.last_modified.value).toLocaleDateString();

  return (
    <div className="container">
      <Link className={s.back} to="/">
        Go Back
      </Link>
      <div className={s.book}>
        <div className={s.book__img_wrap}>
          <img className={s.book__img} src={checkImg} alt="book__img"/>
        </div>
        <div className={s.book__info}>
          <h1 className={s.book__info_title}>{bookInfo.data.title}</h1>
          <p className={s.book__info_text}>{checkAuthor()}</p>
          <p className={s.book__info_text}>{`Издание: ${created}`}</p>
          <p className={s.book__info_text}>{`Обновление: ${modified}`}</p>
          <p className={s.book__info_desc}>{checDesc()}</p>
        </div>
      </div>
    </div>
  );
};
