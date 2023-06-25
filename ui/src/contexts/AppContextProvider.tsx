import { SaveMessageProvider } from './SaveMessageProvider';
import { SearchResultsProvider } from './SearchResultsProvider';

interface AppContextProviderProps {
  children: React.ReactNode;
}

const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  return (
    <SearchResultsProvider>
      <SaveMessageProvider>{children}</SaveMessageProvider>
    </SearchResultsProvider>
  );
};

export default AppContextProvider;
