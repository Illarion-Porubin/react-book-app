export interface BookInfoType {
  covers: string;
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