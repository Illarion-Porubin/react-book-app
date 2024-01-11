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
  const debounce = useDebounce(searchTerm, 500);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      if (debounce) {
        // '&fields=key,title,author_name,editions,cover_edition_key&limit=8'
        const res = await axios.get(URL + debounce + '&lang=en&limit=12' ).then((data) => {
          return data;
        });
        console.log(res.data);
        setBooks(res.data.docs);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    setTimeout(() => {
      fetchBooks();
    }, 1100);
  }, [debounce]);

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
