import getQueryData from '../utils/getQueryData.js';
import addLinkedInJobs from './addLinkedInJobs.js';

const { searchOptions } = await getQueryData();

const addJobs = async (): Promise<void> => {
  await addLinkedInJobs(searchOptions);
};

export default addJobs;

export type SearchOptions = typeof searchOptions;
