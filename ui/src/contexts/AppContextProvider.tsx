import { HeaderMessageProvider } from './SaveMessageProvider';
import { SearchResultsProvider } from './SearchResultsProvider';
import { UserIdProvider } from './UserIdProvider';
import { ArchivesProvider } from './ArchivesProvider';

interface AppContextProviderProps {
  children: React.ReactNode;
}

const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  return (
    <UserIdProvider>
      <ArchivesProvider>
        <SearchResultsProvider>
          <HeaderMessageProvider>{children}</HeaderMessageProvider>
        </SearchResultsProvider>
      </ArchivesProvider>
    </UserIdProvider>
  );
};

export default AppContextProvider;
