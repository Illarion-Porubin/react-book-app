import React, { ReactNode, useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import axios from "axios";
import { useDebounce } from "../hooks/Debounce";

interface Props {
  children: ReactNode;
}

export const useSearch = () => {
  return useContext(SearchContext);
};

export const SearchProvider: React.FC<Props> = ({ children }) => {
  const URL = "https://openlibrary.org/search.json?title=";
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [books, setBooks] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const debounce = useDebounce(searchTerm, 600);

  const fetchBooks = React.useCallback( async () => {
    setLoading(true);
    try {  
      const res = await axios.get(URL + debounce + '&fields=key,title,author_name,editions,cover_edition_key&lang=en&limit=12' ).then((data) => {
        return data;
      });
      setBooks(res.data.docs);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  },[debounce]);

  React.useEffect(() => {
    if(debounce) {
      fetchBooks();
    }
  }, [debounce, fetchBooks]);

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        books,
        loading,
        fetchBooks,
        setSearchTerm,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
