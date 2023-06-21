import { useEffect, useState } from 'react';
import JobItem from './JobItem.js';
import { Job } from '@bird-spy/services/src/main.js';

// const jobs = [
//   {
//     id: '1',
//     title: 'Junior web developer',
//     href: 'baidu.com',
//     location: 'San Diego, CA',
//     company: 'Google',
//     description: '',
//     priority: 200,
//   },
//   {
//     id: '2',
//     title: 'Junior web developer',
//     href: 'baidu.com',
//     location: 'San Diego, CA',
//     company: 'Google',
//     description: '',
//     priority: 200,
//   },
//   {
//     id: '3',
//     title: 'Junior web developer',
//     href: 'baidu.com',
//     location: 'San Diego, CA',
//     company: 'Google',
//     description: '',
//     priority: 200,
//   },
// ];

const JobList = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/jobs')
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  return (
    <div className="flex flex-col justify-center align-items">
      {jobs
        .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))
        .map((job) => (
          <JobItem key={job.id} job={job} />
        ))}
    </div>
  );
};

export default JobList;
