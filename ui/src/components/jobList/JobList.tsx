import JobItem from './JobItem.js';

// import { Job } from '../../../../src/main.js';
// import { useEffect, useState } from 'react';

//import { readdirSync, readFileSync } from 'fs';
// async function getJobs(): Promise<Job[]> {
//   const srcPath = new URL('../../../../db', import.meta.url).pathname;
//   const jobs: Job[] = [];
//   try {
//     const files = await readdirSync(srcPath);

//     for (const file of files) {
//       const filePath = new URL(file, srcPath).pathname;
//       const data = await readFileSync(filePath, 'utf8');

//       const job = JSON.parse(data) as Job;
//       jobs.push(job);
//     }
//   } catch (err) {
//     console.error(err);
//   }
//   return jobs;
// }

const jobs = [
  {
    id: '1',
    title: 'Junior web developer',
    href: 'baidu.com',
    location: 'San Diego, CA',
    company: 'Google',
    description: '',
    priority: 200,
  },
  {
    id: '2',
    title: 'Junior web developer',
    href: 'baidu.com',
    location: 'San Diego, CA',
    company: 'Google',
    description: '',
    priority: 200,
  },
  {
    id: '3',
    title: 'Junior web developer',
    href: 'baidu.com',
    location: 'San Diego, CA',
    company: 'Google',
    description: '',
    priority: 200,
  },
];

const JobList = () => {
  // const [jobs, setJobs] = useState<Job[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const fetchedJobs = await getJobs();
  //     setJobs(fetchedJobs);
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="flex flex-col justify-center align-items">
      {jobs.map((job) => (
        <JobItem key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobList;
