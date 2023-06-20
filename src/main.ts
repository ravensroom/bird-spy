import addJobs from './addJobs/index.js';

export interface Job {
  id: string;
  title: string;
  company: string;
  href: string;
  location: string;
  priority: number;
  description: string;
}

addJobs();
