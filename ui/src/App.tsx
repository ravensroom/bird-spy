import './App.css';
import Filter from './components/filter/Filter';
import Header from './components/header/Header';
import JobList from './components/jobList/JobList';

function App() {
  return (
    <div className="min-h-screen bg-blue-200 font-mono px-2">
      <Header></Header>
      <Filter />
      <JobList />
    </div>
  );
}

export default App;
