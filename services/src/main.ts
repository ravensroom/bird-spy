import addJobs from './addJobs/index.js';
import getAllJobs from './getJobs/index.js';
import changeRules from './changeRules/index.js';
import { Job, Config } from './types.js';
const MAX_ENTRIES_PER_QUERY = 0;
const DB_PATH_BASE = new URL('../../db/data', import.meta.url).pathname;
const CONFIG_PATH_BASE = new URL('.', import.meta.url).pathname;

addJobs();

export {
  addJobs,
  getAllJobs,
  changeRules,
  Job,
  Config,
  DB_PATH_BASE,
  MAX_ENTRIES_PER_QUERY,
  CONFIG_PATH_BASE,
};
