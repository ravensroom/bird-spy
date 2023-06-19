import getQueryData from '../utils/getQueryData.js';
import addLinkedInJobs from './addLinkedInJobs.js';

const { jobSites, searchOptions, rules } = await getQueryData();

const { linkedIn } = jobSites;

const addJobs = async (): Promise<void> => {
  await addLinkedInJobs(linkedIn, searchOptions, rules);
};

export default addJobs;

export type LinkedIn = typeof linkedIn;
export type SearchOptions = typeof searchOptions;
export type Rules = typeof rules;
