import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BookInfoType, RatingsType, ShelvesType } from "../../types/types";
import imgNotFound from "../../assets/jpg/cover_not_found.jpg";
import axios from "axios";

export const fetchBookSearch = createAsyncThunk<string,string,{ rejectValue: string }
>("api/fetchBookSearch", async (searchValue: string, { rejectWithValue }) => {
  try {
    if (searchValue) {
      // editions
      // const FIELDS = `&fields=key,title,author_name,subtitle,subject_key,cover_edition_key`;
      const URL = `https://openlibrary.org/search.json?title=${searchValue}${''}&lang=en&limit=12`;
      const { data } = await axios.get(URL);
      console.log(data);
      if (!data) {
        return rejectWithValue("Server Error!");
      }
      return data.docs;
    }
  } catch (error) {
    return rejectWithValue("Can't fetchBookSearch");
  }
});

export const fetchBooksRatings = createAsyncThunk<RatingsType, any, {rejectValue: null}
  >("api/fetchBooksRatings", async (bookKey, {rejectWithValue}) => {
    try {
      if(bookKey){
        const {data} = await axios.get(`https://openlibrary.org/works/${bookKey}/ratings.json `);
        if(data){
          return data
        }
        return null;
      }
      return rejectWithValue(null);
    } catch (error) {
      return rejectWithValue(null);
    }
})

export const fetchBookshelves = createAsyncThunk<ShelvesType, any, {rejectValue: null}
  >("api/fetchBookshelves", async (bookKey, {rejectWithValue}) => {
    try {
      if(bookKey){
        const {data} = await axios.get(`https://openlibrary.org/works/${bookKey}/bookshelves.json`);
        if(data){
          return data
        }
        return null;
      }
      return rejectWithValue(null);
    } catch (error) {
      return rejectWithValue(null);
    }
})

export const fetchBookSlider = createAsyncThunk<any,any,{ rejectValue: string }
>("api/fetchBookSlider", async (subject: string[], { rejectWithValue }) => {
  try {
    if (subject) {
      const random = Math.floor(Math.random() * subject.length);
      const {data} = await axios.get(`https://openlibrary.org/subjects/${subject[random]}.json`);
      if(!data){
        return rejectWithValue("Server Error!");
      }
      return data.works;
    }
    return rejectWithValue("Cant't subject");
  } catch (error) {
    return rejectWithValue("Cant't fetchBookSlider");
  }
});

export const fetchBookInfo = createAsyncThunk<any,any,{ rejectValue: string }
>("api/fetchBookInfo", async (bookKey: string, { rejectWithValue }) => {
  try {
    if (bookKey) {
      const URL = `https://openlibrary.org/works/${bookKey}.json`;
      const { data } = await axios.get(URL);
      console.log(data, 'daaata');
      const { subjects, title, description, created, covers, last_modified, authors } = data;
      if ({ data }) {
        const newData = {
          authors: authors || null,
          subjects: subjects || null,
          title: title || 'Not title',
          description: description ? (typeof(description) === 'string' ? description : description.value) : 'No data available',
          created: created ? (typeof(created) === "string" ? new Date(created).toLocaleDateString() : new Date(created.value).toLocaleDateString()) : 'No data available',
          covers: covers ? `https://covers.openlibrary.org/b/id/${covers[0]}-M.jpg` : imgNotFound,
          last_modified: last_modified ? (typeof(last_modified) === 'string' ? new Date(last_modified).toLocaleDateString()  : new Date(last_modified.value).toLocaleDateString()) : 'No data available',
        };
        return newData;
      }
      return rejectWithValue("Cant't data");
    }
  } catch (error) {
    return rejectWithValue("Cant't fetchBookInfo");
  }
});

export interface BookState {
  bookList: any | [];
  bookInfo: BookInfoType | null;
  bookId: number | null;
  bookKey: string | null;
  status: number | null;
  isLoading: "idle" | "loading" | "loaded" | "error";
  error: string | null;
}

export const initialState: BookState = {
  bookList: [],
  bookInfo: null,
  bookId: null,
  bookKey: null,
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
    },
    addKey: (state, action) => {
      state.bookKey = action.payload;
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
        state.isLoading = "loaded";
      })
      .addCase(fetchBookInfo.rejected, (state) => {
        state.bookInfo = null;
        state.isLoading = "error";
      })

  },
});

export default bookSlice.reducer;
