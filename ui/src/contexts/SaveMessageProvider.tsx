import React, { createContext, useContext, useState } from 'react';

interface HeaderMessageProviderProps {
  children: React.ReactNode;
}

interface IHeaderMessageContext {
  headerMessage: string;
  setHeaderMessage: (message: string) => void;
}

export const HeaderMessageContext = createContext<
  IHeaderMessageContext | undefined
>(undefined);

export const useHeaderMessageContext = () => {
  const context = useContext(HeaderMessageContext);
  if (!context) {
    throw new Error(
      'HeaderMessageContext should be provided by SaveMessageProvider'
    );
  }
  return context;
};

const HeaderMessageProvider: React.FC<HeaderMessageProviderProps> = ({
  children,
}) => {
  const [headerMessage, setHeaderMessage] = useState('');

  return (
    <HeaderMessageContext.Provider value={{ headerMessage, setHeaderMessage }}>
      {children}
    </HeaderMessageContext.Provider>
  );
};

export { HeaderMessageProvider };
