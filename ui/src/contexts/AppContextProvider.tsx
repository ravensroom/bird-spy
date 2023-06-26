import { SaveMessageProvider } from './SaveMessageProvider';
import { SearchResultsProvider } from './SearchResultsProvider';
import { UserIdProvider } from './UserIdProvider';

interface AppContextProviderProps {
  children: React.ReactNode;
}

const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  return (
    <UserIdProvider>
      <SearchResultsProvider>
        <SaveMessageProvider>{children}</SaveMessageProvider>
      </SearchResultsProvider>
    </UserIdProvider>
  );
};

export default AppContextProvider;
