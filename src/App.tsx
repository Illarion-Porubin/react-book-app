import React from "react";
import { Main } from "./pages/main/Main";
import "./styles/_normolize.css";
import "./styles/main.scss";
import { Route, Routes } from "react-router-dom";
import { useCustomSelector } from "./hooks/store";
import { selectBookData } from "./redux/selectors";
import { changeCssRootVariables } from "./model/changeCssRootVariables";
import { Theme } from "./types/types";
import { BookInfo } from "./pages/bookInfo/BookInfo";


function App() {

  const theme = useCustomSelector(selectBookData);
  React.useEffect(() => {
    changeCssRootVariables(theme.theme === Theme.LIGHT ? Theme.LIGHT : Theme.DARK)
  }, [theme.theme])
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/book/:id" element={<BookInfo />} />
      </Routes>
    </div>
  );
}

export default App;
