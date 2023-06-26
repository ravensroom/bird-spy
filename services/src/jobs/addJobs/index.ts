import { Config } from '../../types.js';
import addLinkedInJobs from './addLinkedInJobs.js';

const addJobs = async (userId: string, config: Config): Promise<void> => {
  await addLinkedInJobs(userId, config);
};

export default addJobs;
