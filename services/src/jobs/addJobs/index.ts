import { Config } from '../../types.js';
import addLinkedInJobs from './addLinkedInJobs.js';

const addJobs = async (config: Config): Promise<void> => {
  await addLinkedInJobs(config);
};

export default addJobs;
