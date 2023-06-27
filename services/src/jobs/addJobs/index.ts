import { Config } from '../../types.js';
import addLinkedInJobs, {
  stopAdding,
  stoppedAdding,
  hasRunningInstance,
} from './addLinkedInJobs.js';

const addJobs = async (config: Config): Promise<void> => {
  await addLinkedInJobs(config);
};

export default addJobs;
export { stopAdding, stoppedAdding, hasRunningInstance };
