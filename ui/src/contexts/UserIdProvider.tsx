import React, { createContext, useContext } from 'react';
import useUserId from '../hooks/useUserId';

interface UserIdContextProps {
  userId: string;
}

const UserIdContext = createContext<UserIdContextProps>({ userId: '' });

export const UserIdProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const userId = useUserId();

  return (
    <UserIdContext.Provider value={{ userId }}>
      {children}
    </UserIdContext.Provider>
  );
};

export const useUserIdContext = (): UserIdContextProps =>
  useContext(UserIdContext);
