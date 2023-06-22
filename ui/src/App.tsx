import './App.css';
import Filter from './components/filter/Filter';
import Header from './components/header/Header';
import JobList from './components/jobList/JobList';

function App() {
  return (
    <div className="min-h-screen font-mono px-2 bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-200">
      <Header></Header>
      <Filter />
      <JobList />
    </div>
  );
}

export default App;
