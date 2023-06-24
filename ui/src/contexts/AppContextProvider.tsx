import React from 'react';
import { SaveMessageProvider } from './SaveMessageProvider';

interface AppContextProviderProps {
  children: React.ReactNode;
}

const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  return <SaveMessageProvider>{children}</SaveMessageProvider>;
};

export default AppContextProvider;
