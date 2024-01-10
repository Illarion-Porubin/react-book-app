import React from "react";
import { Link, useParams } from "react-router-dom";
import s from "./BookInfo.module.scss";
// import bookImg from "../../assets/png/book.png";
import axios, { AxiosResponse } from "axios";
import { Loader } from "../loader/Loader";

export const BookInfo = () => {
  const { id } = useParams();
  const [bookInfo, setBookInfo] = React.useState<any>();
  const BookImg = `https://covers.openlibrary.org/b/olid/${id}.jpg`;

  const fetchBookInfo = async () => {
    const res: AxiosResponse = await axios.get(`https://openlibrary.org/books/${id}.json`);
    try {
      if(res.status === 200){
        return setBookInfo(res)
      }
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    fetchBookInfo()
  }, []);

  console.log(bookInfo);


  if(bookInfo?.status !== 200) return <Loader/>
  
  return (
    <div className="container">
      <Link className={s.back} to="/">
        Go Back
      </Link>
      <div className={s.book}>
        <div className={s.book__img_wrap}>
          <img className={s.book__img} src={BookImg} alt="book__img" />
        </div>
        <div className={s.book__info}>
          <h1>{bookInfo.data.full_title}</h1>
          <p></p>
          <h3>{bookInfo.data.title}</h3>
          <p></p>
        </div>
      </div>
    </div>
  );
};
