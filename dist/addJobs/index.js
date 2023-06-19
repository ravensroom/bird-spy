import getQueryData from '../utils/getQueryData.js';
import addLinkedInJobs from './addLinkedInJobs.js';
const { jobSites, searchOptions, rules } = await getQueryData();
const { linkedIn } = jobSites;
const addJobs = async () => {
    await addLinkedInJobs(linkedIn, searchOptions, rules);
};
export default addJobs;
