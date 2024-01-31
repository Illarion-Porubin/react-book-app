export interface BookInfoType {
  covers: string;
  authors: {
    author: {
      key: string
    }
  }[];
  created: string;
  last_modified: string;
  description: string;
  subjects: string[];
  title: string;
}


export interface BookType {
  author_name: string[];
  cover_edition_key: string;
  key: string;
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