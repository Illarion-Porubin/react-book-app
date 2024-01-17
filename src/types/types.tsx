export interface BookInfoType {
  covers: number[];
  created: {
    value: string;
  };
  last_modified: {
    value: string;
  };
  description: {
    value: string | "There is no description";
  };
  subjects: string[];
  title: string;
}
