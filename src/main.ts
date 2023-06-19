import addJobs from './addJobs/index.js';
import esclient from './utils/elastic.js';
import setPriority from './utils/setPriority.js';

export interface Job {
  id: string;
  title: string;
  company: string;
  href: string;
  location: string;
  priority: number;
  description: string;
}

esclient.checkConnection();
await addJobs();
setPriority();
const jobs = await esclient.getAllJobsSortedByPriority();

console.log('jobs:', jobs.length);
