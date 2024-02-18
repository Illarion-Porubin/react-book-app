import React from "react";
import s from "./Menu.module.scss";
import { useCustomSelector } from "../../hooks/store";
import { selectBookData } from "../../redux/selectors";
import { Icons } from "../icons/Icons";

export const Menu: React.FC = () => {
  const [active, setActive] = React.useState<number>(0);
  const data = useCustomSelector(selectBookData);
  const MENU = [
    {
      title: "home",
      link: "#",
    },
    {
      title: "about us",
      link: "https://openlibrary.org/help/faq/about#what",
    },
    {
      title: "volunteering",
      link: "https://openlibrary.org/volunteer",
    },
    {
      title: "contact us",
      link: "https://openlibrary.org/help",
    },
  ];

  return (
    <>
      <nav className={data.menuActive ? `${s.menu} ${s.active}` : `${s.menu}`}>
        <ul className={s.menu__list}>
          {MENU.map((item: { title: string; link: string }, id: number) => (
            <li className={`${s.menu__item}`} key={id}>
              <a
                className={`${s.menu__link} ${
                  active === id ? `${s.menu__link_active}` : null
                }`}
                href={item.link}
                onClick={() => setActive(id)}
              >
                {item.title}
              </a>
            </li>
          ))}
          <div className={s.icons_block}>
            <Icons />
          </div>
        </ul>
      </nav>
    </>
  );
};
