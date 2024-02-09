import React from "react";
import { Header } from "../../components/header/Header";
import { Menu } from "../../components/menu/Menu";
import { BillBoard } from "../../components/billboard/BillBoard";
import { BookList } from "../../components/bookList/BookList";
import { changeCssRootVariables } from "../../model/changeCssRootVariables";
import { Theme } from "../../types/types";
import { useCustomSelector } from "../../hooks/store";
import { selectBookData } from "../../redux/selectors";

export const Main = () => {

  const theme = useCustomSelector(selectBookData);
  React.useEffect(() => {
    changeCssRootVariables(theme.theme === Theme.LIGHT ? Theme.LIGHT : Theme.DARK)
  }, [theme.theme])

  return (
    <>
      <Header/>
      <Menu />
      <BillBoard />
      <BookList />
    </>
  );
};
