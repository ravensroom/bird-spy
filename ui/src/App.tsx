import './App.css';
import ConfigSection from './components/configSection/ConfigSection';
import Header from './components/header/Header';
import JobList from './components/jobList/JobList';
import AppContextProvider from './contexts/AppContextProvider';
function App() {
  return (
    <AppContextProvider>
      <div
        className={`min-h-screen font-mono px-2 bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-200`}
      >
        <Header />
        <ConfigSection />
        <JobList />
      </div>
    </AppContextProvider>
  );
}

export default App;
