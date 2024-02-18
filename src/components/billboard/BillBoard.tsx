import React from "react";
import s from "./BillBoard.module.scss";
import poster from "../../assets/png/poster4.png";
import { Search } from "../search/Search";

export const BillBoard: React.FC = () => {
  const [scrollTop, setScrollTop] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollTop(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={s.billboard}>
      <div className="container">
        <div className={s.billboard__content}>
          <h1 className={s.billboard__title}>Find your book!</h1>
          <p className={s.billboard__text}>
            Hi! Here you can find the book you are interested in and learn
            something about it. This is a project using react and DB openlibrary
            to search for books.
          </p>
          <Search />
        </div>
        <div className={s.billboard__img_wrap}>
          <img className={s.billboard__img} src={poster} alt="billboard" />
        </div>
      </div>
      <button
        className={
          scrollTop > 600
            ? `${s.billboard__up_btn} ${s.active}`
            : s.billboard__up_btn
        }
        onClick={scrollUp}
      >
        <svg className={s.billboard__up} viewBox="-3 0 32 32" version="1.1">
          <g id="icomoon-ignore"></g>
          <path
            d="M26.221 16c0-7.243-5.871-13.113-13.113-13.113s-13.113 5.87-13.113 13.113c0 7.242 5.871 13.113 13.113 13.113s13.113-5.871 13.113-13.113zM1.045 16c0-6.652 5.412-12.064 12.064-12.064s12.064 5.412 12.064 12.064c0 6.652-5.411 12.064-12.064 12.064-6.652 0-12.064-5.412-12.064-12.064z"
            fill="currentColor"
          ></path>
          <path
            d="M18.746 15.204l0.742-0.742-6.379-6.379-6.378 6.379 0.742 0.742 5.112-5.112v12.727h1.049v-12.727z"
            fill="currentColor"
          ></path>
        </svg>
      </button>
    </div>
  );
};
