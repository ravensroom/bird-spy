import getQueryData from '../utils/getQueryData.js';
import getLinkedInJobs from './getLinkedInJobs.js';
const { jobSites, searchOptions, rules } = await getQueryData();
const { linkedIn } = jobSites;
const getJobs = async () => {
    return await getLinkedInJobs(linkedIn, searchOptions, rules);
};
export default getJobs;
