import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthorType, BookInfoType, BookState, BookType, RatingsType, SearchType, ShelvesType } from "../../types/types";
import axios from "axios";

export const fetchBookSearch = createAsyncThunk<SearchType[],string,{ rejectValue: string }
>("api/fetchBookSearch", async (searchValue: string, { rejectWithValue }) => {
  try {
    if (searchValue) {
      const FIELDS = `&fields=key,title,cover_edition_key,subtitle`;
      const URL = `https://openlibrary.org/search.json?title=${searchValue}${FIELDS}&lang=en&limit=12`;
      const { data } = await axios.get(URL);
      if (!data) {
        return rejectWithValue("Server Error!");
      }
      return data.docs;
    }
  } catch (error) {
    return rejectWithValue("Can't fetchBookSearch");
  }
});

export const fetchBooksRatings = createAsyncThunk<RatingsType, string, {rejectValue: null}
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

export const fetchBookshelves = createAsyncThunk<ShelvesType, string, {rejectValue: null}
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

export const fetchBookSlider = createAsyncThunk<BookType[], string[],{ rejectValue: string }
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

export const fetchBookInfo = createAsyncThunk<BookInfoType, string, { rejectValue: null }
>("api/fetchBookInfo", async (bookKey, { rejectWithValue }) => {
  try {
    if (bookKey) {
      const { data } = await axios.get(`https://openlibrary.org/works/${bookKey}.json`);
      const { subjects, title, description, created, covers, last_modified, authors } = data;
      const newData: BookInfoType = {
        authors: authors || null,
        subjects: subjects || null,
        title: title || null,
        description:  description ? (typeof(description) === 'string' ? description : description.value) : '',
        created: typeof(created) === "string" ? new Date(created).toLocaleDateString() : new Date(created.value).toLocaleDateString(),
        covers: covers ? `https://covers.openlibrary.org/b/id/${covers[0]}-M.jpg` : null,
        last_modified: typeof(last_modified) === 'string' ? new Date(last_modified).toLocaleDateString()  : new Date(last_modified.value).toLocaleDateString(),
      };
      return newData
    }
    return rejectWithValue(null)
  } catch (error) {
    return rejectWithValue(null);
  }
});

///Author

export const fetchBookAuthor = createAsyncThunk<AuthorType, string, {rejectValue: string}
>("api/fetchBookAuthor", async (authorKey, { rejectWithValue }) => {
  try {
    if(authorKey){
      const {data} = await axios.get(`https://openlibrary.org/authors/${authorKey}.json`);
      const { bio, personal_name, birth_date, wikipedia, death_date} = data;
      const newData: AuthorType = {
        bio: (typeof(bio) === 'string' ? bio : bio.value),
        personal_name: personal_name || null,
        birth_date: birth_date || null,
        death_date: death_date || null,
        wikipedia: wikipedia || null,
      }
      return newData
    }
    return rejectWithValue("Cant't data")
  } catch (error) {
    return rejectWithValue("Cant't fetchBookAuthor")
  }
})  

///


export const initialState: BookState = {
  bookList: [],
  bookInfo: null,
  bookId: null,
  bookKey: null,
  bookAuthor: null,
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
      ///fetchBookAuthor
      .addCase(fetchBookAuthor.pending, (state) => {
        state.bookAuthor = null;
      })
      .addCase(fetchBookAuthor.fulfilled, (state, action) => {
        state.bookAuthor = action.payload;
      })
      .addCase(fetchBookAuthor.rejected, (state) => {
        state.bookAuthor = null;
      })

  },
});

export default bookSlice.reducer;
