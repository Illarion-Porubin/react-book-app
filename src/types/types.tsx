export interface BookInfoType {
  data: {
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
  };
  status: number;
}
