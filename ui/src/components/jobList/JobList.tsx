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
    <div className="flex flex-col justify-center align-items mt-4 pb-4 sm:mx-8 md:mx-16 lg:mx-24">
      {jobs
        .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))
        .map((job) => (
          <JobItem key={job.id} job={job} />
        ))}
    </div>
  );
};

export default JobList;
