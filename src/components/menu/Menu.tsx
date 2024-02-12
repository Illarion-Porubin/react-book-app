import React from "react";
import s from "./Menu.module.scss";

export const Menu: React.FC = () => {
  const [active, setActive] = React.useState<number>(0);
  const MENU = [
    {
      title: "home",
      link: "#header",
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
    <nav className={s.menu}>
      <ul className={s.menu__list}>
        {MENU.map((item: { title: string; link: string }, id: number) => (
          <li
            className={`${s.menu__item}`}
            onClick={() => setActive(id)}
            key={id}
          >
            <a
              className={`${s.menu__link} ${
                active === id ? `${s.menu__link_active}` : null
              }`}
              href={item.link}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
