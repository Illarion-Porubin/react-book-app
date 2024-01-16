import { combineReducers } from "@reduxjs/toolkit";
import bookSlice from "./slices/bookSlice";

const rootReducer = combineReducers({
  book: bookSlice,
});

export default rootReducer;
