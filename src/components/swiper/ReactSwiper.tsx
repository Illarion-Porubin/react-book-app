import React from "react";
import axios from "axios";
import s from "./ReactSwiper.module.scss";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useCustomDispatch, useCustomSelector } from "../../hooks/store";
import { fetchBookInfo, bookSlice, fetchBookSlider } from "../../redux/slices/bookSlice";
import { Link } from "react-router-dom";
import imgNotFound from "../../assets/jpg/cover_not_found.jpg";
import { selectBookData } from "../../redux/selectors";
import { Loader } from "../loader/Loader";

interface Props {
  subject: string[];
}

export const ReactSwiper: React.FC<Props> = ({ subject }) => {
  const dispatch = useCustomDispatch();
  const sliderRef = React.useRef<SwiperRef>(null);
  const [sliderList, setSliderList] = React.useState<any>([]);

  const handlePrev = React.useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = React.useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);


  const fetchSlider = React.useCallback(async () => {
    const res = await dispatch(fetchBookSlider(subject));
    console.log(res.payload);
    setSliderList(res.payload)
  }, [dispatch, subject])

  React.useEffect(() => {
    fetchSlider()
  }, [fetchSlider]);



  if(sliderList.length < 0) return <Loader/>

  return (
    <>
      <Swiper
        modules={[Navigation]}
        spaceBetween={50}
        slidesPerView={4}
        // slidesPerGroup={4}
        loopAdditionalSlides={4}
        ref={sliderRef}
      >
        {sliderList.map((item: any, id: number) => (
          <SwiperSlide key={id}>
            <Link
              className={s.book__popup_btn}
              to={`/book/${item.key.replace("/works/", "")}`}
              onClick={() => dispatch(bookSlice.actions.addId(id))}
              >
              <div
                className={s.slide}
                onClick={() =>
                  dispatch(fetchBookInfo(item.key.replace("/works/", "")))
                }
              >
                <img
                  className={s.slide__img}
                  src={item.cover_id ? `https://covers.openlibrary.org/b/id/${item.cover_id}-M.jpg` : imgNotFound}
                  alt="slide__img"
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
        <button className={`${s.arrow} ${s.next}`} onClick={handleNext}>
          <svg
            width="62"
            height="62"
            viewBox="0 0 62 62"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="31"
              cy="31"
              r="29"
              transform="matrix(-1 0 0 1 62 0)"
              stroke="#FF6958"
              strokeWidth="4"
            />
            <path
              d="M41.4142 29.5858C42.1953 30.3668 42.1953 31.6332 41.4142 32.4142L28.6863 45.1421C27.9052 45.9232 26.6389 45.9232 25.8579 45.1421C25.0768 44.3611 25.0768 43.0947 25.8579 42.3137L37.1716 31L25.8579 19.6863C25.0768 18.9052 25.0768 17.6389 25.8579 16.8579C26.6389 16.0768 27.9053 16.0768 28.6863 16.8579L41.4142 29.5858ZM38 29L40 29L40 33L38 33L38 29Z"
              fill="#FF6958"
            />
          </svg>
        </button>
        <button className={`${s.arrow} ${s.prev}`} onClick={handlePrev}>
          <svg
            width="62"
            height="62"
            viewBox="0 0 62 62"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="31" cy="31" r="29" stroke="#FF6958" strokeWidth="4" />
            <path
              d="M20.5858 29.5858C19.8047 30.3668 19.8047 31.6332 20.5858 32.4142L33.3137 45.1421C34.0948 45.9232 35.3611 45.9232 36.1421 45.1421C36.9232 44.3611 36.9232 43.0947 36.1421 42.3137L24.8284 31L36.1421 19.6863C36.9232 18.9052 36.9232 17.6389 36.1421 16.8579C35.3611 16.0768 34.0947 16.0768 33.3137 16.8579L20.5858 29.5858ZM24 29L22 29L22 33L24 33L24 29Z"
              fill="#FF6958"
            />
          </svg>
        </button>
      </Swiper>
    </>
  );
};
