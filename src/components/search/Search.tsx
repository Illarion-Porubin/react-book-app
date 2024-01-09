import React from "react";
import s from "./Search.module.scss";
import { useSearch } from "../../provider/SearchProvider";

export const Search = () => {
  const search = useSearch();
  return (
    <div className={s.search}>
      <input
        className={s.search__input}
        type="text"
        placeholder="Search"
        onChange={(e) => search.setSearchTerm(e.target.value)}
      />
    </div>
  );
};
