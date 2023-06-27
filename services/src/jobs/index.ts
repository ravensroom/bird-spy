import addJobs, {
  stopAdding,
  stoppedAdding,
  hasRunningInstance,
} from './addJobs/index.js';
import getJobs from './getJobs/index.js';
import rmJobs from './rmJobs/index.js';

const jobs = {
  addJobs,
  getJobs,
  rmJobs,
  stopAdding,
  stoppedAdding,
  hasRunningInstance,
};

export default jobs;
