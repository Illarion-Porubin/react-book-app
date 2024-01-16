import React from "react";
import s from "./Search.module.scss";
import { useDebounce } from "../../hooks/useDebounce";
import { useCustomDispatch } from "../../hooks/store";
import { fetchSearchBook } from "../../redux/slices/bookSlice";

export const Search = () => {
  const [findValue, setFindValue] = React.useState<string | null>(null);
  const debounce = useDebounce(findValue || '', 600);
  const dispatch = useCustomDispatch();


  React.useEffect(() => {
    if(debounce) {
      dispatch(fetchSearchBook(debounce));
    }
  }, [debounce, dispatch]);

  return (
    <div className={s.search}>
      <input
        className={s.search__input}
        type="text"
        placeholder="Search"
        onChange={(e) => setFindValue(e.target.value)}
        autoFocus
      />
    </div>
  );
};
