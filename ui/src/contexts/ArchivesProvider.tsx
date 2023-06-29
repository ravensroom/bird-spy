import useArchives from '../hooks/useArchives';
import { Archive } from '../types/types';
import React, { createContext, useContext } from 'react';

interface IArchivesContext {
  archives: Archive[];
  setArchives: React.Dispatch<React.SetStateAction<Archive[]>>;
}

const ArchivesContext = createContext<IArchivesContext | undefined>(undefined);

interface ArchivesProviderProps {
  children: React.ReactNode;
}

const ArchivesProvider: React.FC<ArchivesProviderProps> = ({ children }) => {
  const { archives, setArchives } = useArchives();

  return (
    <ArchivesContext.Provider value={{ archives, setArchives }}>
      {children}
    </ArchivesContext.Provider>
  );
};

export { ArchivesProvider };

export const useArchivesContext = () => {
  const context = useContext(ArchivesContext);
  if (!context) {
    throw new Error(
      'ArchivesContext should be provided by ArchivesContextProvider'
    );
  }
  return context;
};
