import { useEffect, useState } from 'react';
import './App.css';
import ConfigSection from './components/configSection/ConfigSection';
import Header from './components/header/Header';
import JobList from './components/jobList/JobList';
import AppContextProvider from './contexts/AppContextProvider';
import { useUserIdContext } from './contexts/UserIdProvider';
function App() {
  return (
    <AppContextProvider>
      <Wrapper />
    </AppContextProvider>
  );
}

const Wrapper = () => {
  const { userId } = useUserIdContext();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (userId) {
      setLoading(false);
    }
  }, [userId]);
  if (loading) return null;
  return (
    <div className="min-h-screen font-mono px-2 bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-200">
      <Header />
      <ConfigSection />
      <JobList />
    </div>
  );
};

export default App;
