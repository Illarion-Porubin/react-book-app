import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BookInfoType } from "../../types/types";
import axios from "axios";

export const fetchBookSearch = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("api/fetchBookSearch", async (searchValue: string, { rejectWithValue }) => {
  try {
    if (searchValue) {
      const FIELDS = `&fields=key,title,author_name,editions,cover_edition_key`;
      const URL = `https://openlibrary.org/search.json?title=${searchValue}${''}&lang=en&limit=12`;
      const { data } = await axios.get(URL);
      if (!data) {
        return rejectWithValue("Server Error!");
      }
      return data.docs;
    }
  } catch (error) {
    return rejectWithValue("Can't fetchSearchBook");
  }
});

export const fetchBookInfo = createAsyncThunk<
  any,
  any,
  { rejectValue: string }
>("api/fetchBookInfo", async (bookId: string, { rejectWithValue }) => {
  try {
    if (bookId) {
      const URL = `https://openlibrary.org/works/${bookId}.json`;
      const { data } = await axios.get(URL);
      const { subjects, title, description, created, covers, last_modified } =
        data;
      if ({ data }) {
        const newData = {
          subjects,
          title,
          description,
          created,
          covers,
          last_modified,
        };
        return newData;
      }
      return data ? data : rejectWithValue("Server Error!");
    }
  } catch (error) {
    return rejectWithValue("Cant't fetchBookInfo");
  }
});

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
  reducers: {
    addId: (state, action) => {
      state.bookId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      ///fetchBookSearch
      .addCase(fetchBookSearch.pending, (state) => {
        state.bookList = [];
        state.isLoading = "loading";
      })
      .addCase(fetchBookSearch.fulfilled, (state, action) => {
        state.bookList = action.payload;
        // console.log(state.bookList, "state.bookList");
        state.isLoading = "loaded";
      })
      .addCase(fetchBookSearch.rejected, (state) => {
        state.bookList = [];
        state.isLoading = "error";
      })
      ///fetchBookInfo
      .addCase(fetchBookInfo.pending, (state) => {
        state.bookInfo = null;
        state.isLoading = "loading";
      })
      .addCase(fetchBookInfo.fulfilled, (state, action) => {
        state.bookInfo = action.payload;
        // console.log(state.bookInfo, "state.bookInfo");
        state.isLoading = "loaded";
      })
      .addCase(fetchBookInfo.rejected, (state) => {
        state.bookInfo = null;
        state.isLoading = "error";
      });
  },
});

export default bookSlice.reducer;
