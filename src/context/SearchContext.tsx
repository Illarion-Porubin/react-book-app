import { createContext } from "react";

interface Context {
    searchTerm: string,
    books: any,
    loading: boolean,
    fetchBooks: () => any,
    setSearchTerm: (value: string) => void,
}

export const defaultState = {  
    searchTerm: '',
    books: [],
    loading: false,
    fetchBooks: () => {},
    setSearchTerm: () => {}
  };

export const SearchContext = createContext<Context>(defaultState); 