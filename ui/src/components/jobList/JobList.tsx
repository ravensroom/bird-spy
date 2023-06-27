import { useEffect, useState } from 'react';
import JobItem from './JobItem.js';
import { Job } from '../../types/types.js';
import { useSearchResultsContext } from '../../contexts/SearchResultsProvider.js';

const JobList = () => {
  const { results } = useSearchResultsContext();
  // const [jobs, setJobs] = useState<Job[]>([]);

  // useEffect(() => {
  //   fetch('http://localhost:3000/api/jobs')
  //     .then((res) => res.json())
  //     .then((data) => setJobs(data));
  // }, []);
  const jobs: Job[] = [];

  const filteredJobs = results.length > 0 ? results : jobs;

  return (
    <>
      <div className="flex flex-col justify-center align-items sm:mx-8 md:mx-16 lg:mx-24 border-2 border-indigo-400 border-opacity-60 mt-2 rounded-sm">
        <div className="px-2 py-1 text-gray-600 text-xs">
          <span>Total results: </span>
          {filteredJobs.length}
        </div>
        {filteredJobs
          .sort((a, b) => b.body.priorityPoints - a.body.priorityPoints)
          .map((job) => (
            <JobItem key={job.userId + job.id} job={job} />
          ))}
      </div>
    </>
  );
};

export default JobList;
