import React from "react";
import { Main } from "./pages/main/Main";
import "./styles/_normolize.css";
import "./styles/main.css";
import { Route, Routes } from "react-router-dom";
import { BookInfo } from "./components/bookInfo/BookInfo";

function App() {
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
