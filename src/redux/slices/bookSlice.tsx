import { createSlice } from "@reduxjs/toolkit";
import { BookInfoType } from "../../types/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSearchBook = createAsyncThunk<string, string, { rejectValue: string }>(
  "api/fetchSearch",
  async (params: string, { rejectWithValue }) => {
    try {
      if(params){
        const URL = `https://openlibrary.org/search.json?title=`;
        const fields = `&fields=key,title,author_name,editions,cover_edition_key`;
        const { data } = await axios.get(URL + params + fields + `&lang=en&limit=12`);  
        if (!data) {
          return rejectWithValue("Server Error!");
        }
        return data.docs;
      }
    } catch (error) {
      return rejectWithValue("Can't fetchSearchBook");
    }
  }
);

export interface BookState {
  bookList: any | [];
  bookInfo: BookInfoType | null;
  bookId: number | null;
  status: number | null;
  isLoading: "idle" | "loading" | "loaded" | "error";
  error: string | null;
}

export const initialState: BookState = {
  bookList: [],
  bookInfo: null,
  bookId: null,
  status: null,
  isLoading: "idle",
  error: null,
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchBook.pending, (state) => {
        state.bookList = [];
        state.isLoading = "loading";
      })
      .addCase(fetchSearchBook.fulfilled, (state, action) => {
        state.bookList = action.payload;
        console.log(state.bookList, 'state.bookList');
      })
      .addCase(fetchSearchBook.rejected, (state) => {
        state.bookList = [];
        state.isLoading = "loading";
      });
  },
});

export default bookSlice.reducer;
