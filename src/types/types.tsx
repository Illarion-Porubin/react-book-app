export interface BookInfoType {
  covers: string | null;
  authors: {
    author: {
      key: string;
    }
  }[];
  created: string | null;
  last_modified: string | null;
  description: string | null;
  subjects: string[] | null;
  title: string | null;
}

export interface SearchType {
  cover_edition_key: string | null;
  subtitle: string | null;
  key: string | null;
  title: string | null;
}


export interface BookType {
  author_name: string[];
  cover_edition_key: string;
  key: string;
  cover_id: string
  subject_key: string;
  subtitle: string;
  title: string;
}

export interface ShelvesType {
  counts: {
    already_read: number;
    currently_reading: number;
    want_to_read: number;
  } 
} 

export interface RatingsType {
  counts: number[];
  summary: {
    average: number;
    count: number;
    sortable: number;
  }
} 

export interface AuthorType {
  bio: string | null;
  personal_name: string | null;
  birth_date: string | null;
  death_date: string | null;
  wikipedia: string | null;
}

export interface BookState {
  bookList: SearchType[] | [];
  bookInfo: BookInfoType | null;
  bookId: number | null;
  bookKey: string | null;
  bookAuthor: AuthorType | null;
  isLoading: "idle" | "loading" | "loaded" | "error";
  error: string | null;
}