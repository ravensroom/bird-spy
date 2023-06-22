import { useEffect, useState } from 'react';
import JobItem from './JobItem.js';
import { Job } from '@bird-spy/services/src/main.js';

const JobList = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/jobs')
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center align-items pb-4 sm:mx-8 md:mx-16 lg:mx-24">
        <div className="px-2 py-1 bg-green-100 bg-opacity-30 text-gray-600 text-xs">
          <span>Total results: </span>
          {jobs.length}
        </div>
        {jobs
          .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))
          .map((job) => (
            <JobItem key={job.id} job={job} />
          ))}
      </div>
    </>
  );
};

export default JobList;
