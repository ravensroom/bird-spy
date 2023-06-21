import addJobs from './addJobs/index.js';
import getAllJobs from './getJobs/index.js';
import { Job } from './types.js';

const DB_PATH_BASE = new URL('../../db/data', import.meta.url).pathname;

export { addJobs, getAllJobs, Job, DB_PATH_BASE };
