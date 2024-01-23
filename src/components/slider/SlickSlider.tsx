import React from "react";
import Slider from "react-slick";
import PrevArrov from "../../assets/svg/Prev.svg";
import NextArrov from "../../assets/svg/Next.svg";

// // Import Swiper styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import s from "./SlickSlider.module.scss";
import axios from "axios";

export const SlickSlider: React.FC = () => {
  const [dopBookList, setDopBookList] = React.useState([]);
  const sliderRef = React.useRef<Slider | null>(null);

  const fetchDopList = async () => {
    const res = await axios.get(
      "https://openlibrary.org/subjects/new_york_times_bestseller.json"
    );
    if (res.status === 200) {
      setDopBookList(res.data.works);
    }
  };

  React.useEffect(() => {
    fetchDopList();
  }, []);

  console.log(dopBookList);

  // const slideImg = `https://covers.openlibrary.org/b/id/${item.cover_id}-M.jpg`;

  const Prev = () => {
    return (
      <img
        onClick={() => sliderRef?.current?.slickPrev()}
        className={`${s.arrov} ${s.arrov__prev}`}
        src={PrevArrov}
        alt="Prev"
      />
    );
  };

  const Next = () => {
    return (
      <img
        onClick={() => sliderRef?.current?.slickNext()}
        className={`${s.arrov} ${s.arrov__next}`}
        src={NextArrov}
        alt="Next"
      />
    );
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    prevArrow: <Prev />,
    nextArrow: <Next />,
  };
  return (
    <>
      <div className={s.slide}>
        <h2> Single Item</h2>
        <Slider {...settings} ref={sliderRef}>
          {dopBookList.map((item: any) => (
            <div className={s.slide__wrap_img}>
              <img
                className={s.slide__img}
                src={`https://covers.openlibrary.org/b/id/${item.cover_id}-M.jpg`}
                alt="slide__img"
              />
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};
