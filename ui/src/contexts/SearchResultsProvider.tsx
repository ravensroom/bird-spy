import { Job } from '@bird-spy/services/src/main';
import React, { createContext, useContext, useState } from 'react';

interface SearchResultsProviderProps {
  children: React.ReactNode;
}

interface ISearchResultsContext {
  results: Job[];
  setResults: React.Dispatch<React.SetStateAction<never[]>>;
}

export const SearchResultsContext = createContext<
  ISearchResultsContext | undefined
>(undefined);

export const useSearchResultsContext = () => {
  const context = useContext(SearchResultsContext);
  if (!context) {
    throw new Error(
      'HeaderMessageContext should be provided by SaveMessageProvider'
    );
  }
  return context;
};

const SearchResultsProvider: React.FC<SearchResultsProviderProps> = ({
  children,
}) => {
  const [results, setResults] = useState([]);

  return (
    <SearchResultsContext.Provider value={{ results, setResults }}>
      {children}
    </SearchResultsContext.Provider>
  );
};

export { SearchResultsProvider };
