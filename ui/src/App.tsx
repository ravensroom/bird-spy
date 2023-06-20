import './App.css';
import Header from './components/header/Header';
import JobList from './components/jobList/JobList';

function App() {
  return (
    <div className="h-full bg-blue-200">
      <Header></Header>
      <div className="mt-8 pb-6 pb-4 sm:mx-8 md:mx-16 lg:mx-24">
        <JobList />
      </div>
    </div>
  );
}

export default App;
