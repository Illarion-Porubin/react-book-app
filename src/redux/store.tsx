import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReduser";

export const store = configureStore({
  reducer: rootReducer,
});


export type RootState = ReturnType<typeof rootReducer>;
export type AppState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispath = AppStore['dispatch'];
 